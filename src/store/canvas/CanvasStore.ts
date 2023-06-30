import { makeAutoObservable } from 'mobx';
import { Brush, Rect } from 'paint-tools';
import { RootStore } from 'store/rootStore';
import { PaintPayload } from 'types';

export class CanvasStore {
    canvas?: HTMLCanvasElement | null;

    undoList: string[];

    redoList: string[];

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.undoList = [];
        this.redoList = [];
    }

    setCanvas(canvas?: HTMLCanvasElement | null) {
        this.canvas = canvas;
    }

    setToUndoList(data: string) {
        this.undoList.push(data);
    }

    setToRedoList(data: string) {
        this.redoList.push(data);
    }

    draw({ action, tool, ...payload }: PaintPayload) {
        const ctx = this.canvas?.getContext('2d');
        if (!ctx) {
            return;
        }

        if (tool === 'brush') {
            if (action === 'move') {
                Brush.draw(ctx, payload);
            }

            if (action === 'finish') {
                ctx.beginPath();
                if (this.canvas) {
                    this.setToUndoList(this.canvas?.toDataURL());
                }
            }
        }

        if (tool === 'rect') {
            if (action === 'finish') {
                Rect.draw(ctx, payload);
                if (this.canvas) {
                    this.setToUndoList(this.canvas?.toDataURL());
                }
            }
        }
    }

    undo() {
        const ctx = this.canvas?.getContext('2d');

        if (this.undoList?.length > 0) {
            const dataURL = this.undoList.pop();

            this.redoList.push(this.canvas?.toDataURL() ?? '');

            const img = new Image();
            img.src = dataURL as string;

            img.onload = () => {
                ctx?.clearRect(0, 0, Number(this.canvas?.width), Number(this.canvas?.height));
                ctx?.drawImage(img, 0, 0, Number(this.canvas?.width), Number(this.canvas?.height));
            };
        } else {
            ctx?.clearRect(0, 0, Number(this.canvas?.width), Number(this.canvas?.height));
        }
    }

    redo() {
        const ctx = this.canvas?.getContext('2d');

        if (this.redoList.length > 0) {
            const dataURL = this.redoList.pop();
            this.undoList.push(this.canvas?.toDataURL() ?? '');

            const img = new Image();
            img.src = dataURL as string;

            img.onload = () => {
                ctx?.clearRect(0, 0, Number(this.canvas?.width), Number(this.canvas?.height));
                ctx?.drawImage(img, 0, 0, Number(this.canvas?.width), Number(this.canvas?.height));
            };
        }
    }
}

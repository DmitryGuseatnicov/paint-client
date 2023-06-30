/* eslint-disable eslint-comments/disable-enable-pair */

import { RoomStore } from 'store/room';

/* eslint-disable class-methods-use-this */
export class Tool {
    canvas?: HTMLCanvasElement | null;

    ctx?: CanvasRenderingContext2D | null;

    roomStore?: RoomStore;

    constructor(canvas?: HTMLCanvasElement | null, roomStore?: RoomStore) {
        this.canvas = canvas;
        this.ctx = this.canvas?.getContext('2d');
        this.roomStore = roomStore;
        this.removeEventListeners();
    }

    setFillColor(color: string) {
        if (this.ctx) {
            this.ctx.fillStyle = color;
        }
    }

    setStrokeColor(color: string) {
        if (this.ctx) {
            this.ctx.strokeStyle = color;
        }
    }

    setLineWidth(width: number) {
        if (this.ctx) {
            this.ctx.lineWidth = width;
        }
    }

    bindEventListeners() {
        if (this.canvas) {
            this.canvas.onmousedown = this.handleCanvasMouseDown.bind(this);
            this.canvas.onmousemove = this.handleCanvasMouseMove.bind(this);
            this.canvas.onmouseup = this.handleCanvasMouseUp.bind(this);
        }
    }

    handleCanvasMouseDown(event: MouseEvent) {
        this.alertError(event);
    }

    handleCanvasMouseMove(event: MouseEvent) {
        this.alertError(event);
    }

    handleCanvasMouseUp(event: MouseEvent) {
        this.alertError(event);
    }

    removeEventListeners() {
        if (this.canvas) {
            this.canvas.onmousedown = null;
            this.canvas.onmousemove = null;
            this.canvas.onmousedown = null;
        }
    }

    alertError<T>(event: T, message = 'this method is not implemented') {
        // eslint-disable-next-line no-console
        console.error({
            event,
            message,
        });
    }
}

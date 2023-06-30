import { Tool } from 'paint-tools/Tool';
import { RoomStore } from 'store/room';
import { PaintPayload } from 'types';

export class Brush extends Tool {
    isDraw?: boolean;

    constructor(canvas?: HTMLCanvasElement | null, roomStore?: RoomStore) {
        super(canvas, roomStore);
        this.bindEventListeners();
    }

    handleCanvasMouseDown({ pageX, pageY, target }: MouseEvent) {
        this.isDraw = true;
        const { offsetLeft, offsetTop } = target as HTMLCanvasElement;
        this.ctx?.beginPath();
        this.ctx?.moveTo(pageX - offsetLeft, pageY - offsetTop);
    }

    handleCanvasMouseMove({ pageX, pageY, target }: MouseEvent) {
        if (this.isDraw) {
            const { offsetLeft, offsetTop } = target as HTMLCanvasElement;
            this.roomStore?.sendFigure({
                payload: {
                    tool: 'brush',
                    action: 'move',
                    x: pageX - offsetLeft,
                    y: pageY - offsetTop,
                    lineWidth: this.ctx?.lineWidth,
                    fillStyle: this.ctx?.fillStyle,
                    strokeStyle: this.ctx?.strokeStyle,
                },
                action: 'draw',
            });
        }
    }

    handleCanvasMouseUp() {
        this.roomStore?.sendFigure({
            payload: {
                tool: 'brush',
                action: 'finish',
            },
            action: 'draw',
        });
        this.isDraw = false;
    }

    static draw(
        ctx?: CanvasRenderingContext2D,
        data?: Pick<PaintPayload, 'x' | 'y' | 'fillStyle' | 'lineWidth' | 'strokeStyle'>,
    ) {
        if (!(ctx && data?.x && data.y)) {
            return;
        }

        const actualLineWidth = ctx.lineWidth;
        const actualFillStyle = ctx.fillStyle;
        const actualStrokeStyle = ctx.strokeStyle;

        if (data.lineWidth) {
            ctx.lineWidth = data.lineWidth;
        }

        if (data.fillStyle) {
            ctx.fillStyle = data.fillStyle;
        }

        if (data.strokeStyle) {
            ctx.strokeStyle = data.strokeStyle;
        }

        ctx?.lineTo(data.x, data.y);
        ctx?.stroke();

        ctx.lineWidth = actualLineWidth;
        ctx.fillStyle = actualFillStyle;
        ctx.strokeStyle = actualStrokeStyle;
    }
}

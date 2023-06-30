import { Tool } from 'paint-tools/Tool';
import { RoomStore } from 'store/room';
import { PaintPayload } from 'types';

export class Rect extends Tool {
    isDraw?: boolean;

    startX?: number;

    startY?: number;

    width?: number;

    height?: number;

    savedRect: string | undefined;

    constructor(canvas?: HTMLCanvasElement | null, room?: RoomStore) {
        super(canvas, room);
        this.bindEventListeners();
    }

    handleCanvasMouseDown({ pageX, pageY, target }: MouseEvent) {
        this.isDraw = true;

        const { offsetLeft, offsetTop } = target as HTMLCanvasElement;
        this.startX = pageX - offsetLeft;
        this.startY = pageY - offsetTop;

        this.ctx?.beginPath();
        this.savedRect = this.canvas?.toDataURL();
    }

    handleCanvasMouseMove({ pageX, pageY, target }: MouseEvent) {
        if (this.isDraw) {
            const { offsetLeft, offsetTop } = target as HTMLCanvasElement;

            const currentX = pageX - offsetLeft;
            const currentY = pageY - offsetTop;
            this.width = currentX - Number(this?.startX);
            this.height = currentY - Number(this?.startY);

            this.localDraw(Number(this?.startX), Number(this?.startY), this.width, this.height);
        }
    }

    handleCanvasMouseUp() {
        this.isDraw = false;

        this.roomStore?.sendFigure({
            action: 'draw',
            payload: {
                tool: 'rect',
                action: 'finish',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
                lineWidth: this.ctx?.lineWidth,
                fillStyle: this.ctx?.fillStyle,
                strokeStyle: this.ctx?.strokeStyle,
            },
        });
    }

    localDraw(x: number, y: number, width: number, height: number) {
        const img = new Image();
        img.src = this.savedRect ?? '';

        img.onload = () => {
            this.ctx?.clearRect(0, 0, Number(this.canvas?.width), Number(this.canvas?.height));
            this.ctx?.drawImage(img, 0, 0, Number(this.canvas?.width), Number(this.canvas?.height));
            this.ctx?.beginPath();
            this.ctx?.rect(x, y, width, height);
            this.ctx?.fill();
            this.ctx?.stroke();
        };
    }

    static draw(
        ctx?: CanvasRenderingContext2D,
        data?: Pick<PaintPayload, 'x' | 'y' | 'fillStyle' | 'lineWidth' | 'strokeStyle' | 'width' | 'height'>,
    ) {
        if (!(ctx && data?.x && data.y && data.width && data.height)) {
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

        ctx.beginPath();
        ctx?.rect(data.x, data.y, data.width, data.height);
        ctx?.fill();
        ctx?.stroke();

        ctx.lineWidth = actualLineWidth;
        ctx.fillStyle = actualFillStyle;
        ctx.strokeStyle = actualStrokeStyle;
    }
}

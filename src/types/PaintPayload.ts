export interface PaintPayload {
    action?: 'start' | 'move' | 'finish';
    fillStyle?: string | CanvasGradient | CanvasPattern;
    height?: number;
    lineWidth?: number;
    strokeStyle?: string | CanvasGradient | CanvasPattern;
    tool?: 'brush' | 'rect';
    width?: number;
    x?: number;
    y?: number;
}

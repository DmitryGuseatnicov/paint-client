export class SocketApi {
    socket: WebSocket;

    constructor() {
        this.socket = new WebSocket('ws://localhost:8080');
        this.socket.onopen = () => {
            // eslint-disable-next-line no-console
            console.log('connect');
        };
    }

    send(eventName: string, data: unknown) {
        this.socket.send(JSON.stringify({ event: eventName, data }));
    }

    onEmit<T>(eventName: string, callBack: (data: T) => void) {
        this.socket.addEventListener('message', ({ data }: MessageEvent<string>) => {
            const parsedData = JSON.parse(data) as { data: T; event: string };

            if (eventName === parsedData.event) {
                callBack(parsedData.data);
            }
        });
    }
}

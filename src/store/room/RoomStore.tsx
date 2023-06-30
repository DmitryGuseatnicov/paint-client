import { SocketApi } from 'api';
import { makeAutoObservable } from 'mobx';
import { RootStore } from 'store/rootStore';
import { Message, PaintPayload } from 'types';

interface ConnectToRoomData {
    name: string;
    roomId: string;
    users: string[];
}

interface PaintData {
    action: 'draw' | 'undo' | 'redo';
    payload?: PaintPayload;
}

export class RoomStore {
    socketApi: SocketApi;

    userName?: string;

    roomUsers: string[];

    roomId?: string;

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.socketApi = new SocketApi();
        this.roomUsers = [];
    }

    connectToRoom({ roomId, name }: { name: string; roomId: string }) {
        this.addEventListeners();
        this.roomId = roomId;
        this.userName = name;
        this.socketApi.send('entry-to-room', { roomId, name });
    }

    addEventListeners() {
        this.socketApi.onEmit<ConnectToRoomData>('entry-to-room', (data) => {
            this.roomUsers = data.users;
        });

        this.socketApi.onEmit<PaintData>('paint', (data) => {
            switch (data.action) {
                case 'draw':
                    if (data.payload) {
                        this.rootStore.canvas.draw(data?.payload);
                    }
                    break;
                case 'undo':
                    this.rootStore.canvas.undo();
                    break;
                case 'redo':
                    this.rootStore.canvas.redo();
                    break;
                default:
                    break;
            }
        });

        this.socketApi.onEmit<Message>('message', (data) => {
            this.rootStore.chat.setMessage(data);
        });

        this.socketApi.onEmit<{ users: string[] }>('user-disconnect', (data) => {
            this.roomUsers = data.users;
        });
    }

    sendMessage(message: string) {
        this.socketApi.send('message', { message, userName: this.userName });
    }

    sendFigure(paintData: PaintData) {
        this.socketApi.send('paint', paintData);
    }
}

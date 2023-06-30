import { makeAutoObservable } from 'mobx';
import { RootStore } from 'store/rootStore';

interface Message {
    author?: boolean;
    id: string;
    message: string;
    userName: string;
}

export class ChatStore {
    messages: Message[];

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
        this.messages = [];
    }

    setMessage(data: Omit<Message, 'id'>) {
        this.messages.push({ ...data, id: Math.random().toString() });
    }
}

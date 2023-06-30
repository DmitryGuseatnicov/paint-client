import React, { createContext, FC, ReactElement, ReactNode } from 'react';

import { CanvasStore } from './canvas';
import { ChatStore } from './chat';
import { RoomStore } from './room';
import { ToolsStore } from './tools';

export class RootStore {
    tools: ToolsStore;

    canvas: CanvasStore;

    room: RoomStore;

    chat: ChatStore;

    constructor() {
        this.tools = new ToolsStore(this);
        this.canvas = new CanvasStore(this);
        this.room = new RoomStore(this);
        this.chat = new ChatStore(this);
    }
}

const store = new RootStore();

export const StoreContext = createContext<RootStore>(store);

export const StoreProvider: FC<{
    children: ReactNode;
}> = ({ children }): ReactElement => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

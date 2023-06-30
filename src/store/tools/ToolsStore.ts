import { makeAutoObservable } from 'mobx';
import { Brush, Tool } from 'paint-tools';
import { RootStore } from 'store/rootStore';

type AllTools = Brush | Tool;

export class ToolsStore {
    tool?: AllTools;

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    setTool(tool?: AllTools) {
        this.tool = tool;
    }

    setLineWidth(width: number) {
        this.tool?.setLineWidth(width);
    }

    setFillColor(color: string) {
        this.tool?.setFillColor(color);
    }

    setStrokeColor(color: string) {
        this.tool?.setStrokeColor(color);
    }
}

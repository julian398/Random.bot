import {glob} from "glob";
import * as path from "path";

export class WorkerFactory {

    static _instance = null;
    _engines = [];

    constructor(globPath) {
        if (WorkerFactory._instance) {
            throw new Error("This is a singleton");
        }
        const pathArr = glob.sync(globPath) || [];
        for (const filePath of pathArr) {
            require(path.resolve(filePath));
        }
    }

    static get instance() {
        if (!WorkerFactory._instance) {
            WorkerFactory._instance = new this(`${__dirname}/../{commands/events}/**/*js`);
        }

        return WorkerFactory._instance;
    }

    registerClass(instance) {
        this._engines.push(instance);
    }

    getRunnableEngines(message) {
        const returnEngines = [];
        for (const engine of this._engines) {
            if (engine.canHandle(message)) {
                returnEngines.push(engine);
            }
        }
        return returnEngines;
    }
}
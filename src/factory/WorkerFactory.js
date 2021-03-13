import {glob} from "glob";
import * as path from "path";

export class WorkerFactory {

    static _instance = null;
    _engines = [];

    constructor() {
        if (WorkerFactory._instance) {
            throw new Error("This is a singleton");
        }
    }

    _loadModules(globPath){
        const pathArr = glob.sync(globPath) || [];
        const pArr = pathArr.map(filePath => import(path.resolve(filePath)));
        return Promise.all(pArr);
    }

    static async getInstance() {
        if (!WorkerFactory._instance) {
            WorkerFactory._instance = new this();
            await WorkerFactory._instance._loadModules(`${__dirname}/../{commands,events}/**/*.js`);
        }

        return WorkerFactory._instance;
    }

    registerClass(instance) {
        this._engines.push(instance);
    }

    getRunnableEngines(eventObject) {
        const returnEngines = [];
        for (const engine of this._engines) {
            if (engine.canHandle(eventObject)) {
                returnEngines.push(engine);
            }
        }
        return returnEngines;
    }
}
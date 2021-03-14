import {glob} from "glob";
import * as path from "path";
import {AbstractRunnableEngine} from "../model/AbstractRunnableEngine";

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
        return Promise.all(pArr).then(modules => {
            for(const module of modules){
                for(const clazzProp in module){
                    if(module.hasOwnProperty(clazzProp)){
                        const clazz = module[clazzProp];
                        const instance = new clazz();
                        if(instance instanceof AbstractRunnableEngine){
                            this._registerClass(instance);
                        }
                    }
                }

            }
        });
    }

    static async getInstance() {
        if (!WorkerFactory._instance) {
            WorkerFactory._instance = new this();
            await WorkerFactory._instance._loadModules(`${__dirname}/../{commands,events}/**/*.js`);
        }

        return WorkerFactory._instance;
    }

    _registerClass(instance) {
        console.log(`Registering engine: ${instance.name}`);
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
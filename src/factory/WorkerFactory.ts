import {glob} from "glob";
import * as path from "path";
import {AbstractRunnableEngine} from "../model/AbstractRunnableEngine";
import {IAbstractRunnableEngine} from "../model/IAbstractRunnableEngine";
import {CommandDescriptor} from "../model/CommandDescriptor";

export class WorkerFactory {

    private static _instance: WorkerFactory = null;

    constructor() {
        if (WorkerFactory._instance) {
            throw new Error("This is a singleton");
        }
    }

    private _engines: IAbstractRunnableEngine<any>[] = [];

    public get engines(): IAbstractRunnableEngine<any>[] {
        return this._engines;
    }

    static async getInstance() {
        if (!WorkerFactory._instance) {
            WorkerFactory._instance = new this();
            await WorkerFactory._instance._loadModules(`${__dirname}/../{commands,events}/**/*.{ts,js}`);
        }

        return WorkerFactory._instance;
    }

    _isClass(v: any): boolean {
        return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
    }

    public getRunnableEngines(eventObject: CommandDescriptor<any>): IAbstractRunnableEngine<any>[] {
        const returnEngines = [];
        for (const engine of this._engines) {
            if (engine.canHandle(eventObject)) {
                returnEngines.push(engine);
            }
        }
        return returnEngines;
    }

    private _loadModules(globPath): Promise<void> {
        const pathArr = glob.sync(globPath) || [];
        const pArr = pathArr.map(filePath => import(path.resolve(filePath)));
        return Promise.all(pArr).then(modules => {
            for (const module of modules) {
                for (const clazzProp in (module as IAbstractRunnableEngine<any>)) {
                    if (module.hasOwnProperty(clazzProp)) {
                        const clazz = module[clazzProp];
                        if (!this._isClass(clazz)) {
                            continue;
                        }
                        const instance = new clazz();
                        if (instance instanceof AbstractRunnableEngine) {
                            this._registerClass(instance);
                        }
                    }
                }
            }
        });
    }

    private _registerClass(instance: IAbstractRunnableEngine<any>): void {
        console.log(`Registering engine: ${instance.name}`);
        this._engines.push(instance);
    }
}
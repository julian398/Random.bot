import {WorkerFactory} from "../factory/WorkerFactory.js";
import {prefix} from"../index";

export class AbstractRunnableEngine {
    static pf = prefix;

    _name;
    _description;

    constructor({name, description}) {
        this._name = name;
        this._description = description;
        WorkerFactory._instance.registerClass(this);
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }


    canHandle(commandObject) {
        if(!commandObject){
            return false;
        }
        if(commandObject.author){
            return !commandObject.author.bot;
        }
        return true;
    }
}
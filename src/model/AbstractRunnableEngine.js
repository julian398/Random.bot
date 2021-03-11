import {WorkerFactory} from "../factory/WorkerFactory";

const {prefix} = require("./config.json");

export class AbstractRunnableEngine {
    static pf = prefix;

    _name;
    _description;

    constructor({name, description}) {
        WorkerFactory.instance.registerClass(this);
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }


    canHandle(message) {
        return !message.author.bot;
    }
}
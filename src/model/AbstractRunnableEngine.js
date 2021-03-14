const { prefix } = require("../../config.json");

export class AbstractRunnableEngine {
    static pf = prefix;

    _name;
    _description;

    constructor({name, description}) {
        this._name = name;
        this._description = description;
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
        const [message] = commandObject;
        if(message.author){
            return !message.author.bot;
        }
        return true;
    }
}
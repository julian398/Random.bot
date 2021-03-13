export class CommandDescriptor{

    _args;
    _commandObject;
    _event;
    _prefix;

    constructor(commandObject, args, event, prefix) {
        this._commandObject = commandObject;
        this._args = args;
        this._event = event;
        this._prefix = prefix;
    }

    get commandObject() {
        return this._commandObject;
    }

    get args() {
        return this._args;
    }

    get event(){
        return this._event;
    }

    get prefix(){
        return this._prefix;
    }

    get command(){
        if(this._args == null){
            return  "";
        }
        return this._args.shift().toLowerCase();
    }
}
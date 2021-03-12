export class CommandDescriptor{

    _command;
    _args;
    _commandObject;
    _event;
    _prefix;

    constructor(commandObject, args, command, event, prefix) {
        this._commandObject = commandObject;
        this._args = args;
        this._command = command;
        this._event = event;
        this._prefix = prefix;
    }

    get commandObject() {
        return this._commandObject;
    }

    get args() {
        return this._args;
    }

    get command() {
        return this._command;
    }

    get event(){
        return this._event;
    }

    get prefix(){
        return this._prefix;
    }
}
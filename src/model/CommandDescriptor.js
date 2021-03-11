export class CommandDescriptor{

    _command;
    _args;
    _message;
    _event;
    _prefix;

    constructor(message, args, command, event, prefix) {
        this._message = message;
        this._args = args;
        this._command = command;
        this._event = event;
        this._prefix = prefix;
    }

    get message() {
        return this._message;
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
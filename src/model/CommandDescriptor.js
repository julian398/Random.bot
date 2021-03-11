export class CommandDescriptor{

    _command;
    _args;
    _message;
    constructor(message, args, command) {
        this._message = message;
        this._args = args;
        this._command = command;
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
}
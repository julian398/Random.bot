import {ClientEvents} from "discord.js";

export class CommandDescriptor<K extends keyof ClientEvents> {

    private readonly _args: string[];
    private readonly _commandObject: ClientEvents[K];
    private readonly _event: K;
    private readonly _prefix: string;

    constructor(args: string[], event: K, prefix: string, ...commandObject: ClientEvents[K]) {
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

    get event() {
        return this._event;
    }

    get prefix() {
        return this._prefix;
    }

    get command() {
        if (this._args == null) {
            return "";
        }
        return this._args[0].toLowerCase();
    }
}
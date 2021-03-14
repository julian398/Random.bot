import {IAbstractRunnableEngine} from "./IAbstractRunnableEngine";
import {ClientEvents} from "discord.js";
import {CommandDescriptor} from "./CommandDescriptor";

const {prefix} = require("../../config.json");

export abstract class AbstractRunnableEngine<K extends keyof ClientEvents> implements IAbstractRunnableEngine<K> {
    protected static pf: string = prefix;

    private readonly _name: string;
    private readonly _description: string;

    protected constructor({name, description}) {
        this._name = name;
        this._description = description;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }


    public canHandle(commandDescriptor: CommandDescriptor<K>): boolean {
        if (!commandDescriptor.commandObject) {
            return false;
        }
        const commandObjArr = commandDescriptor.commandObject;
        if (commandDescriptor.event === "message") {
            return !commandObjArr[0].author.bot;
        }
        return true;
    }

    public abstract execute(events: CommandDescriptor<K>): Promise<void>;
}

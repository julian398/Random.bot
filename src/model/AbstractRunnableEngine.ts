import {IAbstractRunnableEngine} from "./IAbstractRunnableEngine";
import {ClientEvents} from "discord.js";
import {CommandDescriptor} from "./CommandDescriptor";

const {prefix} = require("../../config.json");

export type engineConstructorArgument = {
    "name": string,
    "description": string,
    "cooldown"?: Cooldown
}
export type Cooldown = {
    "type": "static" | "instance",
    "duration": number
}

export abstract class AbstractRunnableEngine<K extends keyof ClientEvents> implements IAbstractRunnableEngine<K> {
    protected static pf: string = prefix;

    private readonly _name: string;
    private readonly _description: string;
    private readonly _cooldown: Cooldown;

    protected constructor({name, description, cooldown}: engineConstructorArgument) {
        this._name = name;
        this._description = description;
        this._cooldown = cooldown;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get cooldown(): Cooldown {
        return this._cooldown;
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

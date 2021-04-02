import {IAbstractRunnableEngine} from "./IAbstractRunnableEngine";
import {ClientEvents, Message} from "discord.js";
import {CommandDescriptor} from "./CommandDescriptor";
import {TimedSet} from "./TimedSet";

const {prefix} = require("../../config.json");

export type engineConstructorArgument = {
    "name": string,
    "description": string,
    "cooldown"?: Cooldown
}
export type Cooldown = {
    "type": "global" | "user",
    "duration": number,
    "coolDownResponse"?: string
}

export abstract class AbstractRunnableEngine<K extends keyof ClientEvents> implements IAbstractRunnableEngine<K> {
    protected static pf: string = prefix;

    private readonly _name: string;
    private readonly _description: string;
    private readonly _cooldown: Cooldown;
    private readonly _cooldownArray: TimedSet<string>;


    protected constructor({name, description, cooldown}: engineConstructorArgument) {
        this._name = name;
        this._description = description;
        this._cooldown = cooldown;
        if (cooldown) {
            this._cooldownArray = new TimedSet(cooldown.duration);
        }
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
            const messageObject = commandObjArr[0];
            const isaBot = messageObject.author.bot;
            if (isaBot) {
                return false;
            }
            if (this._cooldown) {
                if (this._cooldown.type === "global") {
                    if (!this._cooldownArray.isEmpty()) {
                        this.sendCooldownResponse(this._cooldown.coolDownResponse, messageObject);
                        return false;
                    }
                } else {
                    if (this.isUserinCooldown(messageObject.author.id)) {
                        this.sendCooldownResponse(this._cooldown.coolDownResponse, messageObject);
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private addToCooldown(message: Message): void {
        if (this._cooldown.type === "global") {
            this._cooldownArray.add(this.name);
        } else {
            this._cooldownArray.add(message.author.id);
        }
    }

    public execute(events: CommandDescriptor<K>): Promise<void> {
        const eventArray = events.commandObject;
        if (eventArray.length > 0) {
            const [eventObject] = eventArray;
            if (eventObject instanceof Message && this._cooldown) {
                this.addToCooldown(eventObject);
            }
        }
        return Promise.resolve();
    }

    private isUserinCooldown(userID: string): boolean {
        return this._cooldownArray.rawSet.find(userIDInset => userID === userIDInset) != null;
    }

    private sendCooldownResponse(response: string, message: Message) {
        if (response) {
            message.reply(response);
        }
    }
}
 

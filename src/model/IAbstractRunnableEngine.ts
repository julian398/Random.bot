import {ClientEvents} from "discord.js";
import {CommandDescriptor} from "./CommandDescriptor";
import {Cooldown} from "./AbstractRunnableEngine";

export interface IAbstractRunnableEngine<K extends keyof ClientEvents> {

    /**
     * Get the name of this engine
     */
    readonly name: string;

    /**
     * get the description of this engine
     */
    readonly description: string;

    /**
     * get the cooldown of this event or command
     */
    readonly cooldown:Cooldown;

    /**
     * this is called to determaine
     * @param clientEvent
     */
    canHandle(clientEvent: CommandDescriptor<K>): boolean;

    /**
     * Execure this engine
     * @param events
     */
    execute(events: CommandDescriptor<K>): Promise<void>;
}
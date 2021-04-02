import {AbstractRunnableEngine, engineConstructorArgument} from "./AbstractRunnableEngine";
import {CommandDescriptor} from "./CommandDescriptor";
import {ClientEvents} from "discord.js";

export abstract class AbstractEvent<K extends keyof ClientEvents> extends AbstractRunnableEngine<K> {
    private readonly _eventType: K;

    protected constructor(desc: engineConstructorArgument, eventType: K) {
        super(desc);
        this._eventType = eventType;
    }

    public canHandle(commandObject: CommandDescriptor<K>): boolean {
        return super.canHandle(commandObject) && commandObject.event === this._eventType;
    }
}
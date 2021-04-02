import {AbstractEvent} from "./AbstractEvent";
import {engineConstructorArgument} from "./AbstractRunnableEngine";
import {CommandDescriptor} from "./CommandDescriptor";

type engineConstructorArgumentForMessageEvent = engineConstructorArgument & {
    "phraseMatch": string[]
}

export abstract class AbstractMessageEvent extends AbstractEvent<"message"> {
    private readonly _phrasesToMatch: string[];

    protected constructor(event: engineConstructorArgumentForMessageEvent) {
        super(event, "message");
        this._phrasesToMatch = event.phraseMatch;
    }

    canHandle(commandObject: CommandDescriptor<"message">): boolean {
        if (!super.canHandle(commandObject)) {
            return false;
        }
        const commandWrapper = commandObject.commandObject;
        const [message] = commandWrapper;
        let includes = false;
        for (const phrase of this._phrasesToMatch) {
            if (message.content.toLowerCase().includes(phrase)) {
                includes = true;
                this.addToCooldown(message);
                break;
            }
        }
        return includes;
    }
}
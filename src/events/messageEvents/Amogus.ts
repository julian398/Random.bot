import {CommandDescriptor} from "../../model/CommandDescriptor";
import {AbstractMessageEvent} from "../../model/AbstractMessageEvent";

export class Amogus extends AbstractMessageEvent {

    constructor() {
        super({
            name: "Amogus",
            description: "Send radnom youtube video when said in chat",
            phraseMatch: ["amogus", "sus"]
        });
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        message.channel.send(`https://tenor.com/view/cum-scary-death-help-me-gif-18207070`);
    }
}
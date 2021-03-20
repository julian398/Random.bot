import {AbstractEvent} from "../../model/AbstractEvent";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class CumMonster extends AbstractEvent<"message"> {

    constructor() {
        super({
            name: "CumMonster",
            description: "Post cum monster gif whenever someone say it in chat"
        }, "message");
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        if (message.content.toLowerCase().includes(`cum monster`)) {
            message.channel.send(`https://tenor.com/view/cum-scary-death-help-me-gif-18207070`);
        }
    }
}
import {AbstractEvent} from "../../model/AbstractEvent";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class Amogus extends AbstractEvent<"message"> {

    constructor() {
        super({
            name: "Amogus",
            description: "Send radnom youtube video when said in chat"
        }, "message");
    }

    public async execute(commandObject: CommandDescriptor<"message">): Promise<void> {
        await super.execute(commandObject);
        const [message] = commandObject.commandObject;
        if (message.content.toLowerCase().includes(`amogus`) || message.content.toLowerCase().includes(`sus`)) {
            message.channel.send(`https://tenor.com/view/cum-scary-death-help-me-gif-18207070`);
        }
    }
}
import {AbstractEvent} from "../../model/AbstractEvent";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class CumMonster extends AbstractEvent<"message"> {

    constructor() {
        super({
            name: "CumMonster",
            description: "Post cum monster gif whenever someone say it in chat",
            cooldown: {
                type: "user",
                duration: 86400000,
                coolDownResponse: "The cum monster comes out once every day"
            }
        }, "message");
    }

    public async execute(commandObject: CommandDescriptor<"message">): Promise<void> {
        await super.execute(commandObject);
        const [message] = commandObject.commandObject;
        if (message.content.toLowerCase().includes(`cum monster`)) {
            message.channel.send(`https://tenor.com/view/cum-scary-death-help-me-gif-18207070`);
        }
    }
}
import {CommandDescriptor} from "../../model/CommandDescriptor";
import {AbstractMessageEvent} from "../../model/AbstractMessageEvent";

export class CumMonster extends AbstractMessageEvent {

    constructor() {
        super({
            name: "CumMonster",
            description: "Post cum monster gif whenever someone say it in chat",
            phraseMatch: ["cum monster"],
            cooldown: {
                type: "user",
                duration: 86400000,
                coolDownResponse: "The cum monster comes out once every day"
            }
        });
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        message.channel.send(`https://tenor.com/view/cum-scary-death-help-me-gif-18207070`);
    }
}
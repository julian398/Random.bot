import {CommandDescriptor} from "../../model/CommandDescriptor";
import {AbstractMessageEvent} from "../../model/AbstractMessageEvent";

export class HornyAss extends AbstractMessageEvent {

    constructor() {
        super({
            name: "HornyAss",
            description: "Post ani horny message when Ari pings furry cunt",
            phraseMatch: ["daddy"]
        });
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        if (message.author.id === "395722113505296406") {
            message.reply("No horny");
        }
    }
}
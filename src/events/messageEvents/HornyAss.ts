import {AbstractEvent} from "../../model/AbstractEvent";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class HornyAss extends AbstractEvent<"message"> {

    constructor() {
        super({
            name: "HornyAss",
            description: "Post ani horny message when Ari pings furry cunt"
        }, "message");
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        if(message.content.toLocaleLowerCase().includes(`daddy`) && message.author.id === "395722113505296406"){
            message.reply("No horny");
        }
    }
}
import {AbstractEvent} from "../../model/AbstractEvent";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class CumMonster extends AbstractEvent<"message"> {

    constructor() {
        super({
            name: "HornyAss",
            description: "Post ani horny message when Ari pings furry cunt"
        }, "message");
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        for(const user of message.mentions.users){
            if(user[1].id === "346801567170822156" && message.author.id === "395722113505296406"){
                message.reply("No horny");
            }
        }
    }
}
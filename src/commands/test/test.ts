import {AbstractCommand} from "../../model/AbstractCommand";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class Test extends AbstractCommand {
    constructor() {
        super({
            name: "ping",
            description: "Test new command"
        });
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        if(message.author.id === "270632394137010177"){
            message.reply("pong");
        }
    }
}
import {AbstractCommand} from "../../model/AbstractCommand";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class Serverinfo extends AbstractCommand {
    constructor() {
        super({
            name: "serverinfo",
            description: "Provides general info on the server"
        });
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        message.channel.send(`Server name: ${message.guild.name} \nCurrent server users: ${message.guild.memberCount}`);
    }
}
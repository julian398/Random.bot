import {AbstractCommand} from "../../model/AbstractCommand";
import {CommandDescriptor} from "../../model/CommandDescriptor";
import {Roles} from "../../enums/Roles";

export class KickEngine extends AbstractCommand {
    constructor() {
        super({
            name: "kick",
            description: "kicks a given user from the server"
        }, [Roles.RolesID.SHOGUN, Roles.RolesID.OBER]);
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        const taggedUser = message.mentions.users.first();
        if (taggedUser == undefined) {
            message.channel.send(`You didn't tag anyone ${message.author}`);
        } else {
            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
    }

}
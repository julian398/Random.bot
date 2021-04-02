import {AbstractCommand} from "../../model/AbstractCommand";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class Avatar extends AbstractCommand {
    constructor() {
        super({
            name: "avatar",
            description: "Returns the avatar of a given user or of the person"
        });
    }

    public async execute(commandObject: CommandDescriptor<"message">): Promise<void> {
        await super.execute(commandObject);
        const [message] = commandObject.commandObject;
        if (!message.mentions.users.size) {
            message.channel.send(`Your avatar: ${message.author.displayAvatarURL({format: "png", dynamic: false})}`);
            return;
        } else {
            const avatarlist = message.mentions.users.map(user => {
                return `${user.username}'s avatar is: ${user.displayAvatarURL({format: "png", dynamic: true})}`;
            });

            message.channel.send(avatarlist);
        }
    }
}
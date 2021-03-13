import {AbstractCommand} from "../../model/AbstractCommand";

export class Avatar extends AbstractCommand{
    constructor() {
        super({
            name: "avatar",
            description: "Returns the avatar of a given user or of the person"
        });
    }

    execute({commandObject}) {
        const [message] = commandObject;
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ format: "png", dynamic: false })}`);
        }
        else{
            const avatarlist = message.mentions.users.map(user => {
                return `${user.username}'s avatar is: ${user.displayAvatarURL({ format: "png", dynamic: true })}`;
            });

            message.channel.send(avatarlist);
        }
    }
}
new Avatar();
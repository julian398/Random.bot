import {AbstractCommand} from "../../model/AbstractCommand";

export class Avatar extends AbstractCommand{
    constructor() {
        super({
            name: "avatar",
            description: "Returns the avatar of a given user or of the person"
        });
    }

    execute({commandObject}) {
        if (!commandObject.mentions.users.size) {
            return commandObject.channel.send(`Your avatar: ${commandObject.author.displayAvatarURL({ format: "png", dynamic: false })}`);
        }
        else{
            const avatarlist = commandObject.mentions.users.map(user => {
                return `${user.username}'s avatar is: ${user.displayAvatarURL({ format: "png", dynamic: true })}`;
            });

            commandObject.channel.send(avatarlist);
        }
    }
}
new Avatar();
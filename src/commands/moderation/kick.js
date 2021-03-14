import {AbstractCommand} from "../../model/AbstractCommand";

export class KickEngine extends AbstractCommand{
    constructor() {
        super({
            name: "kick",
            description: "kicks a given user from the server"
        });
    }

    execute({commandObject}) {
        const [message] = commandObject;
        const taggedUser = message.mentions.users.first();
        if(taggedUser == undefined) {
            message.channel.send(`You didn't tag anyone ${message.author}`);
        }
        else{
            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
    }
}
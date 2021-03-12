import {AbstractRunnableEngine} from "../../model/AbstractRunnableEngine";
import {AbstractCommand} from "../../model/AbstractCommand";

export class KickEngine extends AbstractCommand{
    constructor() {
        super({
            name: "kick",
            description: "kicks a given user from the server"
        });
    }

    execute({commandObject}) {
        const taggedUser = commandObject.mentions.users.first();
        if(taggedUser == undefined) {
            commandObject.channel.send(`You didn't tag anyone ${commandObject.author}`);
        }
        else{
            commandObject.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
    }
}
new KickEngine();
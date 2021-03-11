import {AbstractRunnableEngine} from "../../model/AbstractRunnableEngine";

export class KickEngine extends AbstractRunnableEngine{
    constructor() {
        super({
            name: "kick",
            description: "kicks a given user from the server"
        });
    }

    canHandle({message}){
        return message.content.startsWith(AbstractRunnableEngine.pf) && super.canHandle();
    }

    execute({message}) {
        const taggedUser = message.mentions.users.first();
        if(taggedUser == undefined) {
            message.channel.send(`You didn't tag anyone ${message.author}`);
        }
        else{
            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
    }
}
new KickEngine();
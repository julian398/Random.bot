import {AbstractRunnableEngine} from "../../model/AbstractRunnableEngine";
export class Serverinfo extends AbstractRunnableEngine {
    constructor() {
        super({
            name: "serverinfo",
            description: "Provides general info on the server"
        });
    }

    execute(message) {
        message.channel.send(`Server name: ${message.guild.name} \nCurrent server users: ${message.guild.memberCount}`);
    }
}
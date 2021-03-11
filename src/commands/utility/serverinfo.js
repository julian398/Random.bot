import {AbstractCommand} from "../../model/AbstractCommand";

export class Serverinfo extends AbstractCommand {
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

new Serverinfo();
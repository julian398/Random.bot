import {AbstractCommand} from "../../model/AbstractCommand";

export class Serverinfo extends AbstractCommand {
    constructor() {
        super({
            name: "serverinfo",
            description: "Provides general info on the server"
        });
    }

    execute({commandObject}) {
        const [message] = commandObject;
        message.channel.send(`Server name: ${commandObject.guild.name} \nCurrent server users: ${commandObject.guild.memberCount}`);
    }
}

new Serverinfo();
import {AbstractCommand} from "../../model/AbstractCommand";

export class ArgsInfo extends AbstractCommand {
    constructor() {
        super({
            name: "args-info",
            description: "gives you the argumens (if any) of the given message"
        });
    }

    execute({message, args, command}) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
}
new ArgsInfo();
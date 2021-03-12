import {AbstractCommand} from "../../model/AbstractCommand";

export class ArgsInfo extends AbstractCommand {
    constructor() {
        super({
            name: "args-info",
            description: "gives you the argumens (if any) of the given message"
        });
    }

    execute({commandObject, args}) {
        if (!args.length) {
            return commandObject.channel.send(`You didn't provide any arguments, ${commandObject.author}!`);
        }
        commandObject.channel.send(`Command name: ${this.name}\nArguments: ${args}`);
    }
}
new ArgsInfo();
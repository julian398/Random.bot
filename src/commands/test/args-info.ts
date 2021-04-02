import {AbstractCommand} from "../../model/AbstractCommand";
import {CommandDescriptor} from "../../model/CommandDescriptor";

export class ArgsInfo extends AbstractCommand {
    constructor() {
        super({
            name: "args-info",
            description: "gives you the argumens (if any) of the given message"
        });
    }

    public async execute(commandObject: CommandDescriptor<"message">): Promise<void> {
        await super.execute(commandObject);
        const [message] = commandObject.commandObject;
        const {args} = commandObject;
        if (!args.length) {
            message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            return;
        }
        message.channel.send(`Command name: ${this.name}\nArguments: ${args}`);
    }
}
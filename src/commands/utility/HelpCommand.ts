import {AbstractCommand} from "../../model/AbstractCommand";
import {factory} from "../../index";
import {MessageEmbed} from "discord.js";
import {CommandDescriptor} from "../../model/CommandDescriptor";
import {IAbstractRunnableEngine} from "../../model/IAbstractRunnableEngine";

export class HelpCommand extends AbstractCommand {
    constructor() {
        super({
            name: "help",
            description: "display help for commands"
        });
    }

    public async execute({commandObject}: CommandDescriptor<"message">): Promise<void> {
        const [message] = commandObject;
        const allEngines: IAbstractRunnableEngine<"message">[] = factory.engines;
        const commands: AbstractCommand[] = allEngines.filter(e => e instanceof AbstractCommand) as AbstractCommand[];
        if (commands.length === 0) {
            message.reply("No commands are avalible");
            return;
        }
        const guildName = message.guild.name;
        const guildUrl = message.guild.iconURL({
            dynamic: true
        });
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Commands")
            .setAuthor(guildName, guildUrl)
            .setDescription("Below are a list of all commands that contain arguments")
            .setTimestamp();
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            const {name, description} = command;
            if (i % 3 === 0 && i !== 0) {
                embed.addField("\u200B", "\u200B");
            }
            embed.addField(name, description, true);
        }
        message.reply(embed);
    }
}
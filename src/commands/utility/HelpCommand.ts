import {AbstractCommand} from "../../model/AbstractCommand";
import {factory} from "../../index";
import {AbstractRunnableEngine} from "../../model/AbstractRunnableEngine";
import {Message, MessageEmbed} from "discord.js";

export class HelpCommand extends AbstractCommand {
    constructor() {
        super({
            name: "help",
            description: "display help for commands"
        });
    }

    public execute({commandObject}) {
        const message: Message = commandObject[0];
        const allEngines: AbstractRunnableEngine[] = factory.engines;
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
            let command = commands[i];
            const {name, description} = command;
            if (i % 3 === 0 && i !== 0) {
                embed.addField("\u200B", "\u200B");
            }
            embed.addField(name, description, true);
        }
        message.reply(embed);
    }
}
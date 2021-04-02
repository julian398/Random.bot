import { GuildUtils } from "../Utils/Utils";
import { AbstractEvent } from "../model/AbstractEvent";
import { CommandDescriptor } from "../model/CommandDescriptor";
import { Channel, TextChannel } from "discord.js";

export class OnReady extends AbstractEvent<"ready">{

    constructor() {
        super({
            name: "OnReady",
            description: "Initializes all necessary processes in startup"
        }, "ready");
    }

    public async execute(events: CommandDescriptor<"ready">): Promise<void> {
        this.day();
        this.night();
        console.log("Ready!");
    }
    private async night(): Promise<void> {
        const schedule = require('node-schedule');

        const job = schedule.scheduleJob('00 4 * * *', function(){
            const channel = GuildUtils.getGuildObject().channels.cache.find(channel => channel.name === `bot-bullshit`) as TextChannel;
            channel.send("Hora de mimir.", {
                files: [{
                    attachment: `${__dirname}/../Resources/mimir.mp4`,
                    name: 'mimir.mp4'
                }]
              });
        });
    }

    private async day(): Promise<void> {
        const schedule = require('node-schedule');

        const job = schedule.scheduleJob('00 13 * * *', function(){
            const channel = GuildUtils.getGuildObject().channels.cache.find(channel => channel.name === `bot-bullshit`) as TextChannel;
            channel.send("A despertar.", {
                files: [{
                    attachment: `${__dirname}/../Resources/despertar.mp4`,
                    name: `despertar.mp4`
                }]
              });
        });
    } 
}
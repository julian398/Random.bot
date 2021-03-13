import {WorkerFactory} from "./factory/WorkerFactory";
import {CommandDescriptor} from "./model/CommandDescriptor";

const {Discord, Message} = require("discord.js");
const {prefix, token} = require("./config.json");

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", message => executeInternal(message, "message"));

client.on("guildMemberAdd", member => executeInternal(member, "guildMemberAdd"));

async function executeInternal(eventObject, event){
    const container = getCommandDescriptor(eventObject, event);
    for (const engine of await getEngines(container)) {
        engine.execute(container);
    }
}

async function getEngines(container) {
    const retArr = [];
    const engines = await WorkerFactory.getInstance().getRunnableEngines(container);
    for (const engine of engines) {
        retArr.push(container);
    }
    return retArr;
}

/***
 * For multi event objects like guildBanAdd, you might want to make it an array
 * @param eventObject
 * @param event
 * @returns {CommandDescriptor}
 */
function getCommandDescriptor(eventObject, event) {
    if (eventObject instanceof Message) {
        const args = eventObject.content.slice(prefix.length).trim().split(/ +/);
        return new CommandDescriptor(eventObject, args, event, prefix);
    }
    return new CommandDescriptor(eventObject, null, event, prefix);
}

client.login(token);

import {WorkerFactory} from "./factory/WorkerFactory";
import {CommandDescriptor} from "./model/CommandDescriptor";

import * as Discord from "discord.js";
const { prefix, token } = require("../config.json");

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", message => executeInternal("message", message));

client.on("guildMemberAdd", member => executeInternal("guildMemberAdd", member));

client.on("roleUpdate" , (oldRole, newRole) => executeInternal("roleUpdate", oldRole, newRole));

async function executeInternal(event, ...eventObject){
    const container = getCommandDescriptor(eventObject, event);
    for (const engine of await getEngines(container)) {
        engine.execute(container);
    }
}

async function getEngines(container) {
    const retArr = [];
    const engines = (await WorkerFactory.getInstance()).getRunnableEngines(container);
    for (const engine of engines) {
        retArr.push(engine);
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
    if (eventObject[0] instanceof Discord.Message) {
        const args = eventObject[0].content.slice(prefix.length).trim().split(/ +/);
        return new CommandDescriptor(eventObject, args, event, prefix);
    }
    return new CommandDescriptor(eventObject, null, event, prefix);
}

client.login(token);

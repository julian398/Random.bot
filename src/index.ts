import {WorkerFactory} from "./factory/WorkerFactory";
import {CommandDescriptor} from "./model/CommandDescriptor";

import * as Discord from "discord.js";
import {ClientEvents} from "discord.js";
import {IAbstractRunnableEngine} from "./model/IAbstractRunnableEngine";

const {prefix, token} = require("../config.json");

export const client = new Discord.Client();

client.once("ready", () => executeInternal("ready"));

export let factory: WorkerFactory = null;

client.on("message", message => executeInternal("message", message));

client.on("guildMemberAdd", member => executeInternal("guildMemberAdd", member));

client.on("roleUpdate", (oldRole, newRole) => executeInternal("roleUpdate", oldRole, newRole));

async function executeInternal<K extends keyof ClientEvents>(event: K, ...eventObject: ClientEvents[K]) {
    const container = getCommandDescriptor(event, ...eventObject);
    for (const engine of await getEngines(container)) {
        engine.execute(container);
    }
}

function getEngines<K extends keyof ClientEvents>(container: CommandDescriptor<K>): IAbstractRunnableEngine<K>[] {
    const retArr: IAbstractRunnableEngine<K>[] = [];
    const engines = factory.getRunnableEngines(container);
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
function getCommandDescriptor<K extends keyof ClientEvents>(event: K, ...eventObject: ClientEvents[K]) {
    if (eventObject[0] instanceof Discord.Message) {
        const args = eventObject[0].content.slice(prefix.length).trim().split(/ +/);
        return new CommandDescriptor(args, event, prefix, ...eventObject);
    }
    return new CommandDescriptor(null, event, prefix, ...eventObject);
}

async function load() {
    factory = await WorkerFactory.getInstance();
    client.login(token);
}

load();

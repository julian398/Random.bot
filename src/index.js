import {WorkerFactory} from "./factory/WorkerFactory";
import {CommandDescriptor} from "./model/CommandDescriptor";
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {

  const engines = WorkerFactory.instance.getRunnableEngines(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const messageObj = new CommandDescriptor(message, args, commandName);
  for(const engine of engines){
    engine.execute(messageObj);
  }

});

client.login(token);

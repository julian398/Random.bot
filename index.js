const fs = require('fs');
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "serverinfo") {
    client.commands.get(`serverinfo`).execute(message);
  }
  else if (command === "args-info") {
    client.commands.get(`args-info`).execute(message, args, command);
  }
  else if (command === 'kick') {
    client.commands.get(`kick`).execute(message);
  }
  else if (command === 'avatar') {
    client.commands.get(`avatar`).execute(message);
  }
});

client.login(token);

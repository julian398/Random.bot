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
    message.channel.send(
      "Server name: " +
        message.guild.name +
        "\nCurrent server users: " +
        message.guild.memberCount +
        "\nServer creation date: " +
        // eslint-disable-next-line comma-dangle
        message.guild.createdAt
    );
  }
  else if (command === "args-info") {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    message.channel.send(`Command name: ${command}\nArguments: ${args}`);
  }
  else if (command === 'kick') {
    const taggedUser = message.mentions.users.first();
    if(taggedUser == undefined) {
      message.channel.send(`You didn't tag anyone ${message.author}`);
    }
    else{
      message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
  }
  else if (command === 'avatar') {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ format: "png", dynamic: false })}`);
    }
    else{
      const taggedUser = message.mentions.users.first();
      return message.channel.send(`${taggedUser}'s avatar is: ${taggedUser.displayAvatarURL({ format: "png", dynamic: false })}`);
    }
  }
});

client.login(token);

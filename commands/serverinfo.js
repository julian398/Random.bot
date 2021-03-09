module.exports = {
    name: `serverinfo`,
    description: `Provides general info on the server`,
    execute(message, args){
        message.channel.send(`Server name: ${message.guild.name} \nCurrent server users: ${message.guild.memberco}`);
    }
}
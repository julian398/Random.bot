module.exports = {
    name: `kick`,
    dresciption: `kicks a given user from the server`,

    execute(message, args) {
        const taggedUser = message.mentions.users.first();
        if(taggedUser == undefined) {
          message.channel.send(`You didn't tag anyone ${message.author}`);
        }
        else{
          message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
    },
};
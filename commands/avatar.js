module.exports = {
    name: `avatar`,
    description: `Returns the avatar of a given user or of the person`,
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ format: "png", dynamic: false })}`);
          }
          else{
            const taggedUser = message.mentions.users.first();
            return message.channel.send(`${taggedUser}'s avatar is: ${taggedUser.displayAvatarURL({ format: "png", dynamic: false })}`);
          }
    },
};
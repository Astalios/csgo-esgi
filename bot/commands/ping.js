module.exports = {
    name: 'ping',
    description: 'Ping bot !',
    args: false,
    usage: false,
    cooldown: 5,
    execute(message, args) {
        message.channel.send('Pong.');
    },
};

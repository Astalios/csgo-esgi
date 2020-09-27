const prefix = '!csgo';
module.exports = {
    name: 'help',
    description: 'List all commands or info about a specific one.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.channel.send(data, { split: true })
                .catch(error => {
                    console.error(`Could not help message on ${message.channel.name}.\n`, error);
                });
        }
    },
};

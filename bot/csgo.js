let msg = false;
module.exports = {
    ask: function (message, command, args) {
        msg = message;
        switch (command) {
            case 'ping':
                return 'pong';
            case 'help':
                return '\n' +
                    '!csgo help ==> commands list \n'+
                    '!csgo ping ==> ping bot \n'+
                    '!csgo shuffle ==> creates 2 teams with same average level \n'+
                    '!csgo prune {number} ==> deletes {number} latest messages (1 > {number} < 20 \n'+
                    '!csgo ping ==> ping bot \n';
            case 'shuffle':
                return shuffle(args[0]);
            case 'prune':
                if (!args.length) {
                    return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
                }
                return prune(args);
            default:
                return 'Type !csgo help to get commands list';
        }
    }
}

function shuffle(msg) {
    return undefined;
}

function prune(number) {

    if (isNaN(number)) {
        return 'Please provide a valid number !';
    }
    if (number < 1 && number > 20) {
        return 'Please provided a number between 1 and 20 !';
    }

    msg.channel.bulkDelete(number)
    return `${number} message(s) have been deleted`;

}

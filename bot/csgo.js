module.exports = {
    ask: function (command) {
        switch (command) {
            case 'ping':
                return 'pong';
            case 'help':
                return '\n' +
                    '!help ==> commands list \n'+
                    '!ping ==> ping bot \n';
            default:
                return 'Type !csgo help to get commands list';
        }
    }
}

function shuffle() {
    return true;
}

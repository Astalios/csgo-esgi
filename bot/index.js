require('dotenv').config();
const discord = require('discord.js');
const bot = new discord.Client();
const csgo = require('./csgo.js');

bot.on('ready', () => {
        console.log('bot logged in !');
})

bot.on('message', function (msg) {

        if (msg.content === '!ping') {
                msg.reply('pong');
        }

        if (msg.content.indexOf('!csgo') === 0) {
                msg.reply(csgo.ask(msg.content.split('!csgo ')[1]));
        }

})

bot.login(process.env.DISCORD_TOKEN);

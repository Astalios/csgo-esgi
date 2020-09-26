require('dotenv').config();
const discord = require('discord.js');
const bot = new discord.Client();
const csgo = require('./csgo.js');
const prefix = '!csgo';

bot.on('ready', () => {
        console.log('bot logged in !');
})

bot.on('message', function (msg) {
        if (!msg.content.startsWith(prefix) || msg.author.bot) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        msg.reply(csgo.ask(msg, command, args));

})

bot.login(process.env.DISCORD_TOKEN);

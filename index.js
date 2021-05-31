require('dotenv').config();


const Discord = require('discord.js');
const cmdMap = require('./commands');
const client = new Discord.Client();
const cmdList = new Discord.Collection();
const logger = require('./logger');
const prefix = process.env.prefix;
const token = process.env.token;
const greetMsg = require('./view/greetNewUser.js');

Object.keys(cmdMap).map(key => {
    cmdList.set(cmdMap[key].name, cmdMap[key])
});

client.once('ready', () => {
    logger.info('Bot has been activated');
})
client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split();
    const cmd = args.shift().toLowerCase();
    if (!cmdList.has(cmd)) return;
    try {
        cmdList.get(cmd).execute(message, args);
        logger.info(`${message.author.username} Used ${cmd}`);
    } catch (error) {
        logger.error(error.stack);
    }

});

client.on('warn', () => {
    logger.warn(info);
});

client.on('guildMemberAdd', async member => {
    try {
        logger.info(`User ${member.user.username} just joined!`);
        const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');

        if (!channel) return;

        channel.send(greetMsg(member.user));
    } catch (error) {
        logger.error(error.stack);
    }
});

client.login(token);

require('dotenv').config();


const Discord = require('discord.js');
const cmdMap = require('./commands');
const client = new Discord.Client();
const cmdList = new Discord.Collection();
const logger = require('./logger');
const prefix = process.env.prefix;
const token = process.env.token;

Object.keys(cmdMap).map(key => {
    cmdList.set(cmdMap[key].name,cmdMap[key])
});

client.once('ready', () => {
    logger.info('Bot has been activated');
})
client.on('message', async (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split();
    const cmd = args.shift().toLowerCase();
    if(!cmdList.has(cmd)) return;
    try{
        cmdList.get(cmd).execute(message,args);
    }catch(error){
        logger.error(error.stack);
    }
 
});

client.login(token);


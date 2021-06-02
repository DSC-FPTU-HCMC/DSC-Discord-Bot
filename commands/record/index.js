const logger = require('../../logger');
const view = require('./view');
const voiceResolver = require('./voiceResolver');
const discord = require('discord.js');


module.exports = {
    name : 'record',
    desc : "This command will show menu of record function",
    execute : async function(msg,args){
        if(args.length == 0){
            msg.channel.send(view.printInfo());
            return;
        }

        if(args[0] == 'enter'){
            await voiceResolver.enter(msg);
            return;
        }

        if(args[0] == 'leave'){
            await voiceResolver.leave(msg);
            return;
        }

        if(args[0] == 'start'){
            await voiceResolver.start(msg);
        }

        if(args[0] == 'stop'){
            await voiceResolver.stop(msg);
        }

    }
}
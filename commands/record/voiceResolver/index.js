const logger = require('../../../logger');

module.exports = {
    enter : async function(msg){
        let userChannel = msg.member.voice.channel;
        if(userChannel === undefined || userChannel === null){
            msg.channel.send('You must be in a Voice Channel to use this command!');
        }
        try{
            var connection = userChannel.join();
            logger.info(`Joining Voice Channel of ${userChannel.toString()}`);
        }catch(error){
            logger.error(error.stack);
        }
    },

    leave : async function(msg){
        if(msg.guild.voiceStates.cache.filter(a => a.connection !== null).size !== 1)
        return;

        let {channel : botChannel} = msg.guild.voiceStates.cache.last();
        await botChannel.leave();
        
    }
}
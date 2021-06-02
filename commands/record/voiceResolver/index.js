const fs = require('fs');

const logger = require('../../../logger');
const audioResolver = require('./audioResolver');
const createNewChunk = () => {
    const pathToFile = __dirname + `/../../../tmp/records/${Date.now()}.pcm`;
    return fs.createWriteStream(pathToFile);
}

module.exports = {
    enter: async function (msg) {
        let userChannel = msg.member.voice.channel;
        if (userChannel === undefined || userChannel === null) {
            msg.channel.send('You must be in a Voice Channel to use this command!');
            return;
        }
        if (fs.existsSync('voice.lock')) {
            msg.channel.send('Lock located, Cannot Change ');
            return;
        }

        try {
            await userChannel.join();
            logger.info(`Joining Voice Channel of ${userChannel.name}`);
        } catch (error) {
            logger.error(error.stack);

        }
    },

    leave: async function (msg) {
        if (msg.guild.voiceStates.cache.filter(a => a.connection !== null).size !== 1)
            return;
        if (fs.existsSync('voice.lock')) {
            msg.channel.send('Lock located, Cannot Leave');
            return;
        }
        let {
            channel: botChannel
        } = msg.guild.voiceStates.cache.last();
        await botChannel.leave();


    },

    start: async function (msg) {
        if (msg.guild.voiceStates.cache.filter(a => a.connection !== null).size !== 1) {
            msg.channel.send('This function can only be used in a voice channel');
            return;
        }
        if (fs.existsSync('voice.lock')) {
            msg.channel.send('Another Channel Is Recording, Must be stopped');
            return;
        }
        let {
            channel: botChannel,
            connection: conn
        } = msg.guild.voiceStates.cache.last();
        logger.info(`Starting Recording on ${botChannel}`);
        msg.channel.send('Starting the Recording')
        fs.writeFileSync('voice.lock','lock');
        const receiver = conn.receiver;
        try {
            conn.on('speaking', (user, speaking) => {
                if (speaking) {
                    logger.info(`${user.username} started Speek`);
                    const audioStream = receiver.createStream(user, {
                        mode: 'pcm'
                    });
                    audioStream.pipe(createNewChunk());
                }
            })
        } catch (err) {
            logger.error(err.stack);
        }
    },

    stop: async function (msg) {
        if (msg.guild.voiceStates.cache.filter(a => a.connection !== null).size !== 1) {
            msg.channel.send('This function can only be used in a voice channel');
            return;
        }
        if(!fs.existsSync('voice.lock')){
            msg.channel.send('No Recording to be stopped');
            return;
        }
        try {
            fs.unlinkSync('voice.lock');
        } catch (err) {
            logger.error(err.stack);
        }
        let {
            channel: botChannel
        } = msg.guild.voiceStates.cache.last();
        await botChannel.leave();
        await audioResolver.saveRecord();
    }
}
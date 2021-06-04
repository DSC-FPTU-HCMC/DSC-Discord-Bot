const Lame = require('node-lame').Lame;
const logger = require('../../../logger');
const fs = require('fs');

function convertToMp3(inputPath,outputPath){
    let encoder = new Lame({
        output: outputPath,
        bitrate : 192,
        raw : true,
        sfreq : 44.1,
        'little-endian' : true
    }).setFile(inputPath);
    
    encoder.encode().then(() => {
        logger.info('Encoding Finished!');
    }).catch((error) => {
        logger.error(error.stack);
    })
}
function appendFiles(outputStream,currentfile,inputStream,chunks) {
    
    if (!chunks.length) {
        outputStream.end(() => logger.info('Finished.'));
        return;
    }

    currentfile = `${__dirname}/../../../tmp/records/` + chunks.shift();
    inputStream = fs.createReadStream(currentfile);

    inputStream.pipe(outputStream, { end: false });

    inputStream.on('end', async function() {
        logger.info(currentfile + ' appended');
        fs.unlinkSync(currentfile);
        await appendFiles(outputStream,currentfile,inputStream,chunks);
    });
}

module.exports.saveRecord = async function(){
    let inputStream, currentfile, outputStream = fs.createWriteStream(__dirname + `/../../../recordings/full_${new Date().getUTCHours()}.pcm`);
    let chunks = fs.readdirSync(__dirname + '/../../../tmp/records/');
    appendFiles(outputStream,currentfile,inputStream,chunks)
    convertToMp3(__dirname + `/../../../recordings/full_${new Date().getUTCHours()}.pcm`,__dirname + `/../../../recordings/full_${new Date().getUTCHours()}.mp3`);
    
    
}
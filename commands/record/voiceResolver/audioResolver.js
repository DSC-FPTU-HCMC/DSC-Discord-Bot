const Lame = require('node-lame').Lame;
const logger = require('../../../logger');
const fs = require('fs');

async function convertToMp3(inputPath,outputPath){
    const encoder = new Lame({
        output: outputPath,
        bitrate : 192,
        raw : true,
        sfreq : 44.1,
        'little-endian' : true
    }).setFile(inputPath);

    await encoder.encode().then(() => {
        logger.info('Encoding Finished!');
    }).catch((error) => {
        logger.error(error.stack);
    })
}
async function appendFiles(outputStream,currentfile,inputStream,chunks) {
    
    if (!chunks.length) {
        outputStream.end(() => console.log('Finished.'));
        return;
    }

    currentfile = `${__dirname}/../../../tmp/records/` + chunks.shift();
    inputStream = fs.createReadStream(currentfile);

    inputStream.pipe(outputStream, { end: false });

    inputStream.on('end', function() {
        console.log(currentfile + ' appended');
        fs.unlinkSync(currentfile);
        appendFiles(outputStream,currentfile,inputStream,chunks);
    });
}

module.exports.saveRecord = async function(){
    let inputStream, currentfile, outputStream = fs.createWriteStream(__dirname + `/../../../recordings/full_${new Date().getUTCHours()}.pcm`);
    let chunks = fs.readdirSync(__dirname + '/../../../tmp/records/');
    await appendFiles(outputStream,currentfile,inputStream,chunks);
    await convertToMp3(__dirname + `/../../../recordings/full_${new Date().getUTCHours()}.pcm`,__dirname + `/../../../recordings/full_${new Date().getUTCHours()}.mp3`,() => {
        return;
    });
}
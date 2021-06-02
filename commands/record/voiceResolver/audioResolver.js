const Lame = require('node-lame').Lame;
const logger = require('../../../logger');
const fs = require('fs');

function convertToMp3(inputPath,outputPath){
    const encoder = new Lame({
        output: outputPath,
        bitrate : 192
    }).setFile(inputPath);

    encoder.encode().then(() => {
        logger.info('Encoding Finished!');
    }).catch((error) => {
        logger.error(error.stack);
    })
}
function appendFiles(outputStream,currentfile,inputStream,chunks) {
    
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

module.exports.saveRecord = function(){
    let inputStream, currentfile, outputStream = fs.createWriteStream(__dirname + `/../../../recordings/full_${new Date().getUTCHours()}`);
    let chunks = fs.readdirSync(__dirname + '/../../../tmp/records/');
    appendFiles(outputStream,currentfile,inputStream,chunks);
    convertToMp3(__dirname + `/../../../recordings/full_${new Date().getUTCHours()}`,__dirname + `/../../../recordings/full_${new Date().getUTCHours()}.mp3`,() => {
        return;
    });
}
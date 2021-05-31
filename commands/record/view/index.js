
const msgEmbed = require('../../../utils/msgembed');

module.exports = {
    printInfo : function() {
        return msgEmbed
                .setTitle('Record')
                .setDescription(':red_circle: Recording Utils')
                .addField('enter','Order bot to join server')
                .addField('start', 'Order bot to start recording')
                .addField('stop', 'Order bot to stop recording');
        
    }
}
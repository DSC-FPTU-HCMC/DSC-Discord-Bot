module.exports = {
    printInfo: function () {
        return Discord.MessageEmbed()
            .setTitle('FPTU DSC Bot')
            .setAuthor('DSC FPT University', 'https://ca.slack-edge.com/T01SZJQ9K9P-U01U9AQ39QC-06d89ca32aeb-512')
            .setTitle('Record')
            .setDescription(':red_circle: Recording Utils')
            .addField('enter', 'Order bot to join server')
            .addField('start', 'Order bot to start recording')
            .addField('stop', 'Order bot to stop recording')
            .addField('TODO')

    }
}
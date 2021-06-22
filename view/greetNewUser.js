const Discord = require('discord.js');

module.exports = function (user) {
    new Discord.MessageEmbed()
        .setTitle('FPTU DSC Bot')
        .setAuthor('DSC FPT University', 'https://ca.slack-edge.com/T01SZJQ9K9P-U01U9AQ39QC-06d89ca32aeb-512')
        .setDescription(`Welcome!`)
        .addField(`Welcome ${user.username}!`, 'Hope you enjoy your stay!')
        .setThumbnail(user.displayAvatarURL())
        .setFooter('Bot made by DSC FPT Team', 'https://ca.slack-edge.com/T01SZJQ9K9P-U01U9AQ39QC-06d89ca32aeb-512')
        .setTimestamp();

}
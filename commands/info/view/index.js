const Discord = require('discord.js');
module.exports = {
    infoEmbed: function () {
        return Discord.MessageEmbed()
            .setDescription(`Welcome!`)
            .addField(`Welcome ${user.username}!`, 'Hope you enjoy your stay!')
            .setThumbnail(user.displayAvatarURL())
            .setColor('#FF0000')
            .setDescription('Just another bot made with NodeJS :v')
            .setThumbnail('https://scontent-sin6-1.xx.fbcdn.net/v/t1.6435-9/119635234_113361403846157_3803893491062188375_n.png?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=UCKBIQxpwfUAX-rYxxo&_nc_ht=scontent-sin6-1.xx&oh=fcfa6db1b98618a36c753e3c34396379&oe=60DB1682')
            .addFields({
                name: 'Description',
                value: 'This bot was created for utility in managing DSC Workspace'
            }, {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: 'Version',
                value: '0.0.0a',
                inline: true
            }, {
                name: 'Status',
                value: 'In-development',
                inline: true
            })
    }
}
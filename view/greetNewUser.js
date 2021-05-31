const embedMsg = require('../utils/msgembed');

module.exports = function(user) {
    embedMsg.setDescription(`Welcome!`)
            .addField(`Welcome ${user.username}!`,'Hope you enjoy your stay!')
            .setThumbnail(user.displayAvatarURL())
    return embedMsg;
}
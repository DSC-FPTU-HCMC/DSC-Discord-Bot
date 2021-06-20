const view = require('./view')
module.exports = {
    name: 'info',
    desc: 'Print out bot info',
    execute: function(msg,args){
        msg.channel.send(view.infoEmbed());  
    }
}
var Slack = require('node-slack')
var slack = new Slack("https://hooks.slack.com/services/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")

exports.sendMessage = async (username, channel,message) =>{
    try {
        await slack.send({
            text: message,
            channel: '#' + channel,
            username: username
        })
    } catch (err) {
       console.log('ERR ' + err) 
    }
    console.log('Sending message', message, 'to channel', channel)
}
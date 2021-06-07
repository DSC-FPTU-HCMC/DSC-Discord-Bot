const winston = require('winston');
require('winston-daily-rotate-file')

const path = './logs/';
const timeZone = () => {
    return new Date().toLocaleTimeString('en-US',{
        timeZone : 	'Asia/Ho_Chi_Minh'
    });
}

const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({
                    format : timeZone()
                }),
                winston.format.simple(),
                winston.format.printf(info => `[DSC FPTU Bot] ${info.timestamp} ${info.level} : ${info.message}`)
            )
        }),
        new winston.transports.DailyRotateFile({
            filename: path.concat('error-%DATE%.log'),
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({
                    format : timeZone()
                }),
                winston.format.simple(),
                winston.format.printf(info => `[DSC FPTU Bot] ${info.timestamp} ${info.level} : ${info.message}`)
            )
        }),
        new winston.transports.DailyRotateFile({
            filename: path.concat('info-%DATE%.log'),
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format : timeZone()
                }),
                winston.format.simple(),
                winston.format.printf(error => `[DSC FPTU Bot] ${error.timestamp} ${error.level} : ${error.message}`)
            )
        })
    ]
});

module.exports = logger;
const winston = require('winston');

const path = './logs/';
const logger = winston.createLogger({
    transports:[
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.simple(),
                winston.format.printf(info => `[DSC FPTU Bot] ${info.timestamp} ${info.level} : ${info.message}`)
            )
        }),
        new winston.transports.File({
            filename: path.concat('error.log'),
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
                winston.format.printf(info => `[DSC FPTU Bot] ${info.timestamp} ${info.level} : ${info.message}`)
            )
        }),
        new winston.transports.File({
            filename: path.concat('info.log'),
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
                winston.format.printf(info => `[DSC FPTU Bot] ${info.timestamp} ${info.level} : ${info.message}`)
            )
        })
    ]
});

module.exports = logger;
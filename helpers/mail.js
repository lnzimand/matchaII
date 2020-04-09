const sendmail = require('sendmail')();

function sendMail(options) {
    return new Promise((resolve, reject) =>
        sendmail({
            from: 'no-reply@yourdomain.com',
            to: options.to,
            subject: options.subject,
            html: options.message,
        }, (error, reply) => {
            console.log("send mail reply: " + reply)
            if (error){
                console.log("error message mail: " + error && error.stack)
                reject (error && error.stack)
            }
            console.log("resolved")
            resolve(reply)
        }))
}

export { sendMail }
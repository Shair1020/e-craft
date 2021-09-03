const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        const { to, subject, content } = options
        //create Transport
        var transport = nodemailer.createTransport({
            host: process.env.EMAIL_SERVICE_HOST,
            port: process.env.EMAIL_SERVICE_PORT,
            auth: {
                user: process.env.EMAIL_SERVICE_USER,
                pass: process.env.EMAIL_SERVICE_PASSWORD
            }
        });
        //define email options
        const emailOptions = {
            from: "ecraft@service.com",
            to,
            subject,
            text: content,
        }
        //send email
        await transport.sendMail(emailOptions)
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendEmail;
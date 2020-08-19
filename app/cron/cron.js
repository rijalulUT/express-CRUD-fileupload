require('dotenv').config()
module.exports = async nodemailer =>{
    let configEmail, transporter, emailTarget, mail

    configEmail = {
        service : 'gmail',
        auth    : {
            user: process.env.USER_EMAIL,
            pass: process.env.PASSWORD_EMAIL
        }
    }

    transporter = await nodemailer.createTransport(configEmail)
    emailTarget = 'mrijal05@gmail.com'

    mail = {
        to:emailTarget,
        from:configEmail.auth.user,
        subject: 'Pesanan Diterima',
        html : 'Pesanan kamu diterima, terimakasih'
    }

    transporter.sendMail(mail)
}
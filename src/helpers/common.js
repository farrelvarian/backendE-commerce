const nodemailer = require("nodemailer");

const sendEmail = (toEmail) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'blanjafashionculture@gmail.com', // generated ethereal user
            pass: 'belanja terus13', // generated ethereal password
        },
    });
    transporter.sendMail({
        from: '"Blanja Fashion Culture" <blanjafashionculture@gmail.com>', // sender address
        to: toEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
}

module.exports = {
    sendEmail,
};
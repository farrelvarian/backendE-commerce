const nodemailer = require("nodemailer");
const emailTemplate = require("./emailTemplate.js");

const sendEmail = (toEmail, toName, token) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.BLANJA_EMAIL, // generated ethereal user
            pass: process.env.BLANJA_PASS, // generated ethereal password
        },
    });
    transporter
        .sendMail({
            from: '"Blanja Fashion Culture" <blanjafashionculture@gmail.com>', // sender address
            to: `${toEmail}`, // list of receivers
            subject: `Activation for ${toName}`, // Subject line
            html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http - equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Email Verification
    </title>
    <style>
        @font-face {
            font-family: "Metropolis";
            src: url("../assets/font/Metropolis-Regular.otf") format("truetype");
        }
        
        @font-face {
            font-family: "Metropolis";
            src: url("../assets/font/Metropolis-Bold.otf") format("truetype");
        }
        
        @font-face {
            font-family: "Metropolis";
            src: url("../assets/font/Metropolis-Medium.otf") format("truetype");
        }
        
        body {
            margin: 0;
            font-family: "Metropolis";
            background-color: white;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .container {
            width: 90%;
            margin: 15px auto;
            padding: 15px;
            border: 1px solid grey;
            border-radius: 15px;
        }
        
        .blanja {
            text-align: center;
            color: #db3d23;
            font-weight: 700;
            font-size: 24 px;
            margin-left: 10 px;
        }
    </style>
</head>

<body>
    <div class=container>
        <h1 class=blanja> Blanja
        </h1>
        <h2> Dear ${toName}
        </h2>
        <h1> One Step Closer To Be Part of Blanja Fashion Culture!
        </h1>
        <h2> just <a href=${process.env.BASE_URL}/activation/${token}> Click Here! </a>for activating your account</h2>
    </div>
</body>

</html>`, // html body
        })
        .then(() => {
            helpers.response(res, "Success send email data", toEmail, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found id product", null, 404);
        });
};

module.exports = {
    sendEmail,
};
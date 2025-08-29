const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'petspaw0516@gmail.com', 
        pass: 'opom wmdx yhis azgv' 
    }
});


let mailOptions = {
    from: '"Pets paw" petspaw0516@gmail.com',
    to: 'pdaravind05@gmail.com', 
    subject: 'Hello ✔', 
    text: 'Hello world', 
    html: '<b>Hello world?</b>' 
};


transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// إعداد Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // يمكنك استخدام خدمات أخرى مثل SendGrid
    auth: {
        user: 'your_email@gmail.com', // ضع بريدك الإلكتروني هنا
        pass: 'your_password', // ضع كلمة مرور التطبيق (App Password)
    },
});

// Endpoint لإرسال رمز التحقق
app.post('/send-code', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${verificationCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error sending email' });
        }

        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Verification code sent', code: verificationCode });
    });
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
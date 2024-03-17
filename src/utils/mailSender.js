import nodemailer from 'nodemailer';


const mailSender = async (email, title , body) => {
    try {
        let transporter = nodemailer.createTransport({
            // user ethereal here for testing
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: "www.campuschat.com - Campus Chat",
            to: email,
            subject: title,
            html: body,
        });

        return info;

    } catch (error) {
        console.error("Error sending email", error);
    }
}

export { mailSender }
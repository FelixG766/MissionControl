import nodeMailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars";
import { fileURLToPath } from "node:url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (
    subject,
    send_to,
    send_from,
    reply_to,
    template,
    name,
    url
) => {
    const transporter = nodeMailer.createTransport({
        service: "Outlook365",
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        },
        tls: {
            ciphers: "SSLv3"
        }
    });

    const handlebarsOptions = {
        viewEngine: {
            extName: ".hbs",
            partialsDir: path.resolve(__dirname, "../../views"),
            defaultLayout: false,
        },
        viewPath: path.resolve(__dirname, "../../views"),
        extName: ".hbs",
    };

    transporter.use("compile", hbs(handlebarsOptions));

    const mailOptions = {
        from: send_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        template: template,
        context: {
            name: name,
            link: url,
        }
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.log("Error sending email: ", error);
        throw error;
    }

};

export default sendEmail;
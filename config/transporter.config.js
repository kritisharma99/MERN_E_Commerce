import nodemailer from "nodemailer"
import config from "./index"

let transporter = nodemailer.createTransport({
    host: config.SMTP_Mail_Host,
    port: config.SMTP_Mail_Port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.SMTP_Mail_User, // generated ethereal user
      pass: config.SMTP_Mail_Password, // generated ethereal password
    },
});

export default transporter
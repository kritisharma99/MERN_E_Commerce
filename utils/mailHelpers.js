import config from "../config/index"
import transporter from "../config/transporter.config"

const mailHelper = async (options)=>{
    const message = {
        from: config.SMTP_Mail, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.text, // plain text body
        // html: "<b>Hello world?</b>", // html body
    }
    await transporter.sendMail(message)

}
export default mailHelper
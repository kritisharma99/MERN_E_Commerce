import dotenv from "dotenv"

dotenv.config()
const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    SMTP_Mail_Host : process.env.SMTP_Mail_Host,
    SMTP_Mail_Port : process.env.SMTP_Mail_Port,
    SMTP_Mail_User : process.env.SMTP_Mail_User,
    SMTP_Mail_Password : process.env.SMTP_Mail_Password,
    SMTP_Mail : process.env.SMTP_Mail
}
export default config
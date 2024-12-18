const {config} = require("dotenv");
config()
module.exports = {
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    ADMIN_URL: process.env.ADMIN_URL,
    SECRET: process.env.SECRET,
}
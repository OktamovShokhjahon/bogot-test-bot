// packages
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

module.exports = bot;

require("./message.js");
require("./query.js");

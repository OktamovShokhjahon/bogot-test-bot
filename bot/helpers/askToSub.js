const { channelUsernames } = require("../../utils/channels");
const bot = require("../bot");

function askToSub(user) {
  const userId = user.userId;
  const keyboard = [];

  channelUsernames.forEach((username) => {
    keyboard.push([
      {
        text: username,
        url: `https://t.me/${username.split("@")[1]}`,
      },
    ]);
  });

  keyboard.push([{ text: "✅ Obuna bo'ldim", callback_data: "subsribed" }]);

  bot.sendMessage(userId, "Kanallarga obuna bo'ling", {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
}

module.exports = askToSub;

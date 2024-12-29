const bot = require("../bot.js");
const User = require("../../models/User.js");
const Additional = require("../../models/Additional.js");
const { adminKeyboard } = require("../keyboard/adminKeyboard.js");

async function askPass(user) {
  const userId = user.userId;

  user.action = "enter_admin_pass";
  await User.findByIdAndUpdate(user._id, user, { new: true });

  bot.sendMessage(userId, "Parolni kiriting");
}

async function checkPass(user, pass) {
  const userId = user.userId;

  if (pass === "a@a@admina@a@") {
    user.action = "";
    await User.findByIdAndUpdate(user._id, user, { new: true });

    bot.sendMessage(userId, "Admin panelga hush kelibsiz.", {
      reply_markup: {
        inline_keyboard: adminKeyboard,
      },
    });
  }
}

async function usersCount(user) {
  const userId = user.userId;

  const usersCount = await User.countDocuments({});
  bot.sendMessage(userId, `Ro'yhatda ${usersCount} ta foydalanuvchi bo'ldi.`);
}

async function pauseOrContinue(user) {
  const userId = user.userId;

  const pause = await Additional.findOne({ type: "isRegisterOpen" });

  if (pause) {
    if (pause.value === "false") {
      pause.value = "true";
    } else {
      pause.value = "false";
    }
  } else {
    pause.value = "true";
  }

  await Additional.findByIdAndUpdate(pause._id, pause, { new: true });

  bot.sendMessage(
    userId,
    `✅ Ro'yhatdan o'tish ${pause.value === "true" ? "Ochildi" : "Yopildi"}`
  );
}

async function recieveAd(user) {
  const userId = user.userId;

  user.action = "enter_ad_message";
  await User.findByIdAndUpdate(user._id, user, { new: true });

  bot.sendMessage(userId, "Reklamani kiriting");
}

const sendAd = async (user, msg) => {
  const userId = user.userId;
  const users = await User.find();
  user.action = "";

  await User.findByIdAndUpdate(user._id, user, { new: true });

  let sent = 0;
  let unsent = 0;

  bot.sendMessage(userId, "Rekalama yuborilyapti.");

  users.forEach((user) => {
    const usersId = user.userId;

    try {
      if (msg.photo) {
        bot.sendPhoto(usersId, msg.photo[0].file_id, {
          caption: msg.caption ? msg.caption : "",
          reply_markup: {
            inline_keyboard: msg.reply_markup
              ? msg.reply_markup.inline_keyboard
              : [],
          },
        });
      } else if (msg.video) {
        bot.sendVideo(usersId, msg.video.file_id, {
          caption: msg.caption ? msg.caption : "",
          reply_markup: {
            inline_keyboard: msg.reply_markup
              ? msg.reply_markup.inline_keyboard
              : [],
          },
        });
      } else {
        bot.sendMessage(usersId, msg.text, {
          reply_markup: {
            inline_keyboard: msg.reply_markup
              ? msg.reply_markup.inline_keyboard
              : [],
          },
        });
      }

      sent += 1;
    } catch (err) {
      unsent += 1;
    }
  });

  bot.sendMessage(
    userId,
    `Reklama yuborish tugadi.\n\n✅ Yuborildi: <b>${sent}</b>\n❌ Yuborilmadi: <b>${unsent}</b>`,
    {
      parse_mode: "HTML",
    }
  );
};

module.exports = {
  askPass,
  checkPass,
  usersCount,
  pauseOrContinue,
  recieveAd,
  sendAd,
};

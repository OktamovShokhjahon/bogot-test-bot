const bot = require("../bot");

function start(user) {
  const userId = user.userId;

  const registerButton = [
    [
      {
        text: "Ro'yhatdan o'tish",
      },
    ],
  ];

  bot.sendMessage(
    userId,
    `👋 Assalomu aleykum hurmatli foydalanuvchi.\n\n✅ Siz <b>2025-yil 19-yanvar</b> kuni soat <b>10:00</b> da <b>Bog'ot tuman ixtisoslashtirilgan maktabida</b> <b>2-3-4-sinflar</b> kesimida matematika fanidan o'tkaziladigan <b>"Qiziqarli matematika"</b> olimpiadasiga ro'yhatdan o'tish telegram botiga tashrif buyurdingiz.\n\nRo'yhatdan o'tish uchun pastdagi "ro'yhatdan o'tish" tugmasini bosing.`,
    {
      reply_markup: {
        keyboard: registerButton,
        resize_keyboard: true,
      },
      parse_mode: "HTML",
    }
  );
}

module.exports = { start };

const adminKeyboard = [
  [
    {
      text: "Ro'yhatdan o'tishni to'xtatish/ishlatish",
      callback_data: "stop_continue_register",
    },
  ],
  [
    {
      text: "Foydalanuvchilar soni",
      callback_data: "users_count",
    },
  ],
  [
    {
      text: "Foydalanuvchilarga xabar jo'natish",
      callback_data: "send_ads",
    },
  ],
];

module.exports = { adminKeyboard };

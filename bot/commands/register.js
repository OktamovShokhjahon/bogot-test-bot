const Additional = require("../../models/Additional");
const User = require("../../models/User");
const bot = require("../bot");
const axios = require("axios");

async function registerMain(user) {
  const userId = user.userId;
  let isOpen = await Additional.findOne({ type: "isRegisterOpen" });

  if (!isOpen) {
    isOpen = false;
  } else {
    isOpen = isOpen.value;
  }

  if (isOpen === "true") {
    user.action = "enter_register_fullname";
    await User.findByIdAndUpdate(user._id, user, { new: true });

    bot.sendMessage(
      userId,
      "👤 O'quvchining familiya, ismi va sharifini kiriting\n\nNamuna: <i>Abdullayev Abdulla Abdulla o'g'li</i>",
      {
        parse_mode: "HTML",
      }
    );
  } else {
    bot.sendMessage(userId, "Ro'yhatdan o'tish vaqtincha yopilgan.");
  }
}

async function askSchool(user, fullname) {
  const userId = user.userId;

  user.action = `enter_school_${fullname}`;
  await User.findByIdAndUpdate(user._id, user, { new: true });

  bot.sendMessage(userId, "🏫 Maktabingizni kiriting\n\nNamuna: <i>7-son</i>", {
    parse_mode: "HTML",
  });
}

async function askGrade(user, fullname, school) {
  const userId = user.userId;

  user.action = `enter_grade_${fullname}_${school}`;
  await User.findByIdAndUpdate(user._id, user, { new: true });

  bot.sendMessage(userId, "🏛 Sinfingizni kiriting\n\nNamuna: <i>2-sinf</i>", {
    parse_mode: "HTML",
  });
}

async function askPhoneNumber(user, fullname, school, grade) {
  const userId = user.userId;

  // if (isNaN(grade)) {
  //   return bot.sendMessage(userId, "raqam kiriting");
  // }

  user.action = `enter_number_${fullname}_${school}_${grade}`;
  await User.findByIdAndUpdate(user._id, user, { new: true });

  bot.sendMessage(
    userId,
    "📞 Telefon raqamni kiriting.\n\nNamuna: <i>+998 XX XXX XX XX</i>",
    {
      parse_mode: "HTML",
    }
  );
}

async function rememberRules(user, fullname, school, grade, phoneNumber) {
  const userId = user.userId;

  user.action = `remember_rules_${fullname}_${school}_${grade}_${phoneNumber}`;
  await User.findByIdAndUpdate(user._id, user, { new: true });

  bot.sendMessage(
    userId,
    `📌 Qoidalar va talablar quyidagicha:\n\n✅ Qiziqarli olimpiada BOGOTTEST bilan hamkorlikda Bog'ot tuman ixtisoslashtirilgan maktabida <i>Prezident maktab</i> va <i>Ixtisoslashtirilgan maktablar</i>ga tayyorgarlik ko'rayotgan 2-3-4-sinf o'quvchilari o'rtasida o'tkaziladi.\n\n🕐 Olimpiada 2025-yil 19-yanvar kuni soat 10:00 da boshlanadi\n\n⚡️ Test savollari kitobi sinflar kesimida alohida bo'ladi. Jami 30 ta savol beriladi va barcha sinflardagi savollar 3 turdagi qiyinchilikda o'tkaziladi:\n1. Oson daraja (0.9 ball)\n2. O'rta daraja (1.5 ball)\n3. Qiyin daraja (2.6 ball)\n\n🏆 Olimpiadamizda har bir sinf bo'yicha eng yuqori ball to'plagan 3 ta o'rin egalari qimmatbaho so'vg'a va pul yutuqlari bilan taqdirlanadi.\n\n⚠️ Ro'yhatdan o'tish ohirgi muddati: 18-yanvar 23:59\n\n❗️ Olimpiadada ishtirok etish badal puli barcha sinflar uchun <b>25 000 so'm</b>ni tashkil qiladi. To'lov naqt ko'rinishda olimpiada kuni amalga oshiriladi.\n\nO'qib chiqib "qoidalarga roziman" tugamisini bosing`,
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "✅ Qoidalarga roziman",
            },
          ],
        ],
        resize_keyboard: true,
      },
      parse_mode: "HTML",
    }
  );
}

async function createApplication(user, fullname, school, grade, phoneNumber) {
  const userId = user.userId;

  const registerButton = [
    [
      {
        text: "Ro'yhatdan o'tish",
      },
    ],
  ];

  const newApplication = {
    fullname,
    userId,
    phoneNumber,
    school,
    grade,
  };

  const response = await axios.post(
    "https://bogot-test-backend.onrender.com/api/application/create",
    newApplication
  );

  if (response.data.ok) {
    bot.sendMessage(
      userId,
      "Tabriklaymiz siz muvaffaqiyatli ro'yhatdan o'tdingiz ✅",
      {
        reply_markup: {
          keyboard: registerButton,
          resize_keyboard: true,
        },
      }
    );
  } else {
    bot.sendMessage(userId, "Keyinroq urinib ko'ring");
  }

  user.action = "";
  await User.findByIdAndUpdate(user._id, user, { new: true });
}

module.exports = {
  registerMain,
  askSchool,
  askGrade,
  askPhoneNumber,
  createApplication,
  rememberRules,
};

const bot = require("./bot");
const { askPass, checkPass, sendAd } = require("./commands/admin");
const {
  registerMain,
  askSchool,
  askGrade,
  askPhoneNumber,
  createApplication,
  rememberRules,
} = require("./commands/register");
const { start } = require("./commands/start");
const askToSub = require("./helpers/askToSub");
const isUserSubscribed = require("./helpers/isUserSubscribed");
const userExist = require("./helpers/userExist");

bot.on("message", async (msg) => {
  const text = msg.text;
  const userId = msg.from.id;

  const user = await userExist(userId);
  const isSub = await isUserSubscribed(user);

  const action = user.action;

  if (!isSub) {
    return askToSub(user);
  }

  if (text === "/start") {
    start(user);
  } else if (text === "/admin") {
    askPass(user);
  } else if (text === "Ro'yhatdan o'tish") {
    registerMain(user);
  } else if (action === "enter_register_fullname") {
    askSchool(user, text);
  } else if (action.includes("enter_school_")) {
    askGrade(user, action.split("_")[2], text);
  } else if (action.includes("enter_grade_")) {
    askPhoneNumber(user, action.split("_")[2], action.split("_")[3], text);
  } else if (action.includes("enter_number_")) {
    const fullname = action.split("_")[2];
    const school = action.split("_")[3];
    const grade = action.split("_")[4];

    rememberRules(user, fullname, school, grade, text);
  } else if (action === "enter_admin_pass") {
    checkPass(user, text);
  } else if (action === "enter_ad_message") {
    sendAd(user, msg);
  } else if (action.includes("remember_rules_")) {
    if (text === "✅ Qoidalarga roziman") {
      const fullname = action.split("_")[2];
      const school = action.split("_")[3];
      const grade = action.split("_")[4];
      const phoneNumber = action.split("_")[5];

      createApplication(user, fullname, school, grade, phoneNumber);
    }
  }
});

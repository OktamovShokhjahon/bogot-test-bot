const bot = require("./bot.js");
const {
  usersCount,
  pauseOrContinue,
  recieveAd,
} = require("./commands/admin.js");
const { createApplication } = require("./commands/register.js");
const { start } = require("./commands/start.js");
const askToSub = require("./helpers/askToSub.js");
const isUserSubscribed = require("./helpers/isUserSubscribed.js");
const userExist = require("./helpers/userExist.js");

bot.on("callback_query", async (query) => {
  const data = query.data;
  const userId = query.from.id;

  const user = await userExist(userId);

  if (data === "subsribed") {
    const isSubscribed = await isUserSubscribed(user);

    if (!isSubscribed) {
      return askToSub(user);
    }

    start(user);
  } else if (data === "users_count") {
    usersCount(user);
  } else if (data === "stop_continue_register") {
    pauseOrContinue(user);
  } else if (data === "send_ads") {
    recieveAd(user);
  }
});

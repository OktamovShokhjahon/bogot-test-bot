const { channelUsernames } = require("../../utils/channels.js");
const bot = require("../bot.js");

async function isUserSubscribed(user) {
  const userId = user.userId;

  try {
    const subscriptionResults = await Promise.all(
      channelUsernames.map(async (channel) => {
        return await bot.getChatMember(channel, userId);
      })
    );

    const isSubscribedToAll = subscriptionResults.every((member) =>
      ["member", "administrator", "creator"].includes(member.status)
    );

    return isSubscribedToAll;
  } catch (error) {
    console.log("Error checking subscriptions:", error);
    return false;
  }
}

module.exports = isUserSubscribed;

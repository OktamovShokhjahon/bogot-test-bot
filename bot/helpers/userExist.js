const User = require("../../models/User.js");

async function userExist(userId) {
  const user = await User.findOne({ userId });

  if (user) {
    return user;
  }

  const newUser = new User({ userId });

  const savedUser = await newUser.save();
  return savedUser;
}

module.exports = userExist;

// packages
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// app
const app = express();

// config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// start
function start() {
  try {
    const PORT = process.env.PORT || 5000;
    const MONGO_URI = process.env.MONGO_URI;

    app.listen(PORT, () =>
      console.log(`App has been started at http://localhost:${PORT}`)
    );
    mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
}

start();

require("./bot/bot.js");

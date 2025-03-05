
const mongoose = require("mongoose");
require("dotenv").config();

const MongoUri = process.env.MONGODB;

const initializeDB = () => {
  mongoose
    .connect(MongoUri)
    .then(() => {
      console.log("Connected to MongoDB successfully.");
    })
    .catch((error) => {
      console.log("Error connecting to database.");
    });
};

module.exports = { initializeDB };

const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
// const Routs = require("./api/routes/Router");
const app = express();
app.use(express.json());
app.use(cors());
// app.use("/", Routs);

const mongooseLink =
  "mongodb+srv://malekkbh:123456780@cluster0.arfg9nu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongooseLink);

mongoose.connection.on("connected", () => {
  console.log("mongo connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

/**
 * statuses:
 * 200 succsess
 * 500 general error
 * 404 not Found
 */

app.get("/fullName", (req, res) => {
  res.status(200).json({
    fullName: "Malek Kabaha",
  });
});

app.post("/whatsMyName", (req, res) => {
  const { firstName, lastName } = req.body;
  /**
   * extract proprties firsName lastName from req.body
   * body : contans data from the clint
   */

  if (!firstName || !lastName) {
    res.status(305).json({
      error: true,
      errorMessage: "first name and last name are MUST!",
    });

    return;
  }

  res.status(200).json({
    fullName: firstName + " " + lastName,
  });
});

module.exports = app;

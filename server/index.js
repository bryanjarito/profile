const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const User = require("./models/user.model");

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", userRoute);

mongoose
  .connect(
    "mongodb+srv://admin:admin@profiledb.17oldps.mongodb.net/profiledb?retryWrites=true&w=majority&appName=ProfileDB"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("connected");
    });
  })
  .catch(() => {
    console.log("error");
  });

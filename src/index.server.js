const express = require("express");
const path = require("path");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routes
const authRoutes = require("./routes/auth");
env.config();

// mongodb Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@clothingbranddb.crpccgp.mongodb.net/`
  )
  .then(() => {
    console.log("Database is connected");
  });

app.use(express.json());
app.use("/api", authRoutes);

app.get("/Home", function (req, res) {
  console.log("Rendering Home page");
  res.render("Home");
});

// 404 handler - should be at the end
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//New SMJo
// app.get("/Home", function (req, res) {
//   console.log("Rendering Home page");
//   res.render("Home");
// });
app.get("/login", function (req, res) {
  console.log("Rendering Login page");
  res.render("Login");
});

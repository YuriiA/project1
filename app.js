require("dotenv").config();

const express = require("express");

const router = require("./routes/Router");
const mongoose = require("mongoose");
const Article = require("./models/article");
const method = require("method-override");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(method("_method"));

app.use("/articles", router);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" }).limit(3);
  res.render("index", { articles: articles });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected"))
    .catch((error) => console.error("DB connection error!", error));
});

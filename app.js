require("dotenv").config();

const express = require("express");

const router = require("./routes/Router");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const schema = new mongoose.Schema({ name: "string", size: "string" });
const Tank = mongoose.model("Tank", schema);

//routes

app.use("/", router);

//server config

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected"))
    .catch((error) => console.error("DB connection error!", error));
});

//sT3BMC3FC9JsHhKL

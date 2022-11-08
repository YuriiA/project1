const express = require("express");
const router = express.Router();
const Article = require("./../models/article");

router.get("/newPost", (req, res) => {
  res.render("newPost", { article: new Article() });
});
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect("/");
  res.render("show", { article: article });
});

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    console.log(error);
    res.render("newPost", { article: article });
  }
});

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  const data = await Article.findById(req.params.id);
  res.render("edit", { article: data });
});

router.put("/:id", async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
  });
  res.redirect("/");
});

router.get("/asia", (req, res) => {
  res.render("asia");
});
router.get("/europe", (req, res) => {
  res.render("europe");
});
router.get("/africa", (req, res) => {
  res.render("africa");
});
router.get("/america", (req, res) => {
  res.render("america");
});

module.exports = router;

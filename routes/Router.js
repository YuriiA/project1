const express = require("express");
const router = express.Router();
const Article = require("./../models/article");

router.use(express.static("public"));

router.get("/asia", async (req, res) => {
  const articles = await Article.find({ region: "Asia" });

  res.render("asia", { articles: articles });
});

router.get("/europe", async (req, res) => {
  const articles = await Article.find({ region: "Europe" });
  res.render("europe", { articles: articles });
});
router.get("/africa", async (req, res) => {
  const articles = await Article.find({ region: "Africa" });
  res.render("africa", { articles: articles });
});
router.get("/america", async (req, res) => {
  const articles = await Article.find({ region: "The Americas" });
  res.render("america", { articles: articles });
});

router.get("/all", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("allPosts", { articles: articles });
});

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
    region: req.body.region,
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
    region: req.body.region,
    description: req.body.description,
    img: req.body.img,
  });
  res.redirect("/");
});

module.exports = router;

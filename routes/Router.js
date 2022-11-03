const express = require("express");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.render("index");
});
// define the about route
router.get("/about", (req, res) => {
  res.render("about");
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

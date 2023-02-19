const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/", require("./login.route"));
router.use("/", require("./signup.route"));

module.exports = router;

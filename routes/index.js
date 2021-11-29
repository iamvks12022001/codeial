const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("loaded");
router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts")); //for every post related command it go to posts route

router.use("/comments", require("./comments"));
module.exports = router;

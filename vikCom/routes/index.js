const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("loaded");
router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts")); //for every post related command it go to posts route

//router for api
// router.use("/api", require("./api"));

router.use("/comments", require("./comments"));

//route for like
router.use("/likes", require("./likes"));

module.exports = router;

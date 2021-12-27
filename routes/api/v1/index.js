//routes of all things in version 1 of api
//ex.. api/v1/post,  api/v1/comments etc

const express = require("express");
const router = express.Router();

router.use("/posts", require("./posts"));
router.use("/users", require("./users"));
module.exports = router;

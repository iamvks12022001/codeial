const express = require("express");
const router = express.Router();
//route for  all the version of api ex v1,v2,v3

router.use("/v1", require("./v1"));

module.exports = router;

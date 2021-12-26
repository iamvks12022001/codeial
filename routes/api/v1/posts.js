const express = require("express");
const router = express.Router();

const postsApi = require("../../../controllers/api/v1/posts_api");

router.get("/", postsApi.index);

router.delete("/:id", postsApi.destroy); //if post id is passed then delete  that post(localhost:8000/api/v2/posts/456666)
module.exports = router;

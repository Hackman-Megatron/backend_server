const { Router } = require("express");
const { commentIt, getComments } = require("../controllers/postsController");
const router = Router();

router.post("/post-comment", commentIt);
router.post("/get-comment", getComments);

module.exports = router;    
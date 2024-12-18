const { Router } = require("express");
const { getAllEvents, postEvents } = require("../controllers/enventsController");

const router = Router();


router.get("/get-events", getAllEvents);
router.post("/post-events", postEvents);


module.exports = router;
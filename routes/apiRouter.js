const { Router } = require("express");
const Replies = require("../classes/Replies.js");

const router = Router();

router.get("/replies", (req, res) => {
    return res.json(Replies.replies)
});

module.exports = router;

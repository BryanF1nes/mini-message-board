const { Router } = require("express");
const Replies = require("../classes/Replies.js");

const router = Router();

router.get("/replies", async (req, res) => {
    const replies = await Replies.replies();

    return res.json(replies)
});

module.exports = router;

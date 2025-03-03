const { Router } = require("express");
const messageRouter = Router();

const messageController = require("../controllers/messageController.js");

messageRouter.get("/", messageController);

messageRouter.get("/new", messageController);

messageRouter.post("/new", messageController)

// Get with user (either name or ID) in params
// messageRouter.get("/")

module.exports = messageRouter;
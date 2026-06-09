const { Router } = require("express");
const messageController = require("../controllers/messageController.js");

const messageRouter = Router();

messageRouter.get("/", messageController.getMessages);
messageRouter.get("/:messageId", messageController.getMessageById);

module.exports = messageRouter;

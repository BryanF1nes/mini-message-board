const { Router } = require("express");
const messageController = require("../controllers/messageController.js");

const messageRouter = Router();

messageRouter.get("/", messageController.getMessageView);
messageRouter.get("/:messageId", messageController.getMessageById);
messageRouter.get("/edit/:messageId", messageController.editMessageById);

module.exports = messageRouter;

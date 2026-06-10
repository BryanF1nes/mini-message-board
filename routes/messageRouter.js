const { Router } = require("express");
const messageController = require("../controllers/messageController.js");

const messageRouter = Router();

messageRouter.get("/", messageController.getMessageView);
messageRouter.post("/new", messageController.postMessage);
messageRouter.get("/:messageId", messageController.getMessageById);
messageRouter.get("/edit/:messageId", messageController.editMessageById);
messageRouter.post("/edit/:messageId", messageController.updateMessageById);

module.exports = messageRouter;

const { Router } = require("express");
const messageController = require("../controllers/messageController.js");

const messageRouter = Router();

messageRouter.get("/", messageController.getMessageView);
messageRouter.post("/create", messageController.postMessage);

messageRouter.get("/search", messageController.getMessageByUser);
messageRouter.get("/:messageId", messageController.getMessageById);
messageRouter.get("/:messageId/edit", messageController.getEditMessageById);
messageRouter.post("/:messageId/edit", messageController.editMessageById);
messageRouter.post("/:messageId/delete", messageController.deleteMessageById);

messageRouter.post("/:messageId/replies/create", messageController.postReplyMessage)

module.exports = messageRouter;

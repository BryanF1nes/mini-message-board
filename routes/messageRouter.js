const { Router } = require("express");
const messageController = require("../controllers/messageController.js");

const messageRouter = Router();

messageRouter.get("/", messageController.getMessageView);
messageRouter.post("/create", messageController.postMessage);

messageRouter.get("/search", messageController.getMessageByUser);
messageRouter.get("/:messageId", messageController.getMessageById);
messageRouter.post("/:messageId/delete", messageController.deleteMessageById);

module.exports = messageRouter;

const { Router } = require("express");
const messageController = require("../controllers/messageController.js");

const messageRouter = Router();

messageRouter.get("/", messageController.getMessageView);
messageRouter.post("/create", messageController.postMessage);

messageRouter.get("/search", messageController.getMessageByUser);
messageRouter.get("/:messageId", messageController.getMessageById);

module.exports = messageRouter;

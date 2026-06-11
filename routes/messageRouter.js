const { Router } = require("express");
const messageController = require("../controllers/messageController.js");

const messageRouter = Router();

messageRouter.get("/", messageController.getMessageView);
messageRouter.post("/create", messageController.postMessage);

messageRouter.get("/search", messageController.getMessageByUser);
messageRouter.get("/edit/:messageId", messageController.editMessageById);
messageRouter.post("/edit/:messageId", messageController.updateMessageById);


messageRouter.get("/:messageId", messageController.getMessageById);

module.exports = messageRouter;

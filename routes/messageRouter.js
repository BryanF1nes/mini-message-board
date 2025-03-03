const { Router } = require("express");
const messageRouter = Router();

const { getAllMessages, getMessageForm, postMessage, getMessageById } = require("../controllers/messageController.js");

messageRouter.get("/", getAllMessages);

messageRouter.get("/new", getMessageForm);

messageRouter.post("/new", postMessage)

messageRouter.get("/:messageId", getMessageById)

module.exports = messageRouter;
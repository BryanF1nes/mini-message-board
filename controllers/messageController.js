const db = require("../db.js");
const links = [
    { href: "/", text: "Home" },
    { href: "/messages", text: "Messages" },
];

async function getMessages(req, res) {
    const messages = await db.getMessages();

    if (!messages) {
        res.status(404).send("Messages could not be loaded at this time.");
        return;
    }

    return res.render("messages", { links: links, messages: messages });
};

async function getMessageById(req, res) {
    const { messageId } = req.params;

    const message = await db.getMessageByID(messageId);
    console.log(message);

    return res.render("message", { links: links, message: message });
}

module.exports = { getMessages, getMessageById }

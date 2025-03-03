const { messages, messageById } = require("../db.js");

function getAllMessages(req, res) {
    return res.render("messages", { title: "Mini-Message Board", messages: messages })
};

function getMessageForm(req, res) {
    if (req.url === "/new") {
        return res.render("new", { title: "Add A Message" })
    }
    return res.send("Unable to find the forum");
};

async function getMessageById(req, res) {
    const { messageId } = req.params;

    const message = await messageById(Number(messageId));

    if (!message) {
        res.status(404).send("No message could be found");
        return;
    }

    return res.render("message", { message: message });
}

function postMessage(req, res) {
    if (req.method === "POST") {
        let messageId = messages.length + 1;
        messages.push({ id: messageId, text: req.body.text, user: req.body.user, added: new Date() });
        return res.redirect("/messages");
    }
    return res.send("Unable to make post request");
};





module.exports = { postMessage, getAllMessages, getMessageForm, getMessageById };
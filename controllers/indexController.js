const db = require("../db.js");


async function getMessages(req, res) {
    const messages = await db.getMessages();

    if (!messages) {
        res.status(404).send("Messages could not be loaded at this time.");
        return;
    }

    return messages;
};

async function getIndex(req, res) {
    const links = [
        { href: "/", text: "Home" },
        { href: "/messages", text: "Messages" },
    ];

    const messages = await getMessages();

    return res.render("index", { links: links, messages: messages });
}

module.exports = { getMessages, getIndex };

const db = require("../db.js");

const links = [
    { href: "/", text: "Home" },
    { href: "/messages", text: "Messages" },
]

async function getIndex(req, res) {
    const messages = await db.getMessages();

    return res.render("index", { links: links, messages: messages });
}

module.exports = { getIndex, links };

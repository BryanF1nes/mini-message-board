const db = require("../db/queries");
const links = [
    { href: "/", text: "Home" },
    { href: "/messages", text: "Messages" },
]

async function getIndex(req, res) {
    const changes = await db.getChangelogs();

    return res.render("index", { links: links, changes: changes });
}

module.exports = { getIndex, links };

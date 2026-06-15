const db = require("../db/queries");

function links(req, res) {
    if (req.user) {
        return [
            { href: "/", text: "Home" },
            { href: "/messages", text: "Messages" },
            { href: "/log-out", text: "Log out" },
        ]
    } else {
        return [
            { href: "/", text: "Home" },
            { href: "/messages", text: "Messages" },
            { href: "/sign-up", text: "Sign up" },
            { href: "/log-in", text: "Log in" },
        ]
    }
}

async function getIndex(req, res) {
    const changes = await db.getChangelogs();

    return res.render("base-template", { links: links(req), changes: changes, content: "index", title: "Home" });
}

module.exports = { getIndex, links };

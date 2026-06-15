const db = require("../db/queries");

function links(req, res) {
    const links = [
        { href: "/", text: "Home" },
        { href: "/messages", text: "Messages" },
    ];

    if (req.user) {
        if (req.user && req.user.role === 'admin') {
            links.push(
                { href: "/admin", text: "Admin" },
                { href: "/log-out", text: "Log out" },
            );

            return links;
        }

        links.push({ href: "/log-out", text: "Log out" });
        return links;
    } else {
        links.push(
            { href: "/sign-up", text: "Sign up" },
            { href: "/log-in", text: "Log in" }
        );

        return links;
    }
}

async function getIndex(req, res) {
    const changes = await db.getChangelogs();

    return res.render("base-template", { links: links(req), changes: changes, content: "index", title: "Home" });
}

module.exports = { getIndex, links };

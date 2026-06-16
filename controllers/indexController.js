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
    try {
        const changes = await db.getChangelogs();
        return res.render("base-template", {
            title: "Home",
            content: "index",
            links: links(req),
            changes: changes
        });
    } catch (error) {
        throw new Error(`Could not get changelogs: ${error.message}`);
    }
}

module.exports = { getIndex, links };

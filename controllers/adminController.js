const { createChangelogItemArray } = require("../services/changeItemService")
const { links } = require("./indexController");
const db = require("../db/queries");

async function getAdminPanel(req, res) {
    if (!req.user) {
        return res.redirect("/");
    }

    if (req.user.role !== "admin") {
        return res.redirect("/");
    }

    const users = await db.getAllUsers();

    return res.render("base-template", { content: "admin/admin", title: "Admin Panel", links: links(req), users: users });
}

async function postChangelog(req, res) {
    if (req.user.role !== 'admin') {
        return res.status(400).render("base-template", {
            title: "Home",
            content: "Home",
            links: links(req),
        });
    }

    const { description, changes } = req.body;
    const changeItems = createChangelogItemArray(changes);

    await db.postChangelog(description, changeItems);

    return res.redirect("/");
}


module.exports = {
    getAdminPanel,
    postChangelog
};

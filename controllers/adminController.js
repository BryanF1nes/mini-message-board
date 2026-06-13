const { createChangelogItemArray } = require("../services/changeItemService")
const { links } = require("./indexController");
const db = require("../db/queries");

function getChangelog(req, res) {
    return res.render("admin/admin", { links: links });
}

async function postChangelog(req, res) {
    const { description, changes, password } = req.body;
    const changeItems = createChangelogItemArray(changes);

    if (password !== process.env.ADMIN_PASSWORD) {
        res.redirect("admin/admin");
    }

    await db.postChangelog(description, changeItems);

    return res.redirect("/");
}

module.exports = {
    getChangelog,
    postChangelog
};

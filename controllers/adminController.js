const { changelogArray } = require("../services/changelogService");
const { links } = require("./indexController");
const db = require("../db/queries");

async function getAdminPanel(req, res) {
    if (req.user && req.user.role === 'admin') {
        try {
            const users = await db.getAllUsers();
            return res.render("base-template", {
                title: "Admin Panel",
                content: "admin/admin",
                links: links(req),
                users: users
            });
        } catch (error) {
            throw new Error(`Could not get user information: ${error.message}`);
        }
    }

    return res.redirect("/");
}

async function postChangelog(req, res) {
    const { description, changes } = req.body;
    const changelogItems = changelogArray(changes);

    try {
        await db.postChangelog(description, changelogItems);
        return res.redirect("/");
    } catch (error) {
        next(error);
    }
}

async function postUpdateRole(req, res, next) {
    const { id } = req.params;
    const { role } = req.body;

    try {
        await db.postUpdateRole(id, role);
        return res.redirect("/admin");
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAdminPanel,
    postChangelog,
    postUpdateRole
};

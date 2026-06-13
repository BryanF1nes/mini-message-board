const { createChangelogItemArray } = require("../services/changeItemService")
const { body, validationResult, matchedData } = require("express-validator");
const { links } = require("./indexController");
const db = require("../db/queries");

const validateAdmin = [
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required.")
        .custom((value) => {
            if (value !== process.env.ADMIN_PASSWORD) {
                throw new Error("The password is incorrect.");
            }

            return true;
        }),
];

function getChangelog(req, res) {
    return res.render("admin/admin", { links: links });
}

const postChangelog = [
    validateAdmin,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("admin/admin", {
                links: links,
                errors: errors.array(),
            });
        }

        const { description, changes } = req.body;
        const changeItems = createChangelogItemArray(changes);

        await db.postChangelog(description, changeItems);

        return res.redirect("/");
    }
]


module.exports = {
    getChangelog,
    postChangelog
};

const { body, validationResult, matchedData } = require("express-validator");
const { links } = require("./indexController");
const db = require("../db/queries");

const lengthErr = "Must be between 1 and 10 characters.";

const validateUser = [
    body("username")
        .trim()
        .isLength({ min: 1, max: 10 })
        .withMessage(lengthErr),
    body("message")
        .trim()
        .notEmpty()
        .withMessage("You have to say something"),
];

async function getMessageView(req, res) {
    const messages = await db.getAllMessages()

    if (!messages) {
        res.status(404).send("Messages could not be loaded at this time.");
        return;
    }

    return res.render("messages", { links: links, messages: messages });
};

async function getMessageById(req, res) {
    const { messageId } = req.params;

    const message = await db.getMessageById(messageId);

    return res.render("message", { links: links, message: message });
}

async function getMessageByUser(req, res) {
    const { username } = req.query;

    if (username.toLowerCase() === "") {
        return res.redirect("/messages");
    }

    const messages = await db.getMessageByUser(username.toLowerCase());

    return res.render("messages", { links: links, messages: messages });
}

const postMessage = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = await db.getAllMessages();

            return res.status(400).render("messages", {
                links: links,
                messages: messages,
                errors: errors.array(),
            });
        }

        const { username, message } = matchedData(req);
        await db.postMessage(username, message);

        return res.redirect("/messages");
    }
];


module.exports = { getMessageView, getMessageById, postMessage, getMessageByUser }

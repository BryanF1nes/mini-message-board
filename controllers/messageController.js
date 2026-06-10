const { body, validationResult, matchedData } = require("express-validator");
const { links } = require("./indexController");
const db = require("../db.js");

const alphaErr = "User must only contain alphabet letters.";
const lengthErr = "Must be between 1 and 10 characters.";

const validateUser = [
    body("user")
        .trim()
        .isLength({ min: 1, max: 10 })
        .withMessage(lengthErr)
        .isAlpha()
        .withMessage(alphaErr),
    body("text")
        .trim()
        .notEmpty()
        .withMessage("You have to say something"),
];

async function getMessageView(req, res) {
    const messages = await db.getMessages();

    if (!messages) {
        res.status(404).send("Messages could not be loaded at this time.");
        return;
    }

    return res.render("messages", { links: links, messages: messages });
};

async function getMessageById(req, res) {
    const { messageId } = req.params;

    const message = await db.getMessageByID(messageId);

    return res.render("message", { links: links, message: message });
}

async function editMessageById(req, res) {
    const { messageId } = req.params;

    const message = await db.getMessageByID(messageId);

    return res.render("editMessage", { links: links, message: message });
}

const postMessage = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = await db.getMessages();

            return res.status(400).render("messages", {
                links: links,
                messages: messages,
                errors: errors.array(),
            });
        }

        const { user, text } = matchedData(req);
        const message = {
            id: crypto.randomUUID(),
            user: user,
            text: text,
            added: new Date(),
        }

        await db.postMessage(message);
        console.log(await db.getMessages());

        return res.redirect("/messages");
    }
];


module.exports = { getMessageView, getMessageById, editMessageById, postMessage }

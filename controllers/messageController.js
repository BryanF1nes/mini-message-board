const { body, validationResult, matchedData } = require("express-validator");
const { links } = require("./indexController");
const db = require("../db/queries");

const validateMessage = [
    body("message")
        .trim()
        .notEmpty()
        .withMessage("You have to say something"),
];

async function getMessageView(req, res) {
    const messages = await db.getAllMessages()
    console.log(messages);

    if (!messages) {
        res.status(404).send("Messages could not be loaded at this time.");
        return;
    }

    return res.render("base-template", { title: "Messages", content: "messages", links: links(req), messages: messages });
};

async function getMessageById(req, res) {
    const { messageId } = req.params;

    const message = await db.getMessageById(messageId);

    return res.render("message", { links: links(req), message: message });
}

async function getMessageByUser(req, res) {
    const { username } = req.query;

    if (username.toLowerCase() === "") {
        return res.redirect("/messages");
    }

    const messages = await db.getMessageByUser(username.toLowerCase());

    return res.render("messages", { links: links(req), messages: messages });
}

const postMessage = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = await db.getAllMessages();

            return res.status(400).render("messages", {
                links: links(req),
                messages: messages,
                errors: errors.array(),
            });
        }

        const { message } = matchedData(req);
        const userId = req.user.id;

        await db.postMessage(userId, message);

        return res.redirect("/messages");
    }
];


module.exports = { getMessageView, getMessageById, postMessage, getMessageByUser }

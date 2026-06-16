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
    try {
        const messages = await db.getAllMessages()
        if (!messages) {
            res.status(404).send("Messages could not be loaded at this time.");
            return;
        }

        return res.render("base-template", {
            title: "Messages",
            content: "messages",
            links: links(req),
            messages: messages
        });
    } catch (error) {
        throw new Error(`Could not grab messages: ${error.messages}`)
    }
};

async function getMessageById(req, res) {
    const { messageId } = req.params;
    try {
        const message = await db.getMessageById(messageId);

        return res.render("base-template", {
            title: `Message by ${message.username}`,
            content: "message",
            links: links(req),
            message: message
        });
    } catch (error) {
        throw new Error(`That message may not exist: ${error.message}`)
    }
}

async function getMessageByUser(req, res) {
    const { username } = req.query;
    if (username.toLowerCase() === "") {
        return res.redirect("/messages");
    }

    try {
        const messages = await db.getMessageByUser(username.toLowerCase());

        return res.render("base-template", {
            title: `${username} messages`,
            content: "messages",
            links: links(req),
            messages: messages
        });
    } catch (error) {
        throw new Error(`Could not get that message: ${error.message}`)
    }
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

const { body, validationResult, matchedData } = require("express-validator");
const { links } = require("./indexController");
const { Message } = require("../models/Message");
const Database = require("../db");

const lengthErr = "Must be between 1 and 10 characters.";

const validateUser = [
    body("user")
        .trim()
        .isLength({ min: 1, max: 10 })
        .withMessage(lengthErr),
    body("text")
        .trim()
        .notEmpty()
        .withMessage("You have to say something"),
];

function getMessageView(req, res) {
    const messages = Database.getMessages();
    console.log(messages);

    if (!messages) {
        res.status(404).send("Messages could not be loaded at this time.");
        return;
    }

    return res.render("messages", { links: links, messages: messages });
};

function getMessageById(req, res) {
    const { messageId } = req.params;

    const message = Database.getMessageByID(messageId);

    return res.render("message", { links: links, message: message });
}

function editMessageById(req, res) {
    const { messageId } = req.params;

    const message = Database.getMessageByID(messageId);

    return res.render("editMessage", { links: links, message: message });
}

const updateMessageById = [
    validateUser,
    async (req, res) => {
        const { messageId } = req.params;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const message = Database.getMessageByID(messageId);
            return res.status(400).render("editMessage", {
                links: links,
                message: message,
                errors: errors.array(),
            })
        }

        const { user, text } = matchedData(req);
        Database.updateMessageByID(messageId, {
            user: user,
            text: text,
        })

        return res.redirect("/messages");
    }
];

const postMessage = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = Database.getMessages();

            return res.status(400).render("messages", {
                links: links,
                messages: messages,
                errors: errors.array(),
            });
        }

        const { user, text } = matchedData(req);
        const message = new Message(user, text);

        Database.postMessage(message);
        console.log(Database.getMessages());

        return res.redirect("/messages");
    }
];


module.exports = { getMessageView, getMessageById, editMessageById, postMessage, updateMessageById }

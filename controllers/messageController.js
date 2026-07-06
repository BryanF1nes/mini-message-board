const { body, validationResult, matchedData } = require("express-validator");
const { links } = require("./indexController");
const Message = require("../classes/Message.js");
const Replies = require("../classes/Replies.js");
const db = require("../db/queries");

const validateMessage = [
    body("message")
        .trim()
        .notEmpty()
        .withMessage("You have to say something"),
    body("locked")
        .optional()
        .toBoolean()
];

async function getMessageView(req, res, next) {
    try {
        const messages = await Message.messages();
        if (!messages) {
            res.status(404).send("Messages could not be loaded at this time.");
            return;
        }
        console.log(messages);

        return res.render("base-template", {
            title: "Messages",
            content: "messages",
            links: links(req),
            messages: messages,
        });
    } catch (error) {
        next(error);
    }
};

async function getMessageById(req, res) {
    const { messageId } = req.params;
    try {
        const message = await Message.messagesByMessageID(messageId);
        const replies = await Replies.repliesByMessageID(messageId);

        return res.render("base-template", {
            title: `Message by ${message.username}`,
            content: "message",
            links: links(req),
            message: message,
            replies: replies,
        });
    } catch (error) {
        next(error)
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
        next(error);
    }
}

async function getEditMessageById(req, res) {
    const { messageId } = req.params;
    try {
        const message = await db.getMessageById(messageId);

        return res.render("base-template", {
            title: `Edit ${message.username}`,
            content: "editMessage",
            links: links(req),
            message: message
        });
    } catch (error) {
        next(error)
    }
}

const postMessage = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = await db.getAllMessages();

            return res.status(400).render("base-template", {
                title: "Messages",
                content: "messages",
                links: links(req),
                messages: messages,
                errors: errors.array(),
            });
        }

        const data = matchedData(req);
        const userId = req.user.id;
        const can_reply = data.locked ?? false;

        await Message.postMessage(userId, { body: data.message, can_reply })

        return res.redirect("/messages");
    }
];

async function postReplyMessage(req, res) {
    const userId = req.user.id;
    const { message } = req.body;
    const { messageId } = req.params;

    await Replies.postReply(userId, message, messageId);

    return res.redirect(`/messages/${messageId}`);
}

const editMessageById = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("base-template", {
                title: `Edit ${message.username}`,
                content: "editMessage",
                links: links(req),
                errors: errors.array(),
            });
        }

        const { message } = matchedData(req);
        const { messageId } = req.params;

        await db.editMessageById(messageId, message);
        return res.redirect(`/messages/${messageId}`)
    }
]

async function deleteMessageById(req, res, next) {
    try {
        const message = await db.getMessageById(req.params.messageId);

        if (!message) {
            return res.status(404).send("Message not found");
        }

        const isAdmin = req.user.role === "admin";
        const isOwner = req.user.id === message.user_id;

        if (!isAdmin && !isOwner) {
            return res.status(403).send("Forbidden");
        }

        await db.deleteMessageById(req.params.messageId);

        return res.redirect("/messages");
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getMessageView,
    getMessageById,
    postMessage,
    getMessageByUser,
    deleteMessageById,
    getEditMessageById,
    editMessageById,
    postReplyMessage
}

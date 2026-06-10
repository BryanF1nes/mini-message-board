const { body, validationResult, matchedData } = require("express-validator");
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
];


async function getMessages(req, res) {
    const messages = await db.getMessages();

    if (!messages) {
        res.status(404).send("Messages could not be loaded at this time.");
        return;
    }

    return messages;
};

async function getIndex(req, res) {
    const links = [
        { href: "/", text: "Home" },
        { href: "/messages", text: "Messages" },
    ];

    const messages = await getMessages();

    return res.render("index", { links: links, messages: messages });
}

<span class="view">
    <a href="messages/<%= message.id %>">View</a>
</span>
const postMessage = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const links = [
                { href: "/", text: "Home" },
                { href: "/messages", text: "Messages" },
            ];
            const messages = await getMessages();

            return res.status(400).render("index", {
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

        return res.redirect("/");
    }
];

module.exports = { getMessages, getIndex, postMessage };

const crypto = require("node:crypto");

const messages = [
    {
        id: crypto.randomUUID(),
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        id: crypto.randomUUID(),
        text: "Hello world!",
        user: "Charles",
        added: new Date(),
    },
];


async function getMessages() {
    let message;
    if (messages.length === 0) {
        return message = "There doesn't appear to be any messages at this time";
    }

    return messages;
}

async function getMessageByID(messageID) {
    let message;
    if (!messageID) {
        return message = "We do not have that message";
    }

    return messages.find((message) => message.id === messageID);
}

async function getMessagesByUser(user) {
    let message;
    if (!user) {
        return message = "That user doesn't exist";
    }

    return messages.find((message) => message.user === user);
}

module.exports = { getMessages, getMessageByID, getMessagesByUser };

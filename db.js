const crypto = require("node:crypto");

const messages = [
    {
        id: crypto.randomUUID(),
        text: "Hello, and welcome to the mini-message-board! Written in Express and EJS.",
        user: "Bryan",
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
    if (messages.length === 0) {
        return false
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

async function postMessage(message) {
    return messages.push(message);
}

async function updateMessageByID(messageID, data) {
    const message = messages.find((message) => message.id === messageID);

    message.user = data.user;
    message.text = data.text;
    message.added = data.added;

    return;
}

module.exports = { getMessages, getMessageByID, getMessagesByUser, postMessage, updateMessageByID };

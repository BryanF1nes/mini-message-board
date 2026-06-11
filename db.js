const crypto = require("node:crypto");

class Database {
    constructor() {
        this.messages = [];
    }

    getMessages() {
        return this.messages;
    }

    getMessageByID(messageID) {
        let message;
        if (!messageID) {
            return message = "We do not have that message";
        }

        return this.messages.find((message) => message.id === messageID);
    }

    getMessagesByUser(user) {
        let message;
        if (!user) {
            return message = "That user doesn't exist";
        }

        return this.messages.find((message) => message.user === user);
    }

    postMessage(message) {
        return this.messages.push(message);
    }

    updateMessageByID(messageID, data) {
        const message = this.messages.find((message) => message.id === messageID);

        message.user = data.user;
        message.text = data.text;

        return;
    }
}

module.exports = new Database();

const Database = require("./db");
const { Message } = require("./models/Message");

const messages = [
    {
        user: "bryan",
        text: "Hello world!"
    },
    {
        user: "jason",
        text: "This is a pretty cool site."
    },
    {
        user: "david",
        text: "Hi there my name is David."
    }
];

function populate() {
    messages.forEach((message) => {
        const newMessage = new Message(message.user, message.text);
        Database.postMessage(newMessage);
    });
}

module.exports = { populate }

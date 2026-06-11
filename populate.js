const Database = require("./db");
const { Message } = require("./models/Message");

const messages = [
    {
        user: "Bryan",
        text: "Hello world!"
    },
    {
        user: "Jason",
        text: "This is a pretty cool site."
    }
];

function populate() {
    messages.forEach((message) => {
        const newMessage = new Message(message.user, message.text);
        Database.postMessage(newMessage);
    });
}

module.exports = { populate }

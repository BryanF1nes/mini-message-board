const messages = [
    {
        id: 1,
        text: "Hello",
        user: "Armando",
        added: new Date(),
    },
    {
        id: 2,
        text: "Hello World!",
        user: "Bryan",
        added: new Date(),
    }
];

async function messageById(messageId) {
    return messages.find(message => message.id === messageId)
};

module.exports = { messages, messageById };
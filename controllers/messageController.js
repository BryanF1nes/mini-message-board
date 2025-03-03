const messages = require("../db.js");

function messageController(req, res) {
    if (req.method === "POST") {
        let messageId = messages.length + 1;
        messages.push({ id: messageId, text: req.body.text, user: req.body.user, added: new Date() });
        return res.redirect("/messages");
    }

    if (req.url === "/new") {
        return res.render("new", { title: "Add A Message" })
    }

    // If message ID or User ID 
    // return view with that message/user object

    // error
    // return all messages
    return res.render("messages", { title: "Mini-Message Board", messages: messages })
};

module.exports = messageController;
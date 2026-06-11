class Message {
    constructor(user, text) {
        this.id = crypto.randomUUID();
        this.user = user;
        this.text = text;
        this.added = new Date();
    }
}

module.exports = { Message }

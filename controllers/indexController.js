const links = [
    { href: "/messages", text: "Messages" },
    { href: "/", text: "Home" },
    { href: "/messages/new", text: "Add A Message"}
]

function indexController(req, res) {
    return res.render("index", { links: links })
}

module.exports = indexController;
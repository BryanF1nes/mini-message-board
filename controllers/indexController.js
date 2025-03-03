const links = [
    { href: "/messages", text: "Messages" },
    { href: "/", text: "Home" }
]

function indexController(req, res) {
    return res.render("index", { links: links })
}

module.exports = indexController;
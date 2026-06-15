const { links } = require("./indexController")
const passport = require("passport");

function getLogin(req, res) {
    return res.render("base-template", { content: "login/login", title: "Login", links: links(req) })
}

const postLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
});


module.exports = {
    getLogin,
    postLogin
}

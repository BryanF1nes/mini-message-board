const db = require("../db/queries");
const { links } = require("./indexController");

function getSignUpPage(req, res) {
    return res.render("signup/signupform", { title: "Sign Up Form", links: links });
}

module.exports = {
    getSignUpPage
}

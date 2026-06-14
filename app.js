require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const path = require("node:path");

// Authentication
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

// Routes
const indexRouter = require("./routes/indexRouter.js");
const messageRouter = require("./routes/messageRouter.js");
const adminRouter = require("./routes/adminRouter.js");
const signUpRouter = require("./routes/signUpRouter.js");

// Styles
const assetsPath = path.join(__dirname, "public");

// Populate
const { populate } = require("./populate");
populate();

// Middleware + Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

// Routes
app.use("/", indexRouter);
app.use("/messages", messageRouter);
app.use("/admin", adminRouter);
app.use("/sign-up", signUpRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
    if (error) {
        throw new Error(error.message);
    }

    console.log(`Express app listening on port: ${PORT}`);
});

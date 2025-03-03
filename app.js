require("dotenv").config();
const express = require("express");
const path = require("node:path");
const fs = require("node:fs");
const PORT = process.env.PORT || 5000;

const app = express();

const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware


// Routes
app.get("/", indexRouter);
app.get("/messages", messageRouter);

app.listen(PORT, () => {
    console.log(`Server running on: localhost:${PORT}`);
})
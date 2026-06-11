const express = require("express");
const path = require("node:path");
const app = express();

// Routes
const indexRouter = require("./routes/indexRouter.js");
const messageRouter = require("./routes/messageRouter.js");

// Styles
const assetsPath = path.join(__dirname, "public");

// Populate
const { populate } = require("./populate");
populate();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use("/", indexRouter);
app.use("/messages", messageRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw new Error(error.message);
    }

    console.log(`Express app listening on port: ${PORT}`);
});

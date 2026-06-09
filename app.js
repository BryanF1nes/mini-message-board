const express = require("express");
const path = require("node:path");
const app = express();

// Routes
const indexRouter = require("./routes/indexRouter.js");

// Styles
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw new Error(error.message);
    }

    console.log(`Express app listening on port: ${PORT}`);
});

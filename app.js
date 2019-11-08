const express = require("express");
const path = require("path");
const app = express();

// route setup
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/colorgame.html"));
});

// server port
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`running at port: ${port}`);
});
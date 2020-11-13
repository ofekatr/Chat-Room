const path = require("path");
const express = require("express");

const app = express();
app.use(express.static(path.join(path.dirname(require.main.filename), "public")));

module.exports = app;
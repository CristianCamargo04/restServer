require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use(require("./routes/index"));

mongoose.connect("mongodb://localhost:27017/cafe", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto: ", process.env.PORT);
});
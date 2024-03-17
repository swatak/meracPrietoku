const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.DB_HOST;
console.log(uri);

//mongoose connection
mongoose.connect(uri, {
 // useNewUrlParser: true,
 // useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

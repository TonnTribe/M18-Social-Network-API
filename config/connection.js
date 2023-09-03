const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/m18-social-network-api"
);

mongoose.connection.on("connected", () => {
    console.log("Mongoose successfully connected.");
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error: ", err);
});

module.exports = mongoose.connection;

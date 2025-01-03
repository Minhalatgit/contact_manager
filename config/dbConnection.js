const mongoose = require("mongoose");

const connectDb = async () => {
    try {

        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connection to the DB done", connect.connection.name);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = { connectDb };
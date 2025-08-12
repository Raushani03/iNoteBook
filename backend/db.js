const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost:27017/inotebook"

const connectDB = async () => {
    try {
        // mongoose.connect(mongoUri) calls the MongoDB native driver (MongoClient).
        // The MongoDB driver then tries to parse the connection string (mongoUri).
        const conn = await mongoose.connect(mongoUri);
        // console.log("conn :", conn);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
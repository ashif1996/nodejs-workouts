// Connect a Node.js app to MongoDB using Mongoose.

const mongoose = require('mongoose');

const uri = "mongodb://localhost/27017/mydatabase"; 

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(uri);
        const connectionDetails = `${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`;

        console.log(`MongoDB connected: ${connectionDetails}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

connectToDatabase();
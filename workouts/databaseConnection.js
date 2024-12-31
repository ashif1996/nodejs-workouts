// Connect a Node.js app to MongoDB using Mongoose.

const mongoose = require('mongoose');

const uri = "mongodb://localhost/27017/mydatabase"; 

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
    }
};

module.exports = connectToDatabase;
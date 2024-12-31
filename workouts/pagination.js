// Implement pagination for retrieving database records.

const express = require('express');
const mongoose = require('mongoose');
const app = express();

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

connectToDatabase();

const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
}));

// Paginated route
app.get('/products', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find()
            .skip(skip)
            .limit(Number(limit))
            .lean();

        const total = await Product.countDocuments();

        res.json({
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
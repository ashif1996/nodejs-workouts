// Implement centralized error handling in Express.

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    throw new Error('Something went wrong!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
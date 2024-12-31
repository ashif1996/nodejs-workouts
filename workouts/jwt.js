// Implement user authentication using JWT for session management.

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Mock database for user
const users = [{ id: 1, username: 'test', password: 'password' }];

// Login route: Generate JWT token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        'secretkey',
        { expiresIn: '1h' },
    );

    res.json({ token });
});

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(403).send('Access denied');

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
};

// Protected route
app.get('/profile', authenticateJWT, (req, res) => {
    res.json({
        message: 'Welcome to your profile!',
        user: req.user,
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
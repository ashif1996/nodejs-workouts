// Improve application performance by caching frequently accessed data using Redis.

const redis = require('redis');
const client = redis.createClient();

app.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    
    client.get(id, async (err, cachedData) => {
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        const product = await db.collection('products').findOne({ _id: id });
        client.setex(id, 3600, JSON.stringify(product)); // Cache for 1 hour
        res.json(product);
    });
});
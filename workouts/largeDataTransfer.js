// Build an API that streams large data sets efficiently instead of sending them all at once.

app.get('/large-data', async (req, res) => {
    const cursor = db.collection('largeCollection').find();
    res.setHeader('Content-Type', 'application/json');
    res.write('[');
    let first = true;

    await cursor.forEach((doc) => {
        if (!first) res.write(',');
        res.write(JSON.stringify(doc));
        first = false;
    });

    res.write(']');
    res.end();
});
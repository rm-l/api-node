import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.send('teste numero2!');
});

export { app };


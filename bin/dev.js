const dotenv = require('dotenv');
const express = require('express');
const { handler } = require('../dist/index');

dotenv.config();

const app = express();
app.use(express.json());

const { RUGCHECK_BASE_URL, PORT } = process.env;

if (RUGCHECK_BASE_URL === undefined) {
    console.log('`RUGCHECK_BASE_URL` not set. Copy .env.example to .env first.');
    process.exit(1);
}

app.post('/', async (req, res) => {
    const event = {
        body: JSON.stringify({
            args: req.body,
            secrets: {
                RUGCHECK_BASE_URL
            }
        })
    };

    try {
        const result = await handler(event);
        res.status(result.statusCode).send(JSON.parse(result.body));
    } catch (error) {
        res.status(500).send({
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        });
    }
});

const port = PORT || 3000;
app.listen(port, () => {
    console.log(`Local development server running on port ${port}`);
}); 
const dotenv = require('dotenv');
const express = require('express');
const { handler } = require('../dist/index');

dotenv.config();

const app = express();

const { RUGCHECK_BASE_URL, PORT } = process.env;

app.get('/', async (req, res) => {
    const { action, token_id, page, limit } = req.query;

    const event = {
        body: JSON.stringify({
            args: {
                action,
                token_id,
                page,
                limit
            },
            secrets: {
                RUGCHECK_BASE_URL
            }
        })
    }

    const result = await handler(event)

    res.status(result.statusCode).send(result.body);
});

// Add a route to display available actions
app.get('/help', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>RugGuardianTest API</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                    h1 { color: #333; }
                    .action { margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
                    .action h3 { margin-top: 0; }
                    .params { color: #666; }
                    .required { color: red; }
                    code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
                </style>
            </head>
            <body>
                <h1>RugGuardianTest API</h1>
                <p>Available actions:</p>
                
                <div class="action">
                    <h3>get_verified_stats</h3>
                    <p>Get list of verified tokens</p>
                    <p class="params">Required params: <span class="required">action=get_verified_stats</span></p>
                    <p>Example: <code>/?action=get_verified_stats</code></p>
                </div>
                
                <div class="action">
                    <h3>get_new_tokens</h3>
                    <p>Get list of recently detected tokens</p>
                    <p class="params">Required params: <span class="required">action=get_new_tokens</span></p>
                    <p>Example: <code>/?action=get_new_tokens</code></p>
                </div>
                
                <div class="action">
                    <h3>get_trending_tokens</h3>
                    <p>Get most voted tokens in last 24h</p>
                    <p class="params">Required params: <span class="required">action=get_trending_tokens</span></p>
                    <p>Example: <code>/?action=get_trending_tokens</code></p>
                </div>
                
                <div class="action">
                    <h3>get_recent_tokens</h3>
                    <p>Get most viewed tokens in last 24h</p>
                    <p class="params">Required params: <span class="required">action=get_recent_tokens</span></p>
                    <p>Example: <code>/?action=get_recent_tokens</code></p>
                </div>
                
                <div class="action">
                    <h3>get_token_summary</h3>
                    <p>Get token report summary</p>
                    <p class="params">Required params: <span class="required">action=get_token_summary&token_id=TOKEN_ID</span></p>
                    <p>Example: <code>/?action=get_token_summary&token_id=0x1234...</code></p>
                </div>
                
                <div class="action">
                    <h3>get_token_votes</h3>
                    <p>Get token voting statistics</p>
                    <p class="params">Required params: <span class="required">action=get_token_votes&token_id=TOKEN_ID</span></p>
                    <p>Example: <code>/?action=get_token_votes&token_id=0x1234...</code></p>
                </div>
            </body>
        </html>
    `);
});

const port = PORT || 3000;
app.listen(port, () => {
    console.log(`RugGuardianTest API running on port ${port}`);
    console.log(`Visit http://localhost:${port}/help for documentation`);
    console.log('\nAvailable actions:');
    console.log('- get_verified_stats: Get list of verified tokens');
    console.log('- get_new_tokens: Get list of recently detected tokens');
    console.log('- get_trending_tokens: Get most voted tokens in last 24h');
    console.log('- get_recent_tokens: Get most viewed tokens in last 24h');
    console.log('- get_token_summary: Get token report summary');
    console.log('- get_token_votes: Get token voting statistics');
    console.log('\nExample: http://localhost:' + port + '/?action=get_verified_stats');
});

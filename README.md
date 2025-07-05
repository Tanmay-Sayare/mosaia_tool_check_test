# RugCheck Tool for Mosaia.ai

A tool for analyzing cryptocurrency tokens and identifying potential risks using the RugCheck API.

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
RUGCHECK_BASE_URL=https://api.rugcheck.xyz/v1
PORT=3000  # Optional, defaults to 3000
```

3. Build the project:
```bash
npm run build
```

4. Start the development server:
```bash
npm run dev
```

## API Usage

The tool exposes a single endpoint that accepts POST requests with the following parameters:

- `action` (required): The type of analysis to perform
  - `get_verified_stats`: Get statistics about verified tokens
  - `get_new_tokens`: Get list of new tokens
  - `get_trending_tokens`: Get list of trending tokens
  - `get_recent_tokens`: Get list of recently added tokens
  - `get_token_summary`: Get detailed summary for a specific token
  - `get_token_votes`: Get community votes for a specific token

- `token_id` (required for token-specific actions): The token address or identifier
- `page` (optional): Page number for paginated results
- `limit` (optional): Number of results per page

### Example Request

```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{
    "action": "get_token_summary",
    "token_id": "0x123..."
  }'
```

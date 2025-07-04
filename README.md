# RugGuardianTest API

A Mosaia Tool implementation for analyzing cryptocurrency tokens and detecting potential risks using the RugCheck API.

## About RugGuardianTest API

The RugGuardianTest API provides a simplified interface to the RugCheck.xyz API, focusing on essential token analysis features. This tool helps users identify potential risks in blockchain projects and analyze token legitimacy.

### Available Actions

- **get_verified_stats**: Get list of verified tokens
- **get_new_tokens**: Get list of recently detected tokens
- **get_trending_tokens**: Get most voted tokens in last 24h
- **get_recent_tokens**: Get most viewed tokens in last 24h
- **get_token_summary**: Get token report summary (requires token_id)
- **get_token_votes**: Get token voting statistics (requires token_id)

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following configuration:
   ```
   RUGCHECK_BASE_URL=https://api.rugcheck.xyz/v1
   PORT=3000
   ```
4. Build the project: `npm run build`
5. Start the local development server: `npm run start:dev`
6. Visit http://localhost:3000/help to see the API documentation

### API Usage Examples

1. Get verified tokens:
```bash
curl -XGET "http://localhost:3000/?action=get_verified_stats"
```

2. Get token summary:
```bash
curl -XGET "http://localhost:3000/?action=get_token_summary&token_id=YOUR_TOKEN_ID"
```

3. Get trending tokens with pagination:
```bash
curl -XGET "http://localhost:3000/?action=get_trending_tokens&page=1&limit=10"
```

### Parameters

- **action** (required): The API action to perform (one of the available actions listed above)
- **token_id** (required for token-specific actions): The token ID for summary and votes actions
- **page** (optional): Page number for paginated results (minimum: 1)
- **limit** (optional): Number of results per page (minimum: 1, maximum: 100)

### Deploying to Mosaia

1. Register for an account on mosaia.ai
2. Install the GitHub app to your repo
3. Validate your `.mosaia` manifest file: `npm run validate:manifest`
4. Push your changes to `main`
5. Your tool will appear in your Mosaia dashboard

## Manifest Validation

The project includes a validation script that checks your `.mosaia` manifest file against the required schema:

```bash
npm run validate:manifest
```

This script validates:
- **name**: Must be a string with minimum length 5
- **description**: Must be a string with minimum length 30
- **schema.type**: Must be "function"
- **schema.function.name**: Must be a string with minimum length 5
- **schema.function.description**: Must be a string with minimum length 30
- **schema.function.parameters**: Must be a valid JSON schema object
- **envVars**: Must be an array of strings

## Development

The project is built with:
- TypeScript
- Express.js for the development server
- Axios for API requests
- dotenv for environment configuration

### Project Structure

```
RugGuardianTest/
├── bin/
│   ├── dev.js            # Development server
│   └── validate-manifest.js
├── src/
│   ├── index.ts          # Main handler
│   └── tool-call.ts      # API implementation
├── .env                  # Environment configuration
├── .mosaia              # Mosaia manifest
├── package.json
└── tsconfig.json
```

## Minimum Requirements

The project requires:
1. A valid `.mosaia` file
2. npm `build` command
3. Transpiled code in `dist` directory
4. Entry point at `dist/index.js`

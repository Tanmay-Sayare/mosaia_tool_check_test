# RugCheck Tool

A Mosaia Tool implementation for analyzing cryptocurrency tokens and detecting potential risks using the RugCheck API.

## About RugCheck Tool

The RugCheck Tool provides a simplified interface to the RugCheck.xyz API, focusing on essential token analysis features. This tool helps users identify potential risks in blockchain projects and analyze token legitimacy.

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
   ```
4. Build the project: `npm run build`
5. Validate the manifest: `npm run validate:manifest`

### Parameters

- **action** (required): The API action to perform (one of the available actions listed above)
- **token_id** (required for token-specific actions): The token ID for summary and votes actions
- **page** (optional): Page number for paginated results
- **limit** (optional): Number of results per page

### Deploying to Mosaia

1. Register for an account on mosaia.ai
2. Install the GitHub app to your repo by clicking the "Launch App" button on: https://mosaia.ai/org/mosaia/app/github
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
- Axios for API requests

### Project Structure

```
RugCheck Tool/
├── bin/
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

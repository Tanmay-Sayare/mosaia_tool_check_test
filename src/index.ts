import toolCall from "./tool-call";

type RawEvent = {
    body: string;
}

type ParsedEvent = {
    args: {
        action: string;
        token_id?: string;
        page?: string;
        limit?: string;
    };
    secrets: {
        RUGCHECK_BASE_URL: string;
    }
}

export async function handler(event: RawEvent) {
    const {
        args: {
            action,
            token_id,
            page,
            limit
        },
        secrets: {
            RUGCHECK_BASE_URL
        }
    } = JSON.parse(event.body) as ParsedEvent;

    // Validate required parameters
    if (!action) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: 'Missing required parameter: action',
                validActions: [
                    'get_verified_stats',
                    'get_new_tokens',
                    'get_trending_tokens',
                    'get_recent_tokens',
                    'get_token_summary',
                    'get_token_votes'
                ]
            }),
        };
    }

    // Use the RUGCHECK_BASE_URL from environment variables or default
    const baseUrl = RUGCHECK_BASE_URL || 'https://api.rugcheck.xyz/v1';

    try {
        const result = await toolCall(action, token_id, page, limit, baseUrl);

        return {
            statusCode: 200,
            body: result, // result is already stringified in toolCall
        };
    } catch (error: unknown) {
        let message = '';

        if (error instanceof Error) {
            message = error.message;
        } else {
            message = 'Unknown error';
        }

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to execute RugCheck API request',
                details: message
            }),
        };
    }
}

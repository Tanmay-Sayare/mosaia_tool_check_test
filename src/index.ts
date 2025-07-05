import toolCall from "./tool-call";

type ToolInput = {
    action: string;
    token_id?: string;
    page?: string;
    limit?: string;
}

const Mosaia_ai_prod_tools_74f8eea63f83 = async (input: ToolInput, context: { RUGCHECK_BASE_URL: string }) => {
    const { action, token_id, page, limit } = input;
    const { RUGCHECK_BASE_URL } = context;

    // Validate required parameters
    if (!action) {
        throw new Error(JSON.stringify({
            error: 'Missing required parameter: action',
            validActions: [
                'get_verified_stats',
                'get_new_tokens',
                'get_trending_tokens',
                'get_recent_tokens',
                'get_token_summary',
                'get_token_votes'
            ]
        }));
    }

    // Use the RUGCHECK_BASE_URL from context
    const baseUrl = RUGCHECK_BASE_URL || 'https://api.rugcheck.xyz/v1';

    try {
        const result = await toolCall(action, token_id, page, limit, baseUrl);
        return JSON.parse(result);
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = 'Unknown error';
        }
        throw new Error(JSON.stringify({
            error: 'Failed to execute RugCheck API request',
            details: message
        }));
    }
};

export default Mosaia_ai_prod_tools_74f8eea63f83;

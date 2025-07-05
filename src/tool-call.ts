import axios from 'axios';

interface RugCheckParams {
    page?: number;
    limit?: number;
}

export default async function toolCall(
    action: string,
    token_id: string | undefined,
    page: string | undefined,
    limit: string | undefined,
    rugcheckBaseUrl: string
): Promise<string> {
    // Construct params object for optional parameters
    const params: RugCheckParams = {};
    if (page) params.page = parseInt(page);
    if (limit) params.limit = parseInt(limit);
    
    try {
        const result = await callRugCheckAPI(action, token_id, params, rugcheckBaseUrl);
        return JSON.stringify(result);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Unknown error occurred while calling RugCheck API');
    }
}

async function callRugCheckAPI(
    action: string,
    token_id: string | undefined,
    params: RugCheckParams,
    baseUrl: string
) {
    let endpoint = '';
    
    switch (action) {
        case 'get_verified_stats':
            endpoint = '/stats/verified';
            break;
        case 'get_new_tokens':
            endpoint = '/stats/new_tokens';
            break;
        case 'get_trending_tokens':
            endpoint = '/stats/trending';
            break;
        case 'get_recent_tokens':
            endpoint = '/stats/recent';
            break;
        case 'get_token_summary':
            if (!token_id) {
                throw new Error('token_id is required for get_token_summary action');
            }
            endpoint = `/tokens/${token_id}/report/summary`;
            break;
        case 'get_token_votes':
            if (!token_id) {
                throw new Error('token_id is required for get_token_votes action');
            }
            endpoint = `/tokens/${token_id}/votes`;
            break;
        default:
            throw new Error(`Invalid action: ${action}`);
    }
    
    try {
        const config = {
            method: 'GET',
            url: `${baseUrl}${endpoint}`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Object.keys(params).length > 0 ? params : undefined
        };
        
        const response = await axios(config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            throw new Error(error.response?.data?.error || error.message);
        }
        throw error;
    }
}

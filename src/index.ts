import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { toolCall } from './tool-call';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    return await toolCall(event);
}

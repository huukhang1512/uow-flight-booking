import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from 'aws-lambda';

export async function getFlights(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  console.log('event', event);

  return {
    body: JSON.stringify({message: 'Hello!!!'}),
    statusCode: 200,
  };
}

module.exports = {getFlights};
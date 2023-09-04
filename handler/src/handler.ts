import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import OpenAI from './clients/OpenAI';

export type Dependencies = {
  openAI: OpenAI;
};

const openAI = OpenAI.init()

exports.handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  console.log('Received event: ', event);
  return {}
};

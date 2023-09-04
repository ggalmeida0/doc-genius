import { SecretsManager } from 'aws-sdk';
import { Configuration, OpenAIApi } from 'openai';
import InternalServerError from '../errors/InternalServerError';


class OpenAI {
  private client: OpenAIApi;
  private model: string;

  constructor(client: OpenAIApi) {
    this.model = 'gpt-3.5-turbo-0613';
    this.client = client;
  }
  static async init(): Promise<OpenAI> {
    const OPENAI_ORG_ID = process.env.OPEN_AI_ORG_ID
    if (!OPENAI_ORG_ID) { throw new InternalServerError("Error initializing OpenAI Client, could not find OPENAI_ORG_ID in environment variables")}
    const secretManagerClient = new SecretsManager({ region: 'us-east-2' });
    const credentialsSecret = await secretManagerClient
      .getSecretValue({ SecretId: 'openai' })
      .promise();
    const apiKey = JSON.parse(
      credentialsSecret.SecretString || ''
    ).OPENAI_API_KEY;
    const configuration = new Configuration({
      organization: OPENAI_ORG_ID,
      apiKey,
    });

    const client = new OpenAIApi(configuration);
    return new OpenAI(client);
  }
}

export default OpenAI;

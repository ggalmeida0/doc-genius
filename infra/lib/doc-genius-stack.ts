import { Stack, StackProps } from 'aws-cdk-lib';
import {
  Code,
  Function,
  FunctionUrlAuthType,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { config } from 'dotenv';
import { handlerConfig } from './resources-config';

config({ path: '../.env' });

export type Environment = {
  openAiOrgId: string;
};

export function getFromEnvironment(): Environment {
  const openAiOrgId = process.env.OPENAI_ORG_ID;
  if (openAiOrgId == null) {
    throw new Error('Please set OPENAI_ORG_ID. More details in README.md');
  }
  return { openAiOrgId };
}

export class DocGeniusStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const handler = new Function(this, 'DocGeniusHandler', {
      runtime: Runtime.NODEJS_18_X,
      functionName: 'DocGeniusEventHandler',
      handler: 'dist/handler.handler',
      code: Code.fromAsset('../handler/lambda_build/dg_handler.zip'),
      environment: {
        OPENAI_ORG_ID: getFromEnvironment().openAiOrgId,
      },
      ...handlerConfig,
    });
    handler.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });
  }
}

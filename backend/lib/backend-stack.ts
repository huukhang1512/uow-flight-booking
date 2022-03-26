import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const getListOfFlightBooking = new NodejsFunction(this,
      'GetListOfFlightBooking', {
        runtime: lambda.Runtime.NODEJS_14_X,    // execution environment
        handler: 'getFlights',
        entry: path.join(__dirname, `/../src/lambda-functions/flight.ts`)
    });
  }
}

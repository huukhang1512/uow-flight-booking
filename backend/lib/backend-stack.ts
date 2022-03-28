import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const getListOfFlightBooking = new NodejsFunction(this,
      'GetListOfFlightBooking', {
        runtime: lambda.Runtime.NODEJS_14_X,    // execution environment
        handler: 'getFlights',
        entry: path.join(__dirname, `/../src/lambda-functions/flight.ts`)
    });

    const api = new apigateway.RestApi(this, '/flight', {
      restApiName: "Lambda Flight API",
      description: "This is a CRUD API for flight"
    }) 

    const getListOfFlightAPI = new apigateway.LambdaIntegration(getListOfFlightBooking, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    })
    api.root.addResource('flight');
    api.root.addMethod("GET", getListOfFlightAPI);
  }
}

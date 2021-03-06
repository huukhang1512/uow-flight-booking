import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as cdk from "aws-cdk-lib";
// import * as ec2 from "aws-cdk-lib/aws-ec2";
// import { Database } from "../construct/database";
// import { Application } from "../construct/application";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // const vpc = new ec2.Vpc(this, `Vpc`);

    // const database = new Database(this, `Database`, { vpc });

    // const application = new Application(this, `Application`, {
    //   vpc,
    //   database: {
    //     // We use direct reference for host and port because using only secret here results in failure of refreshing values.
    //     // Also refer to: https://github.com/aws-cloudformation/cloudformation-coverage-roadmap/issues/369
    //     host: database.cluster.clusterEndpoint.hostname,
    //     port: cdk.Token.asString(database.cluster.clusterEndpoint.port),
    //     engine: database.secret.secretValueFromJson("engine").toString(),
    //     // We use the master user only to simplify this sample.
    //     // You should create a database user with minimal privileges for your application.
    //     // Also refer to: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.MasterAccounts.html
    //     username: database.secret.secretValueFromJson("username").toString(),
    //     password: database.secret.secretValueFromJson("password").toString(),
    //   },
    // });

    // database.allowInboundAccess(application.lambdaSecurityGroup);

    const travelPayoutsAPIKey = StringParameter.valueForStringParameter(
      this,
      "travelPayoutAPIKey"
    );

    const travelPayoutsAccessToken = StringParameter.valueForStringParameter(
      this,
      "travelPayoutAPIAccessToken"
    );
    const baseApi = new apigateway.RestApi(this,"/");

    const searchForAirport = new NodejsFunction(this, "SearchForAirport", {
      runtime: lambda.Runtime.NODEJS_14_X, // execution environment
      handler: "getAirports",
      entry: path.join(__dirname, `../../src/airport-lambda/airport.ts`),
    });

    const searchForAirportById = new NodejsFunction(
      this,
      "SearchForAirportById",
      {
        runtime: lambda.Runtime.NODEJS_14_X, // execution environment
        handler: "getAirportById",
        entry: path.join(__dirname, `../../src/airport-lambda/airport.ts`),
      }
    );

    const searchForAirportApi = new apigateway.LambdaIntegration(
      searchForAirport,
      {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' },
      }
    );

    const searchForAirportByIdApi = new apigateway.LambdaIntegration(
      searchForAirportById,
      {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' },
      }
    );

    const airport = baseApi.root.addResource("airport");
    const airportWithId = airport.addResource("{id}");
    airport.addMethod("GET", searchForAirportApi);
    airportWithId.addMethod("GET", searchForAirportByIdApi);

    const getListOfFlightBooking = new NodejsFunction(
      this,
      "GetListOfFlightBooking",
      {
        runtime: lambda.Runtime.NODEJS_14_X, // execution environment
        handler: "getFlights",
        entry: path.join(__dirname, `../../src/flight-lambda/flight.ts`),
        environment: {
          TRAVEL_PAYOUT_API_KEY: travelPayoutsAPIKey,
          TRAVEL_PAYOUT_ACCESS_TOKEN: travelPayoutsAccessToken,
        },
      }
    );


    const getListOfFlightAPI = new apigateway.LambdaIntegration(
      getListOfFlightBooking,
      {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' },
      }
    );
    const flight = baseApi.root.addResource("flight");
    flight.addMethod("POST", getListOfFlightAPI);
  }
}

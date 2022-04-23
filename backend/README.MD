# Welcome to the UOW Flight Booking CDK Backend

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## How to setup the project for local
1. Clone this repository
> git clone git@github.com:huukhang1512/uow-flight-booking.git

2. Make sure that you have configure your AWS account on your local machine, if not, use this command:
> aws configure

3. Install the dependencies
> npm install

4. Boostrap the CDK stack
> cdk bootstrap

5. Deploy the stack
> cdk deploy

To run the API locally, bootstrap the stack and then run the following commands:
>sam local start-api -t ./cdk.out/<stackName>.template.json [OPTIONS]

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

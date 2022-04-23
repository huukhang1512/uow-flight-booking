import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { DatabaseConnectionProps, PrismaFunction } from "./prisma-function";
import { Construct } from 'constructs';

interface ApplicationProps {
  vpc: ec2.IVpc;
  database: DatabaseConnectionProps;
}

export class Application extends Construct {
  readonly lambdaSecurityGroup: ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props: ApplicationProps) {
    super(scope, id);

    const vpc = props.vpc;

    const securityGroup = new ec2.SecurityGroup(this, `SecurityGroup`, {
      vpc: props.vpc,
    });

    const handler = new PrismaFunction(this, "Handler", {
      entry: "./handler.ts",
      memorySize: 256,
      timeout: cdk.Duration.seconds(15),
      vpc,
      securityGroups: [securityGroup],
      database: props.database,
      depsLockFilePath: "./yarn.lock",
    });

    const migrationRunner = new PrismaFunction(this, "MigrationRunner", {
      entry: "./migration-runner.ts",
      memorySize: 256,
      timeout: cdk.Duration.minutes(1),
      vpc,
      securityGroups: [securityGroup],
      database: props.database,
      depsLockFilePath: "./yarn.lock",
    });

    new cdk.CfnOutput(this, `HandlerLambdaArn`, { value: handler.functionArn });
    new cdk.CfnOutput(this, `MigrationRunnerLambdaArn`, { value: migrationRunner.functionArn });

    this.lambdaSecurityGroup = securityGroup;
  }
}

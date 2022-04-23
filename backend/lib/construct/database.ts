import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

interface DatabaseProps {
  vpc: ec2.IVpc;
}

export class Database extends Construct {
  readonly cluster: rds.DatabaseCluster;
  readonly secret: secretsmanager.ISecret;
  private readonly securityGroup: ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props: DatabaseProps) {
    super(scope, id);

    const vpc = props.vpc;

    const securityGroup = new ec2.SecurityGroup(this, `SecurityGroup`, {
      vpc,
    });

    const cluster = new rds.DatabaseCluster(this, `Cluster`, {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_13_4,
      }),
      instanceProps: {
        vpc,
        vpcSubnets: vpc.selectSubnets({
          subnets: vpc.isolatedSubnets.concat(vpc.privateSubnets),
        }),
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.T3,
          ec2.InstanceSize.NANO
        ),
        securityGroups: [securityGroup],
      },
      instances: 1,
      storageEncrypted: true,
    });

    this.cluster = cluster;
    this.secret = cluster.secret!;
    this.securityGroup = securityGroup;
  }

  allowInboundAccess(peer: ec2.IPeer) {
    this.securityGroup.addIngressRule(
      peer,
      ec2.Port.tcp(this.cluster.clusterEndpoint.port)
    );
  }
}

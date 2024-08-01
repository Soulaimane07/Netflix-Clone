from diagrams import Diagram, Cluster
from diagrams.aws.compute import EC2, ElasticLoadBalancing
from diagrams.aws.network import Route53, CloudFront
from diagrams.aws.storage import S3
from diagrams.aws.database import RDS, Keyspaces, ElastiCache
from diagrams.aws.security import IAM
from diagrams.aws.management import Cloudwatch
from diagrams.aws.network import VPC

with Diagram("AWS Architecture for Netflix-like Application", show=False):
    route53 = Route53("Route 53")
    cloudfront = CloudFront("CloudFront CDN")
    s3 = S3("S3 (Static Files)")

    with Cluster("VPC"):
        with Cluster("Public Subnet"):
            elb = ElasticLoadBalancing("Elastic Load Balancer")
        
        with Cluster("Private Subnet"):
            ec2_instances = EC2("EC2 Instances\n(Spring Boot)")
            ec2_instances - [RDS("MySQL (RDS)"), Keyspaces("Cassandra (Keyspaces)"), ElastiCache("Redis (ElastiCache)")]
            
    iam = IAM("IAM")
    cloudwatch = Cloudwatch("CloudWatch")

    route53 >> cloudfront >> s3
    cloudfront >> elb >> ec2_instances
    ec2_instances >> [RDS("MySQL (RDS)"), Keyspaces("Cassandra (Keyspaces)"), ElastiCache("Redis (ElastiCache)")]
    [s3, ec2_instances] >> cloudwatch
    iam >> [s3, ec2_instances, RDS("MySQL (RDS)"), Keyspaces("Cassandra (Keyspaces)"), ElastiCache("Redis (ElastiCache)")]

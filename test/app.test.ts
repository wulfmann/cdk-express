import { App } from '../src/app';
import { expect, exactlyMatchTemplate } from '@aws-cdk/assert';

describe('App', () => {
    it('no handler', async () => {
        const app = new App('My-App');

        app.get('/test/:test', './test/functions/getTest');

        expect(app.stack).to(
            exactlyMatchTemplate({
                Resources: {
                    MyAppApi3949E0FE: {
                        Type: 'AWS::ApiGateway::RestApi',
                        Properties: {
                            Name: 'My-AppApi',
                        },
                    },
                    MyAppApiCloudWatchRole4AA4E520: {
                        Type: 'AWS::IAM::Role',
                        Properties: {
                            AssumeRolePolicyDocument: {
                                Statement: [
                                    {
                                        Action: 'sts:AssumeRole',
                                        Effect: 'Allow',
                                        Principal: {
                                            Service: 'apigateway.amazonaws.com',
                                        },
                                    },
                                ],
                                Version: '2012-10-17',
                            },
                            ManagedPolicyArns: [
                                {
                                    'Fn::Join': [
                                        '',
                                        [
                                            'arn:',
                                            {
                                                Ref: 'AWS::Partition',
                                            },
                                            ':iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs',
                                        ],
                                    ],
                                },
                            ],
                        },
                    },
                    MyAppApiAccountC5E95B88: {
                        Type: 'AWS::ApiGateway::Account',
                        Properties: {
                            CloudWatchRoleArn: {
                                'Fn::GetAtt': [
                                    'MyAppApiCloudWatchRole4AA4E520',
                                    'Arn',
                                ],
                            },
                        },
                        DependsOn: ['MyAppApi3949E0FE'],
                    },
                    MyAppApiDeploymentDB13DD496186eee0a25160b5c7a2710db420e286: {
                        Type: 'AWS::ApiGateway::Deployment',
                        Properties: {
                            RestApiId: {
                                Ref: 'MyAppApi3949E0FE',
                            },
                            Description:
                                'Automatically created by the RestApi construct',
                        },
                        DependsOn: [
                            'MyAppApitesttestGETF663B87C',
                            'MyAppApitesttestA30E4952',
                            'MyAppApitest3AF6175A',
                        ],
                    },
                    MyAppApiDeploymentStageprod74F3B896: {
                        Type: 'AWS::ApiGateway::Stage',
                        Properties: {
                            RestApiId: {
                                Ref: 'MyAppApi3949E0FE',
                            },
                            DeploymentId: {
                                Ref:
                                    'MyAppApiDeploymentDB13DD496186eee0a25160b5c7a2710db420e286',
                            },
                            StageName: 'prod',
                        },
                    },
                    MyAppApitest3AF6175A: {
                        Type: 'AWS::ApiGateway::Resource',
                        Properties: {
                            ParentId: {
                                'Fn::GetAtt': [
                                    'MyAppApi3949E0FE',
                                    'RootResourceId',
                                ],
                            },
                            PathPart: 'test',
                            RestApiId: {
                                Ref: 'MyAppApi3949E0FE',
                            },
                        },
                    },
                    MyAppApitesttestA30E4952: {
                        Type: 'AWS::ApiGateway::Resource',
                        Properties: {
                            ParentId: {
                                Ref: 'MyAppApitest3AF6175A',
                            },
                            PathPart: '{test}',
                            RestApiId: {
                                Ref: 'MyAppApi3949E0FE',
                            },
                        },
                    },
                    MyAppApitesttestGETApiPermissionMyAppMyAppApi787590C8GETtesttestF7906198: {
                        Type: 'AWS::Lambda::Permission',
                        Properties: {
                            Action: 'lambda:InvokeFunction',
                            FunctionName: {
                                'Fn::GetAtt': [
                                    'L3Rlc3QvOnRlc3QHandler148CAFCD',
                                    'Arn',
                                ],
                            },
                            Principal: 'apigateway.amazonaws.com',
                            SourceArn: {
                                'Fn::Join': [
                                    '',
                                    [
                                        'arn:',
                                        {
                                            Ref: 'AWS::Partition',
                                        },
                                        ':execute-api:',
                                        {
                                            Ref: 'AWS::Region',
                                        },
                                        ':',
                                        {
                                            Ref: 'AWS::AccountId',
                                        },
                                        ':',
                                        {
                                            Ref: 'MyAppApi3949E0FE',
                                        },
                                        '/',
                                        {
                                            Ref:
                                                'MyAppApiDeploymentStageprod74F3B896',
                                        },
                                        '/GET/test/{test}',
                                    ],
                                ],
                            },
                        },
                    },
                    MyAppApitesttestGETApiPermissionTestMyAppMyAppApi787590C8GETtesttestB6D6006F: {
                        Type: 'AWS::Lambda::Permission',
                        Properties: {
                            Action: 'lambda:InvokeFunction',
                            FunctionName: {
                                'Fn::GetAtt': [
                                    'L3Rlc3QvOnRlc3QHandler148CAFCD',
                                    'Arn',
                                ],
                            },
                            Principal: 'apigateway.amazonaws.com',
                            SourceArn: {
                                'Fn::Join': [
                                    '',
                                    [
                                        'arn:',
                                        {
                                            Ref: 'AWS::Partition',
                                        },
                                        ':execute-api:',
                                        {
                                            Ref: 'AWS::Region',
                                        },
                                        ':',
                                        {
                                            Ref: 'AWS::AccountId',
                                        },
                                        ':',
                                        {
                                            Ref: 'MyAppApi3949E0FE',
                                        },
                                        '/test-invoke-stage/GET/test/{test}',
                                    ],
                                ],
                            },
                        },
                    },
                    MyAppApitesttestGETF663B87C: {
                        Type: 'AWS::ApiGateway::Method',
                        Properties: {
                            HttpMethod: 'GET',
                            ResourceId: {
                                Ref: 'MyAppApitesttestA30E4952',
                            },
                            RestApiId: {
                                Ref: 'MyAppApi3949E0FE',
                            },
                            AuthorizationType: 'NONE',
                            Integration: {
                                IntegrationHttpMethod: 'POST',
                                Type: 'AWS_PROXY',
                                Uri: {
                                    'Fn::Join': [
                                        '',
                                        [
                                            'arn:',
                                            {
                                                Ref: 'AWS::Partition',
                                            },
                                            ':apigateway:',
                                            {
                                                Ref: 'AWS::Region',
                                            },
                                            ':lambda:path/2015-03-31/functions/',
                                            {
                                                'Fn::GetAtt': [
                                                    'L3Rlc3QvOnRlc3QHandler148CAFCD',
                                                    'Arn',
                                                ],
                                            },
                                            '/invocations',
                                        ],
                                    ],
                                },
                            },
                        },
                    },
                    L3Rlc3QvOnRlc3QHandlerServiceRoleBFDA8B36: {
                        Type: 'AWS::IAM::Role',
                        Properties: {
                            AssumeRolePolicyDocument: {
                                Statement: [
                                    {
                                        Action: 'sts:AssumeRole',
                                        Effect: 'Allow',
                                        Principal: {
                                            Service: 'lambda.amazonaws.com',
                                        },
                                    },
                                ],
                                Version: '2012-10-17',
                            },
                            ManagedPolicyArns: [
                                {
                                    'Fn::Join': [
                                        '',
                                        [
                                            'arn:',
                                            {
                                                Ref: 'AWS::Partition',
                                            },
                                            ':iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
                                        ],
                                    ],
                                },
                            ],
                        },
                    },
                    L3Rlc3QvOnRlc3QHandler148CAFCD: {
                        Type: 'AWS::Lambda::Function',
                        Properties: {
                            Code: {
                                S3Bucket: {
                                    Ref:
                                        'AssetParameters9061025f94203af071f3d877d810f8bab07dfd4a77159f46d96c87a40fa5bc10S3Bucket11644273',
                                },
                                S3Key: {
                                    'Fn::Join': [
                                        '',
                                        [
                                            {
                                                'Fn::Select': [
                                                    0,
                                                    {
                                                        'Fn::Split': [
                                                            '||',
                                                            {
                                                                Ref:
                                                                    'AssetParameters9061025f94203af071f3d877d810f8bab07dfd4a77159f46d96c87a40fa5bc10S3VersionKey0F47366D',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                'Fn::Select': [
                                                    1,
                                                    {
                                                        'Fn::Split': [
                                                            '||',
                                                            {
                                                                Ref:
                                                                    'AssetParameters9061025f94203af071f3d877d810f8bab07dfd4a77159f46d96c87a40fa5bc10S3VersionKey0F47366D',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    ],
                                },
                            },
                            Handler: 'index.handler',
                            Role: {
                                'Fn::GetAtt': [
                                    'L3Rlc3QvOnRlc3QHandlerServiceRoleBFDA8B36',
                                    'Arn',
                                ],
                            },
                            Runtime: 'nodejs12.x',
                        },
                        DependsOn: [
                            'L3Rlc3QvOnRlc3QHandlerServiceRoleBFDA8B36',
                        ],
                    },
                },
                Outputs: {
                    MyAppApiEndpoint25509DCA: {
                        Value: {
                            'Fn::Join': [
                                '',
                                [
                                    'https://',
                                    {
                                        Ref: 'MyAppApi3949E0FE',
                                    },
                                    '.execute-api.',
                                    {
                                        Ref: 'AWS::Region',
                                    },
                                    '.',
                                    {
                                        Ref: 'AWS::URLSuffix',
                                    },
                                    '/',
                                    {
                                        Ref:
                                            'MyAppApiDeploymentStageprod74F3B896',
                                    },
                                    '/',
                                ],
                            ],
                        },
                    },
                },
                Parameters: {
                    AssetParameters9061025f94203af071f3d877d810f8bab07dfd4a77159f46d96c87a40fa5bc10S3Bucket11644273: {
                        Type: 'String',
                        Description:
                            'S3 bucket for asset "9061025f94203af071f3d877d810f8bab07dfd4a77159f46d96c87a40fa5bc10"',
                    },
                    AssetParameters9061025f94203af071f3d877d810f8bab07dfd4a77159f46d96c87a40fa5bc10S3VersionKey0F47366D: {
                        Type: 'String',
                        Description:
                            'S3 key for asset version "9061025f94203af071f3d877d810f8bab07dfd4a77159f46d96c87a40fa5bc10"',
                    },
                    AssetParameters9061025f94203af071f3d877d810f8bab07dfd4a77159f46d96c87a40fa5bc10ArtifactHash68CB5211: {
                        Type: 'String',
                        Description:
                            'Artifact hash for asset "9061025f94203af071f3d877d810f8bab07dfd4a77159f46d96c87a40fa5bc10"',
                    },
                },
            })
        );
    });
});

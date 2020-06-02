import * as cdk from '@aws-cdk/core';
import * as ag from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';

import { parsePath } from './utils';

export interface IResourceMapItem {
    construct: ag.Resource;
    children: IResourceMap;
}

export interface IResourceMap {
    [key: string]: IResourceMapItem;
}

export interface AppProps {
    app: cdk.AppProps;
    stack: cdk.StackProps;
    api: ag.RestApiProps;
}

export class App {
    public app: cdk.App;
    public stack: cdk.Stack;
    public api: ag.RestApi;

    private resourceMap: IResourceMap = {};

    constructor(id: string, props?: AppProps) {
        this.app = new cdk.App(props?.app);
        this.stack = new cdk.Stack(this.app, id, props?.stack);
        this.api = new ag.RestApi(this.stack, `${id}Api`, props?.api);
    }

    public get(
        path: string,
        integrationOptions?: ag.LambdaIntegrationOptions,
        options?: ag.MethodOptions,
        fnProps?: lambda.FunctionProps
    ): void {
        const logicalId = this.deriveIdFromPath(path);
        const resource = this.constructResourceMap(path);

        const baseLambdaProps = {
            handler: 'index.handler',
            code: lambda.Code.fromInline(
                'exports.handler=(e,c)=>(console.log("hello world")'
            ),
            runtime: lambda.Runtime.NODEJS_12_X,
        };

        const lambdaProps: lambda.FunctionProps = Object.assign(
            {},
            baseLambdaProps,
            fnProps
        );
        const fn = new lambda.Function(
            this.stack,
            `${logicalId}Handler`,
            lambdaProps
        );
        const integration = new ag.LambdaIntegration(fn, integrationOptions);
        resource.addMethod('GET', integration, options);
    }

    public listen(port: number, callback: () => void): void {
        callback();
    }

    public synth(): void {
        this.app.synth();
    }

    private constructResourceMap(path: string) {
        const resources = parsePath(path);

        let previous: IResourceMapItem | null = null;
        let last: IResourceMapItem | null = null;
        for (let i = 0; i < resources.length; i++) {
            const key = resources[i];

            if (!previous) {
                if (!(key in this.resourceMap)) {
                    const construct = this.api.root.addResource(key);
                    this.resourceMap[key] = { construct, children: {} };
                }
                previous = this.resourceMap[key];
            } else {
                if (!(key in previous.children)) {
                    previous.children[key] = {
                        construct: previous.construct.addResource(key),
                        children: {},
                    };
                }
                previous = previous.children[key];
            }

            if (i === resources.length - 1) {
                last = previous;
            }
        }

        if (!last) {
            throw new Error(`Could not determine last resource in the chain`);
        }

        return last.construct;
    }

    private deriveIdFromPath(path: string) {
        return new Buffer(path).toString('base64');
    }
}

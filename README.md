# CDK Express

******
BETA
******

This project attempts to provide an express-like interface for defining api gateway integrations.

It uses CDK under the hood to generate a cloudformation stack..

## Quickstart

```bash
yarn add cdk-express
```

```typescript
// app.ts
import * as cdx from 'cdx';

const app = cdx();

app.get('/item', './getItem');
```

```js
// ./getItem/index.js

exports.handler = (event, ctx) => {
    return {
        statusCode: 200,
        body: 'Hello World',
        headers: {
            'Content-Type': 'text/html'
        }
    }
}
```

```json
{
    "app": "npx ts-node app.ts"
}
```

```bash
cdk deploy
```

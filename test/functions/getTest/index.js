exports.handler = (event, ctx) => {
    return {
        statusCode: 200,
        body: 'Hello World',
        headers: {
            'Content-Type': 'text/html'
        }
    }
}
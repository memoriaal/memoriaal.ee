const https = require('https')

const INDEX = 'emem_persons'

exports.handler = (event, context, callback) => {
    const options = {
        hostname: '94abc9318c712977e8c684628aa5ea0f.us-east-1.aws.found.io',
        port: 9243,
        path: '/' + INDEX + '/_search?size=10000&from=0',
        method: 'POST',
        headers: {
            'Authorization': 'Basic cmVhZGVyOnJlYWRlcg==',
            'Content-Type': 'application/json'
        }
    }

    const request = https.request(options, response => {
        var body = ''

        response.on('data', function (d) {
            body += d
        })

        response.on('end', function () {
            callback(null, {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: body
            })
        })
    })

    request.on('error', function () {
        callback(null, {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: body
        })
    })

    request.write(event.body)
    request.end()
}

const https = require('https')


exports.handler = async (event) => {
    const options = {
        hostname: '94abc9318c712977e8c684628aa5ea0f.us-east-1.aws.found.io',
        port: 9243,
        path: '/persons/_search?size=1000&from=0',
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
            return {
                statusCode: 200,
                body: body
            }
        })
    })

    request.on('error', function () {
        return {
            statusCode: 500,
            body: body
        }
    })

    request.write(event.body)
    request.end()
}

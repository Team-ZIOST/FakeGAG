function makeRequest(method, headers, url, data) {
    var defer = Q.defer();

    $.ajax({
        method: method,
        headers: headers,
        url: url,
        data: data,
        processData: false,
        success: function (data) {
            defer.resolve(data);
        },
        error: function (error) {
            defer.reject(error);
        }
    });

    return defer.promise;
}

(function testUpdate() {
        var url = 'https://api.parse.com/1/classes/Photo/k0Tqu6zh89',
            headers = {
                'X-Parse-Application-Id': '9YMKtDvRunDr1BEBoLIFTFkPNqfBJrARlpNuEQea',
                'X-Parse-REST-API-Key': 'EAwrIwOLne9r2TEi8pFOR8JlO3c1hiRRDXYpzocu',
                'Content-Type': 'application/json'
            },
            data = JSON.stringify({
                title: 'Changed by test'
            });

        makeRequest('PUT', headers, url, data)
            .then(function () {
                makeRequest('GET', headers, url)
                    .then(function (data) {
                        if (data.title !== 'Changed by test') {
                            console.log('update failed');
                        } else {
                            console.log('update successful');
                        }
                    })
            })
})();
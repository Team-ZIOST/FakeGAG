var app = app || {};

app.userRequester = (function () {
    function UserRequester(baseURL) {
        this._baseURL = baseURL;
    }

    UserRequester.prototype.userRegister = function (username, email, password) {
        var data = {
            'username': username,
            'email': email,
            'password': password
        };


        app.baseRequest.makeRequest('POST', app.baseRequest.getUserHeaders(), 'https://api.parse.com/1/users', JSON.stringify(data))
            .then(function (d) {
                var dataRole = {
                    "users": {
                        "__op": "AddRelation",
                        "objects": [
                            {
                                "__type": "Pointer",
                                "className": "_User",
                                "objectId": "8TOXdXf3tz"
                            },
                            {
                                "__type": "Pointer",
                                "className": "_User",
                                "objectId": d.objectId
                            }
                        ]
                    }
                };

                app.baseRequest.makeRequest('PUT', app.baseRequest.getUserHeaders(), 'https://api.parse.com/1/roles/LGlTwmEecV', JSON.stringify(dataRole))
                    .then(function (data) {
                        console.log(data);
                    }, function (data) {
                        console.log(data);
                    });
                console.log('success');

            });
    };

    return {
        load: function(baseURL){
            return new UserRequester(baseURL);
        }
    }
}());


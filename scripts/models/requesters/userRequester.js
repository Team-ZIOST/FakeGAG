var app = app || {};

app.userRequester = (function () {
    function UserRequester(baseURL) {
        this._baseURL = baseURL;
    }

    UserRequester.prototype.userRegister =
        function (username, email, password) {
            var defer = Q.defer();
            var data = {
                'username': username,
                'email': email,
                'password': password
            };

            app.baseRequest.makeRequest('POST', app.baseRequest.getUserHeaders(), 'https://api.parse.com/1/users', JSON.stringify(data))
                .then(function (userData) {
                    var dataRole = {
                        "users": {
                            "__op": "AddRelation",
                            "objects": [
                                {
                                    "__type": "Pointer",
                                    "className": "_User",
                                    "objectId": userData.objectId
                                }
                            ]
                        }
                    };

                    var url = app.constants.BASE_URL + 'roles/LGlTwmEecV';

                    app.baseRequest.makeRequest('PUT', app.baseRequest.getUserHeaders(),
                        url, JSON.stringify(dataRole))
                        .then(function (data) {
                            defer.resolve(data);
                        }, function (data) {
                            defer.reject(data);
                        });
                });

            return defer.promise;
        };

    UserRequester.prototype.userLogout = function(){
        //todo
    };

    UserRequester.prototype.updateProfile = function (newEmail, newPassword) {
        var defer = Q.defer();
        var data = {};

        var userId = sessionStorage.userId;

        if (newPassword) {
            data.password = newPassword;
        }

        if (newEmail) {
            data.email = newEmail;
        }

        app.baseRequest.makeRequest('PUT', app.baseRequest.getUserHeaders(), 'https://api.parse.com/1/users/' + userId, JSON.stringify(data))
            .then(function (userData) {
                // TODO render notification for success
            });

        return defer.promise;
    };

    return {
        load: function (baseURL) {
            return new UserRequester(baseURL);
        }
    }
}());
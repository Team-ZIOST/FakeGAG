var app = app || {};

app.userRequester = (function () {
    function UserRequester(baseURL) {
        this._baseURL = baseURL;
    }

    UserRequester.prototype.userRegister =
        function (username, email, password) {
            var defer = Q.defer(),
                data = {
                    'username': username,
                    'email': email,
                    'password': password
                };

            app.baseRequest.makeRequest('POST', app.baseRequest.getUserHeaders(), 'https://api.parse.com/1/users', JSON.stringify(data))
                .then(function (userData) {
                    var url = app.constants.BASE_URL + 'roles/LGlTwmEecV',
                        dataRole = {
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

    UserRequester.prototype.userLogout = function () {
        var url = app.constants.BASE_URL + 'logout',
            headers = $.extend({}, app.constants.HEADERS),
            defer = Q.defer();

        headers['X-Parse-Session-Token'] = sessionStorage['sessionToken'];

        app.baseRequest.makeRequest('POST', headers, url)
            .then(function (data) {
                sessionStorage.clear();
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    UserRequester.prototype.userLogin = function (username, password) {
        var defer = Q.defer(),
            url = app.constants.BASE_URL + 'login/?username=' + username + '&password=' + password;

        app.baseRequest.makeRequest('get', app.constants.HEADERS, url, null)
            .then(function (userData) {
                sessionStorage['username'] = username;
                sessionStorage['sessionToken'] = userData.sessionToken;
                sessionStorage['userId'] = userData.objectId;
                defer.resolve(userData)
            }, function (error) {
                defer.reject(error);
                console.log(error.responseText);
            });

        return defer.promise;
    };

    UserRequester.prototype.updateProfile = function (newEmail, newPassword) {
        var defer = Q.defer(),
            data = {},
            userId = sessionStorage.userId;

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
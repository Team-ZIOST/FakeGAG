var app = app || {};

app.userModel = (function () {
    //todo implement requester
    function User() {
        this._requester = app.userRequester.load(app.constants.BASE_URL);
    }

    User.prototype.register = function (username, email, password) {
        //var defer = Q.defer();
        //var data = {
        //    'username': username,
        //    'email': email,
        //    'password': password
        //};
        //this._requester.register(username, email, password);
        //
        //var headers = app.constants.HEADERS;
        //var url = app.constants.BASE_URL + 'users';
        //console.log(headers);
        //
        //app.baseRequest.makeRequest('post', headers, url, JSON.stringify(data))
        //    .then(function (userData) {
        //        var dataRole = {
        //            "users": {
        //                "__op": "AddRelation",
        //                "objects": [
        //                    {
        //                        "__type": "Pointer",
        //                        "className": "_User",
        //                        "objectId": userData.objectId
        //                    }
        //                ]
        //            }
        //        };
        //        url = app.constants.BASE_URL + 'roles/LGlTwmEecV';
        //        app.baseRequest.makeRequest('put', headers, url, JSON.stringify(dataRole))
        //            .then(function (data) {
        //                defer.resolve(data);
        //                console.log('success');
        //            })
        //    }, function (error) {
        //        defer.reject(error);
        //        //console.log(error.responseText);
        //    });

        //console.log('reg');
        var defer = Q.defer();
        this._requester.userRegister(username, email, password)

            .then(function(data){
                defer.resolve(data);
                console.log(data);
            }, function(error){
                defer.reject(error);
                console.log(error.responseText)
            });
        return defer.promise;
    };

    User.prototype.logout = function () {
        var url = app.constants.BASE_URL + 'logout';
        var headers = app.constants.HEADERS;
        var defer = Q.defer();
        headers['X-Parse-Session-Token'] = sessionStorage['sessionToken'];
        app.baseRequest.makeRequest('POST', headers, url)
            .then(function (data) {
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    User.prototype.login = function (username, password) {
        var defer = Q.defer();
        var url = app.constants.BASE_URL + 'login/?username=' + username + '&password=' + password;
        app.baseRequest.makeRequest('get', app.constants.HEADERS, url, null)
            .then(function (userData) {
                sessionStorage['sessionToken'] = userData.sessionToken;
                sessionStorage['userId'] = userData.objectId;
                defer.resolve(userData)
            }, function (error) {
                defer.reject(error);
                console.log(error.responseText);
            });

        return defer.promise;
    };

    User.prototype.takeUserRole = function takeUserRole(id) {
        var defer = Q.defer();
        console.log('id is ' + id);
        var url = app.constants.BASE_URL + 'roles/' + '?where={"users":{"__type":"Pointer","className":"_User","objectId":"' + id + '"}}';
        app.baseRequest.makeRequest('GET', app.constants.HEADERS, url)
            .then(function (data) {
                console.log('taking user role...');
                sessionStorage['userType'] = data.results[0]['name'];
                defer.resolve(sessionStorage['userType']);

            }, function (error) {
                console.log(error);
                defer.reject(error);
            });

        return defer.promise;
    };

    User.prototype.updateProfile = function (newEmail, newPassword) {
        var defer = Q.defer();
        this._requester.updateProfile(newEmail, newPassword)
            .then(function(data){
                defer.resolve(data);
                console.log(data);
            }, function(error){
                defer.reject(error);
                console.log(error.responseText)
            });

        return defer.promise;
    };

    return {
        //todo take requester
        load: function () {
            return new User();
        }
    };
}());

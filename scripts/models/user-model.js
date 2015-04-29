var app = app || {};

app.userModel = (function () {
    function User() {
        this._requester = app.userRequester.load(app.constants.BASE_URL);
    }

    User.prototype.register = function (username, email, password) {
        var defer = Q.defer();

        this._requester.userRegister(username, email, password)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    User.prototype.logout = function () {
        var defer = Q.defer();

        this._requester.userLogout()
            .then(function (data) {
                sessionStorage.clear();
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    User.prototype.login = function (username, password) {
        var defer = Q.defer();

        this._requester.userLogin(username, password)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    User.prototype.takeUserRole = function takeUserRole(id) {
        var defer = Q.defer(),
            url = app.constants.BASE_URL + 'roles/' + '?where={"users":{"__type":"Pointer","className":"_User","objectId":"' + id + '"}}';

        app.baseRequest.makeRequest('GET', app.constants.HEADERS, url)
            .then(function (data) {
                sessionStorage['userType'] = data.results[0]['name'];
                defer.resolve(sessionStorage['userType']);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    User.prototype.updateProfile = function (newEmail, newPassword) {
        var defer = Q.defer();

        this._requester.updateProfile(newEmail, newPassword)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    return {
        load: function () {
            return new User();
        }
    };
}());
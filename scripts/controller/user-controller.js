var app = app || {};

app.userController = (function () {
    function UserController(model) {
        this._model = model;
    }

    UserController.prototype.renderLogin = function ($selector) {
        app.registerLoginView.loginRegisterView($selector, this);
    };

    UserController.prototype.renderLogout = function ($selector) {
        app.registerLoginView.loadLogOutView($selector, this);
    };

    UserController.prototype.renderUpdateProfile = function ($selector) {
        app.updateProfileView.loadUpdateView($selector, this);
    };

    UserController.prototype.loginUser = function (username, password) {
        var _this = this;
        var defer = Q.defer();

        this._model.login(username, password)
            .then(function (data) {
                console.log(data.objectId);
                sessionStorage.loggedUserId = data.objectId;
              return  _this._model.takeUserRole(data.objectId)
                    .then(function (d) {
                        defer.resolve(d);
                    }, function (error) {
                        defer.reject(error);
                    });

            }, function (error) {
                defer.reject(error);
                console.log(error.responseText)
            });
        return defer.promise;
    };

    UserController.prototype.registerUser = function (username, email, password) {
        return this._model.register(username, email, password);
    };

    UserController.prototype.updateProfile = function (email, password) {
        return this._model.updateProfile(email, password);
    };

    UserController.prototype.logoutUser = function () {
        var defer = Q.defer();
        this._model.logout()
            .then(function (data) {
                sessionStorage.clear();
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    return {
        load: function (model) {
            return new UserController(model)
        }
    }
}());
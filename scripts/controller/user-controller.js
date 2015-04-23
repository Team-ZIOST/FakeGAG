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
        this._model.login(username, password)
            .then(function (data) {
                console.log(data.objectId);
                _this._model.takeUserRole(data.objectId)
                    .then(function(){
                        console.log('login complete');
                    }, function(error){
                        console.log(error.responseText);
                    });
                //todo render to do view
            }, function (error) {
                console.log(error.responseText)
            });
    };

    UserController.prototype.registerUser = function (username, email, password) {
        this._model.register(username, email, password)
            .then(function (data) {
                console.log(data);
                //todo DOM manipulation
            }, function (error) {
                console.log(error.responseText)
            });
    };

    UserController.prototype.updateProfile = function (email, password) {
        this._model.updateProfile(email, password)
            .then(function (data) {
                console.log(data);
                //todo DOM manipulation
            }, function (error) {
                console.log(error.responseText)
            });
    };

    UserController.prototype.logoutUser = function () {
        this._model.logout()
            .then(function (data) {
                sessionStorage.clear();

                //todo dom manipulations
                console.log('log out successful');
            }, function (error) {
                console.log(error.responseText);
            });
    };

    return {
        load: function (model) {
            return new UserController(model)
        }
    }

}());
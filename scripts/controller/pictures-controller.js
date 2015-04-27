var app = app || {};

app.pictureController = (function () {
    function PictureController(model, commentController) {
        this._model = model;
        this._commentController = commentController;
    }

    PictureController.prototype.renderAllPictures = function (selector) {
        var _this = this;

        this._model.showAllPictures()
            .then(function (data) {
                app.picturesView.load(data, selector, _this._commentController);
            }, function (err) {
                console.error(err)
            })
    };

    PictureController.prototype.renderTopTenPictures = function (selector) {
        var _this = this;

        this._model.showTopTenPictures()
            .then(function (data) {
                app.picturesView.load(data, selector, _this._commentController);
            }, function (err) {
                console.error(err)
            })
    };

    PictureController.prototype.renderPicturesByCategory = function ($selector, category) {
        $selector.empty();
        var defer = Q.defer();
        var _this = this;
        this._model.showPicturesByCategory(category)
            .then(function (data) {
                app.picturesView.load(data, $selector, _this._commentController);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    PictureController.prototype.uploadPicture = function (file, title, caption, category, ownerName) {
        var defer = Q.defer();
        var _this = this;

        this._model._requester.uploadPicture(file)
            .then(function (data) {
                _this._model._requester.createPictureRepo(data, title, caption, category, ownerName)
                    .then(function (data) {
                        defer.resolve(data);
                    }, function (err) {
                        console.log(err);
                        defer.reject(err);
                    })
            }, function (err) {
                console.error(err.responseText)
            });

        return defer.promise;
    };

    PictureController.prototype.renderUploadPage = function (selector) {
        app.uploadView.loadUploadPage(selector, this);
    };

    PictureController.prototype.renderCategoryPage = function (selector) {
        app.categoryView.loadCategoryView(selector, this);
    };

    return {
        load: function (model, commentController) {
            return new PictureController(model, commentController);
        }
    }
}());
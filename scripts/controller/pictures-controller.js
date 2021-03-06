var app = app || {};

app.pictureController = (function () {
    function PictureController(model, commentController, pictureRequester) {
        this._model = model;
        this._requester = pictureRequester;
        this._commentController = commentController;
    }

    PictureController.prototype.renderAllPictures = function (selector) {
        var _this = this;

        this._model.showAllPictures()
            .then(function (data) {
                app.picturesView.load(data, selector, _this._commentController, _this);
            }, function (err) {
                console.error(err)
            });
    };

    PictureController.prototype.renderTopTenPictures = function (selector) {
        var _this = this;

        this._model.showTopTenPictures()
            .then(function (data) {
                app.picturesView.load(data, selector, _this._commentController, _this);
            }, function (err) {
                console.error(err)
            });
    };

    PictureController.prototype.renderPicturesByCategory = function ($selector, category) {
        var defer = Q.defer(),
            _this = this;

        $selector.empty();

        this._model.showPicturesByCategory(category)
            .then(function (data) {
                app.picturesView.load(data, $selector, _this._commentController, _this);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    PictureController.prototype.uploadPicture = function (file, title, caption, category, ownerName) {
        var defer = Q.defer(),
            _this = this;

        this._model._requester.uploadPicture(file)
            .then(function (data) {
                _this._model._requester.createPictureRepo(data, title, caption, category, ownerName)
                    .then(function (data) {
                        defer.resolve(data);
                    }, function (err) {
                        defer.reject(err);
                    });
            }, function (err) {
                Noty.error(err.responseJSON.error);
            });

        return defer.promise;
    };

    PictureController.prototype.renderUploadPage = function (selector) {
        app.uploadView.loadUploadPage(selector, this);
    };

    PictureController.prototype.renderCategoryPage = function (selector) {
        app.categoryView.loadCategoryView(selector, this);
    };

    PictureController.prototype.updatePicture = function (userId, pictureId, votes) {
        return this._requester.updatePicture(userId, pictureId, votes)
    };

    PictureController.prototype.deletePicture = function (id) {
        return this._requester.deletePicture(id);
    };

    return {
        load: function (model, commentController, pictureRequester) {
            return new PictureController(model, commentController, pictureRequester);
        }
    }
}());
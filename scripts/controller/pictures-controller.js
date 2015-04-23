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
                app.picturesView.load(data, selector);
            }, function (err) {
                console.error(err)
            })
    };

    PictureController.prototype.renderPicturesByCategory = function (selector, category) {
        this._model.showPicturesByCategory(category)
            .then(function (data) {
                app.picturesView.load(data, selector);
            }, function (err) {
                console.error(err)
            })
    };

    return {
        load: function (model, commentController) {
            return new PictureController(model, commentController);
        }
    }

}());
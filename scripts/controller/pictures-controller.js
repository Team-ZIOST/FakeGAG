var app = app || {};

app.pictureController = (function () {
    function PictureController(model) {
        this._model = model;
    }

    PictureController.prototype.renderAllPictures = function (selector) {
        this._model.showAllPictures()
            .then(function (data) {
                app.picturesView.load(data, selector);
            }, function (err) {
                console.error(err)
            })
    };

    PictureController.prototype.renderTopTenPictures = function (selector) {
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
        load: function (model) {
            return new PictureController(model);
        }
    }

}());
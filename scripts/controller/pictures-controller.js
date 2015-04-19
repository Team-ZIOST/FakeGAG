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

    return {
        load: function (model) {
            return new PictureController(model);
        }
    }

}());
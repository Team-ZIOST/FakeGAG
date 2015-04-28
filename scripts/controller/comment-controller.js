var app = app || {};

app.commentController = (function () {
    function CommentController(model) {
        this._model = model;
    }

    CommentController.prototype.addComment = function (comment, id) {
        var defer = Q.defer();
        var _this = this;

        this._model.addComment(comment, id)
            .then(function (data) {
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    CommentController.prototype.getComments = function (id, $selector) {
        var defer = Q.defer();
        var _this = this;

        this._model.getComments(id, $selector)
            .then(function (data) {
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    CommentController.prototype.deleteComment = function (id) {
        var defer = Q.defer();
        this._model.deleteComment(id)
            .then(function (data) {
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    CommentController.prototype.editComment = function (id, data) {
        var defer = Q.defer();
        this._model.editComment(id, data)
            .then(function (data) {
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    return {
        load: function (model) {
            return new CommentController(model)
        }
    }
}());
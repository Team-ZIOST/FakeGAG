var app = app || {};

app.commentController = (function () {
    function CommentController(model) {
        this._model = model;
    }

    CommentController.prototype.addComment = function (comment, id) {
        //console.log(comment); //commentContent
        //console.log(id); //picture ID
        var defer = Q.defer();
        var _this = this;

        this._model.addComment(comment, id)
            .then(function (data) {
                defer.resolve(data);
                //var comment = {};
                //comment.results = [];
                //var commentData = {}
                //commentData.objectId = id;
                //commentData.content = asd;
                //commentData.author  ={};
                //commentData.author.username = sessionStorage.username;
                //console.log(comment);

                // app.commentView.renderComments(comment,  selector, _this)
                //console.log(data)
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
                //console.log(data);
                defer.resolve(data);
                //app.commentView.renderComments(data,  $selector, _this)
            }, function (err) {
                defer.reject(err)
                console.log(err.responseText);
            });

        return defer.promise;
    };

    CommentController.prototype.deleteComment = function (id) {
        var defer = Q.defer();
        this._model.deleteComment(id)
            .then(function (data) {
                //console.log('deleted comment');
                defer.resolve(data);
            }, function (err) {

                defer.reject(err);
                console.log(err.responseText);
            });

        return defer.promise;
    };

    CommentController.prototype.editComment = function (id, data) {
        var defer = Q.defer();
        this._model.editComment(id, data)
            .then(function (data) {
                //console.log(data);
                //console.log('edited');
                defer.resolve(data);
            }, function (err) {
                //console.log(err.responseText);
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
var app = app || {};

app.commentController = (function(){
    //$(document).ready(function(){
    //    $('#add-comment').click(setComment);
    //    $('#get-comment').click(getComment);
    //    $('#delete-comment').click(deleteComment);
    //
    //});

    function CommentController(model) {
        this._model = model;
    }

    CommentController.prototype.addComment = function ($selector) {
        this._model.addComment($selector);
    };

    CommentController.prototype.getComments = function ($selector) {
        this._model.getComments($selector);
    };

    CommentController.prototype.deleteComment = function ($selector) {
        this._model.deleteComment($selector);
    };

    return {
        load: function (model) {
            return new CommentController(model)
        }
    }
}());
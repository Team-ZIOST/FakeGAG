var app = app || {};

app.commentController = (function(){

    function CommentController(model) {
        this._model = model;
    }

    CommentController.prototype.addComment = function (comment, id) {
        this._model.addComment(comment, id);
    };

    CommentController.prototype.getComments = function (id, $selector) {
        var _this = this;
        this._model.getComments(id, $selector)
            .then(function(data){

                app.commentView.renderComments(data,  $selector, _this)
            }, function(err){
               console.log(err.responseText);
            });
    };

    CommentController.prototype.deleteComment = function (id) {
        this._model.deleteComment(id)
            .then(function(data){
                console.log('deleted comment');
            }, function(err){
                console.log(err.responseText);
            })
    };


    CommentController.prototype.editComment = function(id, data){
        this._model.editComment(id, data)
            .then(function(data){
                console.log('edited');
            }, function(err){
                console.log(err.responseText);
            })
    };

    return {
        load: function (model) {
            return new CommentController(model)
        }
    }
}());
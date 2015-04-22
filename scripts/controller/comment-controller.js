var app = app || {};

app.commentController = (function(){
    //$(document).ready(function(){
    //    $('#add-comment').click(setComment);
    //    $('#get-comment').click(getComment);
    //    $('#delete-comment').click(deleteComment);
    //
    //});

    function setComment(selecotor, id){
        var $comment = $(selecotor).val();
        app.commentModel.setComment($comment, id);

    }
    function getComment(id, selector){
        app.commentModel.getComment(id, selector);
    }
    function deleteComment(id){
        var id = id;
        app.commentController.deleteComment(id);
    }
    return {
        setComment: setComment,
        getComment: getComment
    }
}());
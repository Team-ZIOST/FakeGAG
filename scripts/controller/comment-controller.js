var app = app || {};

app.controller.comment = (function(){
    //$(document).ready(function(){
    //    $('#add-comment').click(setComment);
    //    $('#get-comment').click(getComment);
    //    $('#delete-comment').click(deleteComment);
    //
    //});

    function setComment(selecotor, id){
        var $comment = $(selecotor).val();
        app.modells.comment.setComment($comment, id);

    }
    function getComment(id, selector){
        app.modells.comment.getComment(id, selector);
    }
    function deleteComment(id){
        var id = id;
        app.modells.comment.deleteComment(id);
    }
    return {
        setComment: setComment,
        getComment: getComment
    }
}());
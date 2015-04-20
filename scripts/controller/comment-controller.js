var app = app || {};

app.controller.comment = (function(){
    $(document).ready(function(){
        $('#add-comment').click(setComment);
        $('#get-comment').click(getComment);
        $('#delete-comment').click(deleteComment);

    })

    function setComment(){
        var $comment = $('#comment').val();
        app.modells.comment.setComment($comment);

    }
    function getComment(){
        app.modells.comment.getComment();
    }
    function deleteComment(){
        var id = '5RC60qgsEr';
        app.modells.comment.deleteComment(id);
    }
    return {
        setComment: setComment
    }
}())
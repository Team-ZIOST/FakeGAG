var app = app || {};

app.controller.comment = (function(){
    $(document).ready(function(){
        $('#add-comment').click(setComment);
        $('#get-comment').click(getComment);

    })

    function setComment(){
        var $comment = $('#comment').val();
        app.modells.comment.setComment($comment);

    }
    function getComment(){

        app.modells.comment.getComment();

    }
    return {
        setComment: setComment
    }
}())
var app = app || {};

app.commentView = (function () {

    function RenderComments(commentId, commentContent, authorName, container, commentController, authorId) {
        this._commentController = commentController;
        var containerId = container;
        console.log(containerId);
        var $commentContainer = $('<div>');
        var _this = this;

        var $commentDiv = $('<div>');
        $commentDiv.attr('id', commentId);
        var $commentText = $('<p>').text(commentContent);
        //$commentDiv.attr('id', comment.objectId);
        var $postedBy = $('<p>').text(authorName);
        $commentDiv.append($commentText);
        $commentDiv.append($('<p>').text('Posted by: '));
        $commentDiv.append($postedBy);
        $commentContainer.append($commentDiv);

        var $commentDeleteButton = $('<button class="commentDelete">').text('Delete');
        var $commentEditButton = $('<button class="commentEdit">').text('Edit');


        $commentDeleteButton.click(function () {
            _this._commentController.deleteComment(commentId)
                .then(function (data) {
                    $('#' + commentId).remove();
                }, function (err) {
                    console.log(err.responseText);
                })

        });

        $commentEditButton.click(function () {
            if ($('#id' + containerId).length === 0) {
                var $editInput = $('<input  type="text">');
                $editInput.attr('id', 'id' + containerId)
                $commentDiv.append($editInput);
                var $confirmButton = $('<button>').text('Confirm');
                $commentDiv.append($confirmButton);
            }

            $confirmButton.click(function () {
                var newComment = $editInput.val();
                _this._commentController.editComment(commentId, newComment)
                    .then(function (data) {
                        $('#' + commentId).find('p').first().text(newComment);
                        $confirmButton.remove();
                        $editInput.remove();
                    }, function (err) {
                        console.log(err.responseText);
                    })
            })
        });

        //autor id : data.results.author.objectId\
        if (sessionStorage['userId'] === authorId || sessionStorage['userType'] === 'Administrators') {
            $commentDiv.append($commentDeleteButton);
            $commentDiv.append($commentEditButton);
        }
        console.log('added');
        $('#' + containerId).append($commentContainer)
    }


    return {
        renderComments: RenderComments
    }

}());

var app = app || {};

app.commentView = (function () {

    function RenderComments(commentId, commentContent, authorName, container, commentController, authorId) {

        var containerId = container;
       // var $commentContainer = $('<div>');
        var _this = this;

        var $commentDiv = $('<div>').attr('id', commentId);
        var $commentText = $('<p>').text(commentContent);
        var $postedBy = $('<p>').text(authorName);

        this._commentController = commentController;

        $commentDiv.append($commentText)
            .append($('<p>').text('Posted by: '))
            .append($postedBy);
        //   .append($commentContainer);

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
                if (!newComment) {
                    Noty.error('Please enter the new comment!');

                } else {
                    _this._commentController.editComment(commentId, newComment)
                        .then(function (data) {
                            $('#' + commentId).find('p').first().text(newComment);
                            $confirmButton.remove();
                            $editInput.remove();
                        }, function (err) {
                            console.log(err.responseText);
                        })
                }
            })
        });

        //autor id : data.results.author.objectId\
        if (sessionStorage['userId'] === authorId || sessionStorage['userType'] === 'Administrators') {
            $commentDiv.append($commentDeleteButton);
            $commentDiv.append($commentEditButton);
        }


        // var $pictureContainer = $('#' + containerId);
        var $pictureContainer = $('#' + containerId);
        //$commentContainer.append($commentDiv);
        $pictureContainer.append($commentDiv);
    }


    return {
        renderComments: RenderComments
    }

}());
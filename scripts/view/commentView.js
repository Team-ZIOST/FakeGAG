var app = app || {};

app.commentView = (function () {
    function RenderComments(commentId, commentContent, authorName, container, commentController, authorId) {
        if ($('#' + commentId).length === 0) {
            var containerId = container,
                _this = this,
                $commentDiv = $('<div class="bottomBorder">')
                    .attr('id', commentId),
                $commentText = $('<p class="commentContent">')
                    .text(commentContent),
                $postedBy = $('<p>')
                    .text(authorName),
                $commentDeleteButton,
                $commentEditButton;

            this._commentController = commentController;

            $commentDiv.append($commentText)
                .append($('<p>')
                    .text('Posted by: '))
                .append($postedBy);

            $commentDeleteButton = $('<button class="commentDelete btn btn-default btn-sm">')
                .text('Delete');
            $commentEditButton = $('<button class="commentEdit btn btn-default btn-sm">')
                .text('Edit');

            $commentDeleteButton.click(function () {
                _this._commentController.deleteComment(commentId)
                    .then(function () {
                        $('#' + commentId).remove();
                    }, function (err) {
                        console.error(err.responseText);
                    })
            });

            $commentEditButton.click(function () {
                if ($('#id' + containerId).length === 0) {
                    var $editInput = $('<input  type="text">'),
                        $confirmButton = $('<button class="btn btn-default btn-sm">').text('Confirm');
                    ;

                    $editInput.attr('id', 'id' + containerId);
                    $commentDiv.append($editInput);
                    $commentDiv.append($confirmButton);
                }

                $confirmButton.click(function () {
                    var newComment = $editInput.val();

                    if (!newComment) {
                        Noty.error('Please enter the new comment!');
                    } else {
                        _this._commentController.editComment(commentId, newComment)
                            .then(function (data) {
                                $('#' + commentId).find('p')
                                    .first()
                                    .text(newComment);

                                $confirmButton.remove();
                                $editInput.remove();
                            }, function (err) {
                                console.error(err.responseText);
                            });
                    }
                });
            });

            if (sessionStorage['userId'] === authorId || sessionStorage['userType'] === 'Administrators') {
                $commentDiv.append($commentDeleteButton);
                $commentDiv.append($commentEditButton);
            }

            $('#' + containerId).append($commentDiv);
        }
    }

    return {
        renderComments: RenderComments
    }
}());
var app = app || {};

app.commentView = (function () {
    function RenderComments(data, container, commentController) {
        this._commentController = commentController;
        var $commentContainer = $('<div>');
        var _this = this;
        data.results.forEach(function (comment) {
            var $commentDiv = $('<div>');
            $commentDiv.attr('id', comment.objectId);
            var $commentText = $('<p>').text(comment.content);
            $commentDiv.attr('id', comment.objectId);
            var $postedBy = $('<p>').text(comment.author.username);
            $commentDiv.append($commentText);
            $commentDiv.append($('<p>').text('Posted by: '));
            $commentDiv.append($postedBy);
            $commentContainer.append($commentDiv);

            var $commentDeleteButton = $('<button class="commentDelete">').text('Delete');
            var $commentEditButton = $('<button class="commentEdit">').text('Edit');


            $commentDeleteButton.click(function () {
                _this._commentController.deleteComment(comment.objectId);

            });

            $commentEditButton.click(function () {
                var $editInput = $('<input type="text">');
                $commentDiv.append($editInput);
                var $confirmButton = $('<button>').text('Confirm');
                $commentDiv.append($confirmButton);
                $confirmButton.click(function () {
                    _this._commentController.editComment(comment.objectId, $editInput.val());
                })

            });
            //  console.log(comment)
            //autor id : data.results.author.objectId\
            if (sessionStorage['userId'] === comment.author.objectId || sessionStorage['userType'] === 'Administrators') {
                $commentDiv.append($commentDeleteButton);
                $commentDiv.append($commentEditButton);
            }
        });
        container.append($commentContainer)
    }


    return {
        renderComments: RenderComments
        //delete comment
        //edit comment
    }

}());

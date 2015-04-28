var app = app || {};

app.picturesView = (function () {
    function PicturesView(data, selector, commentController, pictureController) {
        this._commentController = commentController;
        this._pictureController = pictureController;
        selector.empty();

        var _this = this;

        data.forEach(function (pictureData) {
            var $image = $('<img class="image" src="' + pictureData._pictureURL + '">');
            var $postedBy = $('<p class="postedBy">').text('Posted by: ' + pictureData._ownerName);
            var $download = $('<a class="download" href="' + pictureData._pictureURL + '" download>Download' + '</a>');
            var $pictureTitle = $('<h3 class="pictureTitle">').text(pictureData._title);
            var $pictureDescription = $('<h3 class="pictureDescription">').text(pictureData._caption);
            var $removeImageButton = $('<button class="removeButton btn btn-default btn-sm">').text("Remove");
            var $imageDivContainer = $('<div class="imageContainer">').attr('id', pictureData._objectId);
            var $commentTextArea = $('<textarea id="comment">').attr('placeholder', 'Comment...');
            var $addCommentButton = $('<button id="add-comment" class="btn btn-default btn-sm">').text('Add Commment');
            var $getCommentButton = $('<button id="get-comment" class="btn btn-default btn-sm">').text('Show Comments').attr('data-id', pictureData._objectId);
            var $voteUpButton = $('<button class="btn btn-default btn-sm">').html('<i class="fa fa-thumbs-o-up"></i>');
            var $voteDownButton = $('<button class="btn btn-default btn-sm">').html('<i class="fa fa-thumbs-o-down"></i>');
            var $deleteCommentButton = $('<button class="btn btn-default btn-sm">').text('Delete Comment');
            var $voteCount = $('<div class="rating">');

            $voteCount.text('Rating: ' + pictureData._votes);

            $voteUpButton.click(function () {
                if (!pictureData._voters.length || pictureData._voters.indexOf(sessionStorage.loggedUserId) == -1) {
                    pictureData._voters.push(sessionStorage.loggedUserId);

                    _this._pictureController.updatePicture(sessionStorage.loggedUserId, pictureData._objectId, ++pictureData._votes)
                        .then(function () {
                            $voteCount.text('Rating: ' + pictureData._votes);
                        });
                }
            });

            $voteDownButton.click(function () {
                if (!pictureData._voters.length || pictureData._voters.indexOf(sessionStorage.loggedUserId) == -1) {
                    pictureData._voters.push(sessionStorage.loggedUserId);

                    _this._pictureController.updatePicture(sessionStorage.loggedUserId, pictureData._objectId, --pictureData._votes)
                        .then(function () {
                            $voteCount.text('Rating: ' + pictureData._votes);
                        });
                }
            });

            $deleteCommentButton.click(function () {
                var id;
                _this._commentController.deleteComment(id)
            });

            $removeImageButton.click(function () {
                var id = $(this).parent().attr('id');
                _this._pictureController.deletePicture(id)
                    .then(function (data) {
                        $("#" + id).remove();
                    }, function (error) {
                        console.log(error.responseText)
                    });

            });

            $addCommentButton.click(function () {
                var commentContent = $commentTextArea.val();

                if (!commentContent) {
                    Noty.error('Comment cannot be empty!')

                } else {

                    var id = $(this).parent().attr('id');
                    _this._commentController.addComment(commentContent, id, selector)
                        .then(function (data) {
                            var commentId = data.objectId;
                            var authorName = sessionStorage['username'];
                            var authorId = sessionStorage['userId'];
                            app.commentView.renderComments(commentId, commentContent,
                                authorName, id, _this._commentController, authorId);
                        }, function (err) {
                            console.log(err.responseText)
                        });
                }
            });

            $getCommentButton.click(function () {

                _this._commentController.getComments($(this).attr('data-id'))

                    //todo create new div and then
                    .then(function (data) {
                        console.log(data)
                        //if (data.results.length === 0) {
                        //    Noty.error('There are no comments');
                        //}
                        //else {

                        var $commentsContainer = $('<div>');
                        //  $
                        var containerId = 'cont' + data.results[0].objectId;
                        $commentsContainer.attr('id', containerId);
                        data.results.forEach(function (comment) {
                            console.log(comment);
                            $imageDivContainer.append($commentsContainer);

                            //app.commentView.renderComments(comment.objectId, comment.content,
                            //    comment.author.username, comment.photo.objectId, _this._commentController, comment.author.objectId);
                            app.commentView.renderComments(comment.objectId, comment.content,
                                comment.author.username, containerId, _this._commentController, comment.author.objectId);



                        });

                        var $hideButton = $('<button class="btn btn-default btn-sm">Hide Comments</button>');
                        $hideButton.click(function () {
                             $(this).prev().remove();
                        });

                        $imageDivContainer.append($hideButton);
                        //}
                    }, function (error) {
                        console.error(error.responseText)
                    })
            });

            $imageDivContainer.append($pictureTitle)
                .append($image)
                .append($download)
                .append($voteCount)
                .append($pictureDescription)
                .append($postedBy)
                .append($getCommentButton);

            if (sessionStorage['userId']) {
                $imageDivContainer.append($commentTextArea)
                    .append($voteUpButton)
                    .append($voteDownButton)
                    .append($addCommentButton);
            }

            if (sessionStorage['userId'] === pictureData._owner || sessionStorage['userType'] === 'Administrators') {
                $imageDivContainer.append($removeImageButton);
            }

            selector.append($imageDivContainer);
        });
    }

    return {
        load: function (data, selector, commentController, pictureController) {
            return new PicturesView(data, selector, commentController, pictureController);
        }
    }
}());
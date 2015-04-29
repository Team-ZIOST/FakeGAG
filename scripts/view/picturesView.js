var app = app || {};

app.picturesView = (function () {
    function PicturesView(data, selector, commentController, pictureController) {
        var _this = this;

        this._commentController = commentController;
        this._pictureController = pictureController;
        selector.empty();

        data.forEach(function (pictureData) {
            var $image = $('<img class="image" src="' + pictureData._pictureURL + '">'),
                $postedBy = $('<p class="postedBy">')
                    .text('Posted by: ' + pictureData._ownerName),
                $download = $('<a class="download" href="' + pictureData._pictureURL + '" download>Download' + '</a>'),
                $pictureTitle = $('<h3 class="pictureTitle">')
                    .text(pictureData._title),
                $pictureDescription = $('<h3 class="pictureDescription">')
                    .text(pictureData._caption),
                $removeImageButton = $('<button class="removeButton btn btn-default btn-sm">')
                    .text("Remove"),
                $imageDivContainer = $('<div class="imageContainer">')
                    .attr('id', pictureData._objectId),
                $commentTextArea = $('<textarea id="comment">')
                    .attr('placeholder', 'Comment...'),
                $addCommentButton = $('<button id="add-comment" class="btn btn-default btn-sm">')
                    .text('Add Commment'),
                $getCommentButton = $('<button id="get-comment" class="btn btn-default btn-sm">')
                    .text('Show Comments')
                    .attr('data-id', pictureData._objectId),
                $voteUpButton = $('<button class="btn btn-default btn-sm">')
                    .html('<i class="fa fa-thumbs-o-up"></i>'),
                $voteDownButton = $('<button class="btn btn-default btn-sm">')
                    .html('<i class="fa fa-thumbs-o-down"></i>'),
                $deleteCommentButton = $('<button class="btn btn-default btn-sm">')
                    .text('Delete Comment'),
                $voteCount = $('<div class="rating">');

            $voteCount.text('Rating: ' + pictureData._votes);

            $voteUpButton.click(function () {
                if (!pictureData._voters.length || pictureData._voters.indexOf(sessionStorage.loggedUserId) == -1) {
                    pictureData._voters.push(sessionStorage.loggedUserId);

                    _this._pictureController.updatePicture(sessionStorage.loggedUserId, pictureData._objectId, ++pictureData._votes)
                        .then(function () {
                            $voteCount.text('Rating: ' + pictureData._votes);
                        });
                } else {
                    Noty.error('You have already voted for this photo.');
                }
            });

            $voteDownButton.click(function () {
                if (!pictureData._voters.length || pictureData._voters.indexOf(sessionStorage.loggedUserId) == -1) {
                    pictureData._voters.push(sessionStorage.loggedUserId);

                    _this._pictureController.updatePicture(sessionStorage.loggedUserId, pictureData._objectId, --pictureData._votes)
                        .then(function () {
                            $voteCount.text('Rating: ' + pictureData._votes);
                        });
                } else {
                    Noty.error('You have already voted for this photo.');
                }
            });

            $deleteCommentButton.click(function () {
                var id;
                _this._commentController.deleteComment(id)
            });

            $removeImageButton.click(function () {
                var id = $(this).parent().attr('id');

                _this._pictureController.deletePicture(id)
                    .then(function () {
                        $("#" + id).remove();
                    }, function (error) {
                        console.log(error.responseText)
                    });
            });

            $addCommentButton.click(function () {
                var commentContent = $commentTextArea.val();

                if (!commentContent) {
                    Noty.error('Comment cannot be empty!');
                } else {
                    var id = $(this).parent().attr('id');

                    _this._commentController.addComment(commentContent, id, selector)
                        .then(function (data) {
                            var commentId = data.objectId,
                                authorName = sessionStorage['username'],
                                authorId = sessionStorage['userId'];

                            app.commentView.renderComments(commentId, commentContent,
                                authorName, id, _this._commentController, authorId);
                        }, function (err) {
                            console.error(err.responseText);
                        });
                }
            });

            $getCommentButton.click(function () {
                _this._commentController.getComments($(this).attr('data-id'))
                    .then(function (data) {
                        var $commentsContainer,
                            containerId,
                            $hideButton;

                        if (data.results.length === 0) {
                            Noty.error('There are no comments');
                        } else {
                            $commentsContainer = $('<div>');
                            containerId = 'cont' + data.results[0].objectId;
                            $commentsContainer.attr('id', containerId);
                            $commentsContainer.empty();

                            data.results.forEach(function (comment) {
                                $imageDivContainer.append($commentsContainer);

                                app.commentView.renderComments(
                                    comment.objectId,
                                    comment.content,
                                    comment.author.username,
                                    containerId,
                                    _this._commentController,
                                    comment.author.objectId);
                            });

                            $hideButton = $('<button class="btn btn-default btn-sm">Hide Comments</button>')
                                .attr('id', containerId + 'btn')
                                .click(function () {
                                    $(this).prev().remove();
                                    $(this).remove();
                                });

                            if ($('#' + containerId + 'btn').length === 0) {
                                $imageDivContainer.append($hideButton);
                            }
                        }
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
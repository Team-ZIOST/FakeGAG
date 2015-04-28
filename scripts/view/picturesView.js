var app = app || {};

app.picturesView = (function () {
    function PicturesView(data, selector, commentController) {
        this._commentController = commentController;
        selector.empty();

        // TODO switch with controller
        this._requester = app.pictureRequster.load(app.constants.BASE_URL);
        var _this = this;

        data.forEach(function (pictureData) {
            var $image = $('<img class="image" src="' + pictureData._pictureURL + '">');
            var $postedBy = $('<p class="postedBy">').text('Posted by: ' + pictureData._ownerName);
            var $download = $('<a class="download" href="' + pictureData._pictureURL + '" download>Download' + '</a>');
            var $pictureTitle = $('<h1 class="pictureTitle">').text(pictureData._title);
            var $pictureDescription = $('<h2 class="pictureDescription">').text(pictureData._caption);
            var $removeImageButton = $('<button class="removeButton btn btn-default btn-sm">').text("Remove");
            var $imageDivContainer = $('<div class="imageContainer">').attr('id', pictureData._objectId);
            var $commentTextArea = $('<textarea id="comment">').text('Comment...');
            var $addCommentButton = $('<button id="add-comment" class="btn btn-default btn-sm">').text('Add Commment');
            var $getCommentButton = $('<button id="get-comment" class="btn btn-default btn-sm">').text('Show Comments');
            var $voteUpButton = $('<button class="btn btn-default btn-sm">').text('+');
            var $voteDownButton = $('<button class="btn btn-default btn-sm">').text('-');
            var $deleteCommentButton = $('<button class="btn btn-default btn-sm">').text('Delete Comment');
            var $voteCount = $('<span class="rating">');

            $voteCount.text('Rating: ' + pictureData._votes);

            $voteUpButton.click(function () {
                if (!pictureData._voters.length || pictureData._voters.indexOf(sessionStorage.loggedUserId) == -1) {
                    pictureData._voters.push(sessionStorage.loggedUserId);

                    _this._requester.updatePicture(sessionStorage.loggedUserId, pictureData._objectId, ++pictureData._votes)
                        .then(function () {
                            $voteCount.text('Rating: ' + pictureData._votes);
                        });
                }
            });

            $voteDownButton.click(function () {
                if (!pictureData._voters.length || pictureData._voters.indexOf(sessionStorage.loggedUserId) == -1) {
                    pictureData._voters.push(sessionStorage.loggedUserId);

                    _this._requester.updatePicture(sessionStorage.loggedUserId, pictureData._objectId, --pictureData._votes)
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
                _this._requester.deletePicture(id);
                $("#" + id).remove();
            });

            $addCommentButton.click(function () {
                var commentContent = $commentTextArea.val();
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
            });

            $imageDivContainer.append($pictureTitle)
                .append($image)
                .append($voteCount)
                .append($pictureDescription)
                .append($postedBy)
                .append($download);

            if (sessionStorage['userId']) {
                $imageDivContainer.append($commentTextArea)
                    .append($voteUpButton)
                    .append($voteDownButton)
                    .append($addCommentButton)
                    .append($getCommentButton);
            }

            if (sessionStorage['userId'] === pictureData._owner || sessionStorage['userType'] === 'Administrators') {
                $imageDivContainer.append($removeImageButton);
            }

            _this._commentController.getComments(pictureData._objectId, $imageDivContainer)
                .then(function (data) {
                    console.log(data);
                    data.results.forEach(function (comment) {
                        app.commentView.renderComments(comment.objectId, comment.content,
                            comment.author.username, pictureData['_objectId'],
                            _this._commentController, comment.author.objectId);
                    })

                }, function (err) {
                    console.log(err)
                });

            selector.append($imageDivContainer);
        });
    }

    return {
        load: function (data, selector, commentController) {
            return new PicturesView(data, selector, commentController);
        }
    }
}());
var app = app || {};

app.picturesView = (function () {
    function PicturesView(data, selector, commentController) {
        this._commentController = commentController;
        selector.empty();
        this._requester = app.pictureRequster.load(app.constants.BASE_URL);
        var _this = this;
        data.forEach(function (pictureData) {
            console.log(pictureData);
            //var imageId = pictureData._objectId;
            var $image = $('<img class="image" src="' + pictureData._pictureURL + '">');
            var $postedBy = $('<p class="postedBy">').text('Posted by: ' + pictureData._ownerName);
            var $download = $('<a href="' + pictureData._pictureURL + '" download>Download' + '</a>');
            var $pictureTitle = $('<h1 class="pictureTitle">').text(pictureData._title);
            var $pictureDescription = $('<h2 class="pictureDescription">').text(pictureData._caption);
            var $removeImageButton = $('<button class="removeButton">').text("Remove");
            var $imageDivContainer = $('<div class="imageContainer">').attr('id', pictureData._objectId);
            var $commentTextArea = $('<textarea id="comment">').text('Comment...');
            var $addCommentButton = $('<button id="add-comment">').text('Add Commment');
            var $getCommentButton = $('<button id="get-comment">').text('Show Comments');
            var $voteUpButton = $('<button>').text('+');
            var $voteDownButton = $('<button>').text('-');
            var $deleteCommentButton = $('<button>').text('Delete Comment');
            var $voteCount = $('<span>').text('Rating: ' + pictureData._votes);

            $voteUpButton.click(function () {
                _this._requester.updatePicture(++pictureData._votes, pictureData._objectId);

                var votes = pictureData._votes;

                $voteCount.text('Rating: ' + votes);
            });

            $voteDownButton.click(function () {
                _this._requester.updatePicture(--pictureData._votes, pictureData._objectId);

                var votes = pictureData._votes;

                $voteCount.text('Rating: ' + votes);
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
                        //console.log(data);
                        var commentId = data.objectId;
                        var authorName = sessionStorage['username'];
                        var authorId = sessionStorage['userId'];
                        app.commentView.renderComments(commentId, commentContent,
                            authorName, id, _this._commentController, authorId);
                    }, function (err) {
                        console.log(err.responseText)
                    })

            });

            $imageDivContainer.append($pictureTitle);
            $imageDivContainer.append($image);
            $imageDivContainer.append($voteCount);
            $imageDivContainer.append($pictureDescription);
            $imageDivContainer.append($postedBy);
            $imageDivContainer.append($download);

            $imageDivContainer.append($voteUpButton);
            $imageDivContainer.append($voteDownButton);

            if (sessionStorage['userId']) {
                $imageDivContainer.append($commentTextArea)
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

            $(selector).append($imageDivContainer);

        })
    }

    return {
        load: function (data, selector, commentController) {
            return new PicturesView(data, selector, commentController);
        }
    }

}());
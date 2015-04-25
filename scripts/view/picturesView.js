var app = app || {};

app.picturesView = (function () {
    function PicturesView(data, selector, commentController) {
        this._commentController = commentController;
        selector.empty();
        this._requester = app.pictureRequster.load(app.constants.BASE_URL);
        var _this = this;
        data.forEach(function (pictureData) {
            console.log(pictureData);
            ////todo get the selector form sammy
            ////todo put the delete button only for admins or users
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
            var $deleteCommentButton = $('<button>').text('Delete Comment');

            $deleteCommentButton.click(function(){
                var id;
               _this._commentController.deleteComment(id)


            });
            //var $commentContainer = $('<div class="commentContainer">');
            $removeImageButton.click(function () {
                var id = $(this).parent().attr('id');

                _this._requester.deletePicture(id);
                $("#" + id).remove();
            });

            $addCommentButton.click(function () {
                var id = $(this).parent().attr('id');
                _this._commentController.addComment($commentTextArea.val(), id);

            });

            $imageDivContainer.append($pictureTitle);
            $imageDivContainer.append($image);
            $imageDivContainer.append($pictureDescription);
            $imageDivContainer.append($postedBy);
            $imageDivContainer.append($download);

            if (sessionStorage['userId']) {
                $imageDivContainer.append($commentTextArea)
                    .append($addCommentButton)
                    .append($getCommentButton);
            }


            //todo check this for bugs
            if (sessionStorage['userId'] === pictureData._owner || sessionStorage['userType'] === 'Administrators') {
                $imageDivContainer.append($removeImageButton)
            }

            _this._commentController.getComments(pictureData._objectId, $imageDivContainer);

            $(selector).append($imageDivContainer);
        })
    }

    return {
        load: function (data, selector, commentController) {
            return new PicturesView(data, selector, commentController);
        }
    }
}());
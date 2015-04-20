var app = app || {};

app.picturesView = (function () {
    function picturesView(data, selector) {
        selector.empty();
        this._requester = app.pictureRequster.load(app.constants.BASE_URL);
        var _this = this;
        data.forEach(function (pictureData) {
            console.log(pictureData)
            ////todo get the selector form sammy
            ////todo put the delete button only for admins or users
            var $image = $('<img class="image" src="' + pictureData._pictureURL + '">');
            var $removeImageButton = $('<button class="removeButton">').text("Remove");
            var $imageDivContainer = $('<div class="imageContainer">').attr('id', pictureData._objectId);
            var $commentTextArea = $('<textarea id="comment">').text('Comment...');
            var $addCommentButton = $('<button id="add-comment">').text('Add Commment');
            var $getCommentButton = $('<button id="get-comment">').text('Show Comments');


                //.success(function (data) {
                //    console.log(data)
                //});
                //.success(function (commentData) {
                //
                //
                //}, function(err){console.log(err)});

            $removeImageButton.click(function () {
                var id = $(this).parent().attr('id');

                _this._requester.deletePicture(id);
                $("#" + id).remove();
            });

            $addCommentButton.click(function () {
                var id = $(this).parent().attr('id');
                console.log('sad');
                app.controller.comment.setComment($commentTextArea, id);

            });

            $imageDivContainer.append($image);

            if (sessionStorage['userId']) {
                $imageDivContainer.append($removeImageButton)
                    .append($commentTextArea)
                    .append($addCommentButton)
                    .append($getCommentButton);
            }
            app.controller.comment.getComment(pictureData._objectId, $imageDivContainer);

            $(selector).append($imageDivContainer);

        })
    }

    return {
        load: function (data, selector) {
            return new picturesView(data, selector);
        }
    }
}());
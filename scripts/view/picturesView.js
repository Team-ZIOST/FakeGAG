var app = app || {};

app.picturesView = (function () {
    function picturesView(data, selector) {
        selector.empty();
        this._requester = app.pictureRequster.load(app.constants.BASE_URL);
        var _this = this;
        data.forEach(function (pictureData) {
            ////todo get the selector form sammy
            ////todo put the delete button only for admins or users
            var $image = $('<img class="image" src="' + pictureData._pictureURL + '">');
            var $removeImageButton = $('<button class="removeButton">').text("Remove");
            var $imageDivContainer = $('<div class="imageContainer">').attr('id', pictureData._objectId);
            $removeImageButton.click(function () {
                var id = $(this).parent().attr('id');

                _this._requester.deletePicture(id);
                $("#" + id).remove();
            });

            $imageDivContainer.append($image).append($removeImageButton);
            $(selector).append($imageDivContainer);

        })
    }

    return {
        load: function (data, selector) {
            return new picturesView(data, selector);
        }
    }
}());
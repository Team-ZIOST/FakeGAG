var app = app || {};

app.pictureRepoModel = (function () {
    function PictureRepoModel(baseUrl) {
        this._requester = app.pictureRequster.load(baseUrl);
        this.pictureRepo = [];
    }

    PictureRepoModel.prototype.showAllPictures = function () {
        //var defer = Q.defer();
        var _this = this;
        this.pictureRepo.length = 0;
        this._requester.getPictures()
            .then(function (data) {
                console.log(data)
                data.results.forEach(function (pictureData) {
                    //console.log(pictureData);
                    var title = pictureData.title;
                    var caption = pictureData.caption;
                    var pictureUrl = pictureData.picture.url;
                    //todo this fields
                    var category = 'none';
                    var owner = 'owner';
                    var objectId = pictureData.objectId;
                    var votes = pictureData.votes;
                    var picture = new Picture(objectId, title, caption, pictureUrl, votes, category, owner);
                    console.log(picture);
                    _this.pictureRepo.push(picture);
                });
                //defer.resolve(_this.studentRepo);
            }, function (error) {
                //defer.reject(error)
            });

        //return deffer.promise;
    };

    //function showPictures(data) {
    //    data.results.forEach(function (pictureData) {
    //        console.log(pictureData.picture.url);
    //        //todo get the selector form sammy
    //        //todo put the delete button only for admins or users
    //        var $image = $('<img class="image" src="' + pictureData.picture.url + '">');
    //        var $removeImageButton = $('<button class="removeButton">').text("Remove");
    //        var $imageDivContainer  =  $('<div class="imageContainer">').attr('id', pictureData.objectId);
    //        $removeImageButton.click(function(){
    //            var id =$(this).parent().attr('id');
    //            picRequester.deletePicture(id);
    //            $("#"+id).remove();
    //
    //        });
    //        $imageDivContainer.append($image).append($removeImageButton);
    //        $('#wrapper').append($imageDivContainer);
    //    })
    //
    //}

    return {
        load: function (baseURL) {
            return new PictureRepoModel(baseURL);
        }
    }


}());


var app = app || {};

app.pictureRepoModel = (function () {
    function PictureRepoModel(baseUrl) {
        this._requester = app.pictureRequster.load(baseUrl);
        this.pictureRepo = [];
    }

    PictureRepoModel.prototype.showAllPictures = function () {
        var defer = Q.defer();
        var _this = this;
        this.pictureRepo.length = 0;
        this._requester.getPictures()
            .then(function (data) {
                //console.log(data);
                data.results.forEach(function (pictureData) {
                    //console.log(pictureData);
                    var title = pictureData.title;
                    var caption = pictureData.caption;
                    var pictureUrl = pictureData.picture.url;
                    //todo this fields
                    var category = pictureData.picCategory;
                    //pointer owner
                    var owner = pictureData.owner.objectId;
                    var objectId = pictureData.objectId;
                    var votes = pictureData.votes;
                    var ownerName = pictureData.ownerName;
                    var picture = new Picture(objectId, title, caption, pictureUrl, votes, category, owner, ownerName);
                    //console.log(picture)
                    _this.pictureRepo.push(picture);
                });

                defer.resolve(_this.pictureRepo);

            }, function (error) {
                defer.reject(error)
            });

        return defer.promise;
    };

    PictureRepoModel.prototype.showTopTenPictures = function () {
        this.pictureRepo.length = 0;
        var _this = this;
        var defer = Q.defer();
        this._requester.getTopTenPictures()
            .then(function (data) {

                data.results.forEach(function (pictureData) {
                    var title = pictureData.title;
                    var caption = pictureData.caption;
                    var pictureUrl = pictureData.picture.url;
                    //todo this fields
                    var category = pictureData.picCategory;
                    //pointer owner
                    var owner = pictureData.owner.objectId;
                    var objectId = pictureData.objectId;
                    var votes = pictureData.votes;
                    var ownerName = pictureData.ownerName;
                    var picture = new Picture(objectId, title, caption, pictureUrl, votes, category, owner);
                    console.log(picture);
                    _this.pictureRepo.push(picture);
                });
                defer.resolve(_this.pictureRepo);
            }, function (error) {
                defer.reject(error)
            });

        return defer.promise;

    };

    PictureRepoModel.prototype.showPicturesByCategory = function (category) {
        this.pictureRepo.length = 0;
        var _this = this;
        var defer = Q.defer();
        this._requester.getPicturesByCategory(category)
            .then(function (data) {

                data.results.forEach(function (pictureData) {
                    console.log(pictureData);

                    var title = pictureData.title;
                    var caption = pictureData.caption;
                    var pictureUrl = pictureData.picture.url;
                    //todo this fields
                    var category = pictureData.picCategory;
                    //pointer owner
                    var owner = pictureData.owner.objectId;
                    var objectId = pictureData.objectId;
                    var votes = pictureData.votes;
                    var ownerName = pictureData.ownerName;
                    var picture = new Picture(objectId, title, caption, pictureUrl, votes, category, owner, ownerName);
                    //console.log(picture);
                    _this.pictureRepo.push(picture);
                });
                defer.resolve(_this.pictureRepo);
            }, function (error) {
                defer.reject(error)
            });

        return defer.promise;
    };


    return {
        load: function (baseURL) {
            return new PictureRepoModel(baseURL);
        }
    }
}());


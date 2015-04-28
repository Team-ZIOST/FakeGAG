var app = app || {};

app.pictureRepoModel = (function () {
    function PictureRepoModel(baseUrl) {
        this._requester = app.pictureRequster.load(baseUrl);
        this.pictureRepo = [];
    }

    PictureRepoModel.prototype.showAllPictures = function () {
        var defer = Q.defer(),
            _this = this;

        this.pictureRepo.length = 0;

        this._requester.getPictures()
            .then(function (data) {
                //console.log(data);
                data.results.forEach(function (pictureData) {
                    //console.log(pictureData)
                    var title = pictureData.title,
                        caption = pictureData.caption,
                        pictureUrl = pictureData.picture.url,
                        category = pictureData.picCategory,
                        owner = pictureData.owner.objectId,
                        objectId = pictureData.objectId,
                        votes = pictureData.votes ? pictureData.votes : 0,
                        voters = pictureData.voters ? pictureData.voters : [],
                        ownerName = pictureData.ownerName,
                        picture = new Picture(objectId, title, caption, pictureUrl, votes, voters, category, owner, ownerName);
                    //console.log(picture)
                    //pointer owner
                    //todo this fields
                    _this.pictureRepo.push(picture);
                });

                defer.resolve(_this.pictureRepo);
            }, function (error) {
                defer.reject(error)
            });

        return defer.promise;
    };

    PictureRepoModel.prototype.showTopTenPictures = function () {
        var _this = this,
            defer = Q.defer();

        this.pictureRepo.length = 0;

        this._requester.getTopTenPictures()
            .then(function (data) {
                //console.log(data);
                data.results.forEach(function (pictureData) {
                    //console.log(pictureData)
                    var title = pictureData.title,
                        caption = pictureData.caption,
                        pictureUrl = pictureData.picture.url,
                        category = pictureData.picCategory,
                        owner = pictureData.owner.objectId,
                        objectId = pictureData.objectId,
                        votes = pictureData.votes ? pictureData.votes : 0,
                        voters = pictureData.voters ? pictureData.voters : [],
                        ownerName = pictureData.ownerName,
                        picture = new Picture(objectId, title, caption, pictureUrl, votes, voters, category, owner, ownerName);

                    _this.pictureRepo.push(picture);
                });

                defer.resolve(_this.pictureRepo);
            }, function (error) {
                defer.reject(error)
            });

        return defer.promise;
    };

    PictureRepoModel.prototype.showPicturesByCategory = function (category) {
        var _this = this,
            defer = Q.defer();

        this.pictureRepo.length = 0;

        this._requester.getPicturesByCategory(category)
            .then(function (data) {
                data.results.forEach(function (pictureData) {
                    var title = pictureData.title,
                        caption = pictureData.caption,
                        pictureUrl = pictureData.picture.url,
                        category = pictureData.picCategory,
                        owner = pictureData.owner.objectId,
                        objectId = pictureData.objectId,
                        votes = pictureData.votes ? pictureData.votes : 0,
                        voters = pictureData.voters ? pictureData.voters : [],
                        ownerName = pictureData.ownerName,
                        picture = new Picture(objectId, title, caption, pictureUrl, votes, voters, category, owner, ownerName);

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
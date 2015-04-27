var app = app || {};

app.pictureRequster = (function () {
    function PictureRequester(baseURL) {
        this._baseURL = baseURL;
    }

    function getPictureHeaders() {
        var pictureHeaders = $.extend({}, app.constants.HEADERS);
        pictureHeaders['Content-Type'] = 'file.type';

        //todo
        //if (sessionStorage['logged-in']) {
        //    headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
        //}
        return pictureHeaders;
    }

    function getPictureRepoHeaders() {
        var picRepoHeaders = $.extend({}, app.constants.HEADERS);
        picRepoHeaders['Content-Type'] = 'application/json';

        //todo
        //if (sessionStorage['logged-in']) {
        //    headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
        //}
        return picRepoHeaders;
    }

    function makeRequest(method, headers, url, data) {
        var defer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
            url: url,
            data: data,
            processData: false,
            success: function (data) {
                defer.resolve(data);
            },
            error: function (error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

    //todo rename
    PictureRequester.prototype.uploadPicture = function (file) {
        //  console.log(file.name)
        var pictureUploadHeaders = getPictureHeaders();
        var url = this._baseURL + '/files/' + file.name;

        return makeRequest('POST', pictureUploadHeaders, url, file);
    };

    PictureRequester.prototype.updatePicture = function (voterId, pictureId, votes) {
        //  console.log(file.name)
        var pictureUploadHeaders = getPictureHeaders();
        var url = this._baseURL + 'classes/Photo/' + pictureId;

        var data = JSON.stringify({
            voters: {
                "__op" : "AddUnique",
                "objects": [voterId]
            },
            votes: votes
        });

        return makeRequest('PUT', pictureUploadHeaders, url, data);
    };


    PictureRequester.prototype.getPictures = function () {
        //todo  check if this url must be here
        var url = this._baseURL + 'classes/Photo';
        var pictureRepoHeaders = getPictureRepoHeaders();

        return makeRequest('GET', pictureRepoHeaders, url, null);
    };

    PictureRequester.prototype.getTopTenPictures = function () {
        var url = this._baseURL + 'classes/Photo?order=-votes&limit=10';
        var pictureRepoHeaders = getPictureRepoHeaders();

        return makeRequest('GET', pictureRepoHeaders, url, null);
    };

    PictureRequester.prototype.getPicturesByCategory = function (category) {
        //var url = this._baseURL + 'classes/Photo?where={"category":{"$select":{"query":{"className":"Category","where":{"name":"' + category + '"}},"key":"objectId"}}}';
        var url = this._baseURL + 'classes/Photo?where={"picCategory":"' + category + '"}';
        var pictureRepoHeaders = getPictureRepoHeaders();

        return makeRequest('GET', pictureRepoHeaders, url, null);
    };

    PictureRequester.prototype.deletePicture = function (id) {
        var url = this._baseURL + 'classes/Photo/' + id;
        var pictureRepoHeaders = getPictureHeaders();

        return makeRequest('DELETE', pictureRepoHeaders, url, null);
    };
//this._model._requester.createPictureRepo(data, title, caption, category)
    PictureRequester.prototype.createPictureRepo =
        function (data, title, caption, category, ownerName) {
            //todo
            //owner // title// votes(0) // caption //link - picture
            var picRepoHeaders = getPictureRepoHeaders();
            var classURL = this._baseURL + 'classes/Photo';
            var pictureName = data.name;
            var pictureData = {
                title: title,
                votes: 0,
                caption: caption,
                picCategory: category,
                ownerName: sessionStorage['username'],
                picture: {
                    "name": pictureName,
                    "__type": "File"
                },

                owner: {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": sessionStorage['userId']
                }
            };

            return makeRequest('POST', picRepoHeaders, classURL, JSON.stringify(pictureData));
        };

    return {
        load: function (baseURL) {
            return new PictureRequester(baseURL);
        }
    }
}());


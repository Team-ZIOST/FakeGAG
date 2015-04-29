var app = app || {};

app.pictureRequster = (function () {
    function PictureRequester(baseURL) {
        this._baseURL = baseURL;
    }

    function getPictureHeaders() {
        var pictureHeaders = $.extend({}, app.constants.HEADERS);
        pictureHeaders['Content-Type'] = 'file.type';

        return pictureHeaders;
    }

    function getPictureRepoHeaders() {
        var picRepoHeaders = $.extend({}, app.constants.HEADERS);
        picRepoHeaders['Content-Type'] = 'application/json';

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

    PictureRequester.prototype.uploadPicture = function (file) {
        var pictureUploadHeaders = getPictureHeaders(),
            url = this._baseURL + '/files/' + file.name;

        return makeRequest('POST', pictureUploadHeaders, url, file);
    };

    PictureRequester.prototype.updatePicture = function (voterId, pictureId, votes) {
        var pictureUploadHeaders = getPictureHeaders(),
            url = this._baseURL + 'classes/Photo/' + pictureId,
            data = JSON.stringify({
                voters: {
                    "__op": "AddUnique",
                    "objects": [voterId]
                },
                votes: votes
            });

        return makeRequest('PUT', pictureUploadHeaders, url, data);
    };


    PictureRequester.prototype.getPictures = function () {
        var url = this._baseURL + 'classes/Photo',
            pictureRepoHeaders = getPictureRepoHeaders();

        return makeRequest('GET', pictureRepoHeaders, url, null);
    };

    PictureRequester.prototype.getTopTenPictures = function () {
        var url = this._baseURL + 'classes/Photo?order=-votes&limit=10',
            pictureRepoHeaders = getPictureRepoHeaders();

        return makeRequest('GET', pictureRepoHeaders, url, null);
    };

    PictureRequester.prototype.getPicturesByCategory = function (category) {
        var url = this._baseURL + 'classes/Photo?where={"category":{"$select":{"query":{"className":"Category","where":{"name":"' + category + '"}},"key":"objectId"}}}',
            pictureRepoHeaders = getPictureRepoHeaders();

        return makeRequest('GET', pictureRepoHeaders, url, null);
    };

    PictureRequester.prototype.deletePicture = function (id) {
        var url = this._baseURL + 'classes/Photo/' + id,
            pictureRepoHeaders = getPictureHeaders();

        return makeRequest('DELETE', pictureRepoHeaders, url, null);
    };

    PictureRequester.prototype.createPictureRepo =
        function (data, title, caption, category) {
            var picRepoHeaders = getPictureRepoHeaders(),
                classURL = this._baseURL + 'classes/Photo',
                pictureName = data.name,
                pictureData = {
                    title: title,
                    votes: 0,
                    caption: caption,
                    category: {
                        "__type": "Pointer",
                        "className": "Category",
                        objectId: category
                    },
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
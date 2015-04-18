var app = app || {};

app.pictureRequster = (function () {
    function PictureRequester(baseURL) {
        this._baseURL = baseURL;
    }

    function getPictureHeaders() {
        var pictureHeaders = app.headers;
        pictureHeaders['Content-Type'] = 'file.type';

        //todo
        //if (sessionStorage['logged-in']) {
        //    headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
        //}
        return pictureHeaders;
    }

    function getPictureRepoHeaders() {
        var picRepoHeaders = app.headers;
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

    PictureRequester.prototype.uploadPicture = function (file) {
        var pictureUploadHeaders = getPictureHeaders();
        var url = this._baseURL + '/files/' + file.name;
        return makeRequest('POST', pictureUploadHeaders, url, file);
    };

    PictureRequester.prototype.createPictureRepo = function (data) {
        //todo
        //owner // title// votes(0) // caption //link - picture
        var picRepoHeaders = getPictureRepoHeaders();
        var classURL = this._baseURL + 'classes/Photo';
        var pictureName = data.name;
        var pictureData = {
            title: 'todo',
            votes: 0,
            caption: 'todo',
            picture: {
                "name": pictureName,
                "__type": "File"
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


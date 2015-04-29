var app = app || {};

app.commentModel = (function () {
    function Comment() {
        this._requester = app.commentController.load(app.constants.BASE_URL);
        this._serviseUrl = app.constants.BASE_URL + 'classes/Comment/';
    }

    Comment.prototype.addComment = function (comment, photoId) {
        var defer = Q.defer(),
            url = this._serviseUrl,
            data = JSON.stringify({
                'content': comment,
                'author': {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": sessionStorage['userId']

                },
                'photo': {
                    "__type": "Pointer",
                    "className": "Photo",
                    "objectId": photoId
                }
            });

        app.baseRequest.makeRequest('POST', app.constants.HEADERS, url, data)
            .then(function (data) {
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    Comment.prototype.getComments = function (id, selector) {
        var url = this._serviseUrl + '?where={"photo": { "__type": "Pointer","className": "Photo",   "objectId": "' + id + '"}}&include=photo,author';

        return app.baseRequest.makeRequest('GET', app.constants.HEADERS, url, {});
    };

    Comment.prototype.deleteComment = function (id) {
        var defer = Q.defer(),
            url = this._serviseUrl + id;

        app.baseRequest.makeRequest('DELETE', app.constants.HEADERS, url, {})
            .then(function (data) {
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    Comment.prototype.editComment = function (id, editedData) {
        var defer = Q.defer(),
            url = this._serviseUrl + id,
            data = {
                content: editedData
            };

        app.baseRequest.makeRequest('PUT', app.constants.HEADERS, url, JSON.stringify(data))
            .then(function (data) {
                defer.resolve(data);
            }, function (err) {
                defer.reject(err);
            });

        return defer.promise;
    };

    return {
        load: function () {
            return new Comment();
        }
    }
}());
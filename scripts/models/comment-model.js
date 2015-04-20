var app = app || {};

app.modells.comment = (function () {
    function setComment(comment, id) {
        var data = {'content': comment};
        var url = 'https://api.parse.com/1/classes/Comment/';
        app.parseComQuery('post', data, url).success(function (d) {
            var dataPut = {
                'author': {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": sessionStorage['userId']
                },
                'photo': {
                    "__type": "Pointer",
                    "className": "Photo",
                    "objectId": id
                }
            };
            app.parseComQuery('put', dataPut, 'https://api.parse.com/1/classes/Comment/' + d.objectId).success(function () {
                console.log('comment successfully added')
            }).error(function (err) {
                console.log(err)
            })
        }).error(function (err) {
            console.log(err);
        })
    }

    function getComment(id, selector) {
        console.log(selector)
        app.parseComQuery('get', {}, 'https://api.parse.com/1/classes/Comment/?where={"photo": { "__type": "Pointer","className": "Photo",   "objectId": "' + id + '"}}&include=photo,author').success(function (d) {
            app.commentView.renderComments(d, selector)
        }).error(function (err) {
            console.log('error')
        })
    }

    function deleteComment(id) {
        app.parseComQuery('delete', {}, 'https://api.parse.com/1/classes/Comment/' + id).success(function () {
            console.log('success')
        }).error(function (data) {
            console.log(data);
        });
    }

    return {
        setComment: setComment,
        getComment: getComment,
        deleteComment: deleteComment
    }
}())
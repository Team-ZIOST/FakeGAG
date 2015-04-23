var app = app || {};

app.commentModel = (function () {
    function Comment () {
        this._requester = app.commentController.load(app.constants.BASE_URL);
    }

    Comment.prototype.addComment = function (comment, photoId){
        var data = JSON.stringify({'content': comment});
        var url = app.constants.BASE_URL  + 'classes/Comment/';

        app.baseRequest.makeRequest('POST',  app.constants.HEADERS, url, data)
            .then(function(d){
            var dataPut = JSON.stringify({
                'author': {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": sessionStorage['userId']

                },
                'photo' : {
                    "__type": "Pointer",
                    "className": "Photo",
                    "objectId": photoId
                }
            });

            app.baseRequest.makeRequest('PUT',  app.constants.HEADERS, url + d.objectId, dataPut)
                .then(function(){
                console.log('comment added');
            }, function(err){
                console.log(err);
            })
        })
    };

    Comment.prototype.getComments = function(id, selector){
        var url = app.constants.BASE_URL  + 'classes/Comment/?where={"photo": { "__type": "Pointer","className": "Photo",   "objectId": "' + id +'"}}&include=photo,author';
        app.baseRequest.makeRequest('GET',  app.constants.HEADERS, url, {})
            .then(function(d){
            app.commentView.renderComments(d, selector)
        },function(err){
            console.log(err);
        });
    };

    Comment.prototype.deleteComment = function(id) {
        var url = app.constants.BASE_URL  + 'classes/Comment/' + id;
            app.baseRequest.makeRequest('DELETE',  app.constants.HEADERS, url, {})
                .then(function(){
                console.log('success');
            }, function(err){
                console.log(err);
            });
    };

    return {
        load: function() {
            return new Comment();
        }
    }
}());
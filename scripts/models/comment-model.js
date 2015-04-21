var app = app || {};

app.modells.comment = (function () {
    function setComment(comment, id){
        var data = JSON.stringify({'content': comment});
        var url = app.constants.BASE_URL  + 'classes/Comment/'
        app.baseRequest.makeRequest('post',  app.constants.HEADERS, url, data).then(function(d){
            var dataPut = JSON.stringify({
                'author': {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": sessionStorage['userId']

                },
                'photo' : {
                    "__type": "Pointer",
                    "className": "Photo",
                    "objectId": id
                }
            });
            app.baseRequest.makeRequest('put',  app.constants.HEADERS, url + d.objectId, dataPut).then(function(){
                console.log('comment added');
            }, function(err){
                console.log(err);
            })
        })
    }
    function getComment(id, selector){
        var url = app.constants.BASE_URL  + 'classes/Comment/?where={"photo": { "__type": "Pointer","className": "Photo",   "objectId": "' + id +'"}}&include=photo,author';
        app.baseRequest.makeRequest('get',  app.constants.HEADERS, url, {}).then(function(d){
            app.commentView.renderComments(d, selector)

        },function(err){
            console.log(err);
        });
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
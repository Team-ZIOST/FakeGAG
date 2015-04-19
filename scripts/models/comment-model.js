var app = app || {};

app.modells.comment = (function(){
    function setComment(comment){
        var data = {'content': comment};
        var url = 'https://api.parse.com/1/classes/Comment/'
        app.parseComQuery('post', data, url).success(function(d){
            var dataPut = {
                'author': {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": "l4FWL1fHi8"
                },
                'photo' : {
                    "__type": "Pointer",
                    "className": "Photo",
                    "objectId": "mGU5drr4dx"
                }
            };
            app.parseComQuery('put', dataPut, 'https://api.parse.com/1/classes/Comment/' + d.objectId).success(function(){
                console.log('comment successfully added')
            }).error(function(err){
                console.log(err)
            })
        }).error(function(err){
            console.log(err);
        })
    }
    function getComment(){
        app.parseComQuery('get', {}, 'https://api.parse.com/1/classes/Comment/?where={"photo": { "__type": "Pointer","className": "Photo",   "objectId": "' + 'LqudL4lO5M' +'"}}&include=photo,author').success(function(d){
            console.log(d)
        }).error(function(err){
            console.log('error')
        })
    }
    return {
        setComment: setComment,
        getComment: getComment
    }
}())
var app = app || {};

app.commentView = (function () {
    function renderComments(data, container) {

        var $commentContainer = $('<div>');
        
        data.results.forEach(function (comment) {
            var $commentDiv = $('<div>');
            var $commentText = $('<p>').text(comment.content);
            $commentDiv.attr('id', comment.objectId);
            var $postedBy = $('<p>').text(comment.author.username);
            $commentDiv.append($commentText);
            $commentDiv.append($('<p>').text('Posted by: '));
            $commentDiv.append($postedBy);
            $commentContainer.append($commentDiv);
        });
        container.append($commentContainer)
    }


    return {
        renderComments: renderComments
        //delete comment
        //edit comment
    }

}());

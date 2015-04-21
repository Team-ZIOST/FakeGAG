var app = app || {};

app.commentView = (function () {
    function renderComments(data, container) {
        //console.log(data);
        console.log(container)
        var $comentContainer = $('<div>');
        data.results.forEach(function (comment) {
            console.log(comment)
            //console.log(comment.author.username)

            var $commentDiv = $('<div>');
            var $commentText = $('<p>').text(comment.content);
            $commentDiv.attr('id', comment.objectId);
            //var $postedBy = ('<p>').comment.author.username;
            $commentDiv.append($commentText);
            $commentDiv.append($('<p>').text('Posted by: '));
            //$commentDiv.append($postedBy);
            $comentContainer.append($commentDiv);

        });
        container.append($comentContainer)
    }


    return {
        renderComments: renderComments
    }


}());

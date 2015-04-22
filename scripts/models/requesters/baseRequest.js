var app = app || {};

app.baseRequest = (function () {
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

    function getPictureHeaders() {
        var pictureHeaders = app.constants.HEADERS;
        pictureHeaders['Content-Type'] = 'file.type';

        //todo
        //if (sessionStorage['logged-in']) {
        //    headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
        //}
        return pictureHeaders;
    }

    function getPictureRepoHeaders() {
        var picRepoHeaders = app.constants.HEADERS;
        picRepoHeaders['Content-Type'] = 'application/json';

        //todo
        //if (sessionStorage['logged-in']) {
        //    headers['X-Parse-Session-Token'] = sessionStorage['logged-in'];
        //}
        return picRepoHeaders;
    }

    function getUsersHeaders(){
       return  app.constants.HEADERS;
    }



    return {
        makeRequest : function(method, headers, url, data){
           return makeRequest(method, headers, url, data)
        },
        getPictureRepoHeaders : function(){
            return getPictureRepoHeaders();
        },
        getPictureHeaders: function(){
           return getPictureHeaders();
        },
        getUserHeaders :function(){
            return getUsersHeaders()
        }

    }


}());

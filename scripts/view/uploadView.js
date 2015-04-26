var app = app || {};

app.uploadView = (function () {
    //login-register - fixed

    //todo what the fuck controller
    function uploadViewPage($selector, controller) {
        this._model = controller;
        var _this = this;
        $($selector).empty();
        $.get('templates/upload-template.html', function (template) {
            var output = Mustache.render(template);
            $($selector).html(output);

            var $button = $('#upload').click(function () {
                var file = $('#file')[0].files[0];
                var title = $('#title').val();
                var caption = $('#caption').val();
                var category = $("#category option:selected").text();

                //var picRequester = app.pictureRequster.load(app.constants.BASE_URL);
                if (app.constants.SUPPORTED_FORMATS.indexOf(file.type) !== -1) {

                    _this._model.uploadPicture(file, title, caption, category)
                        .then(function(data){
                            console.log(data);
                            location.replace('#/');
                        }, function(err){
                            console.log(err)
                        });
                }
                //app.router._Sammy.redirect('#/');
            });
        });
    }

    return{
        loadUploadPage : uploadViewPage
    }

}());
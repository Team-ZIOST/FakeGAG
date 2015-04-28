var app = app || {};

app.uploadView = (function () {

    function uploadViewPage($selector, controller) {
        var _this = this;

        this._model = controller;
        $($selector).empty();

        $.get('templates/upload-template.html', function (template) {
            var output = Mustache.render(template);
            $($selector).html(output);

            var $button = $('#upload').click(function () {
                var file = $('#file')[0].files[0];
                var title = $('#title').val();
                var caption = $('#caption').val();
                var category = $("#category option:selected").text();

                if (title && caption && file) {
                    if (app.constants.SUPPORTED_FORMATS.indexOf(file.type) !== -1) {

                        _this._model.uploadPicture(file, title, caption, category)
                            .then(function (data) {
                                Noty.success('Upload complete!');
                                location.replace('#/');
                            }, function (err) {
                                Noty.error(err.responseText);
                            });
                    }
                    else {
                        Noty.error('Invalid picture type');
                    }
                }

                else {
                    Noty.error('Please complete all fileds')
                }
            });
        });
    }

    return {
        loadUploadPage: uploadViewPage
    }

}());
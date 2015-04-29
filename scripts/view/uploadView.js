var app = app || {};

app.uploadView = (function () {
    function uploadViewPage($selector, controller) {
        var _this = this;

        this._model = controller;
        $($selector).empty();

        $.get('templates/upload-template.html', function (template) {
            var output = Mustache.render(template);

            $($selector).html(output);

            $('#upload').click(function () {
                var file = $('#file')[0].files[0],
                    title = $('#title').val(),
                    caption = $('#caption').val(),
                    category = $("#category option:selected").text();

                if (title && caption && file) {
                    if (app.constants.SUPPORTED_FORMATS.indexOf(file.type) !== -1) {
                        _this._model.uploadPicture(file, title, caption, category)
                            .then(function (data) {
                                Noty.success('Upload complete!');
                                location.replace('#/');
                            }, function (err) {
                                Noty.error(err.responseJSON.error);
                            });
                    } else {
                        Noty.error('Invalid picture type');
                    }
                } else {
                    Noty.error('Please complete all fields!')
                }
            });
        });
    }

    return {
        loadUploadPage: uploadViewPage
    }
}());
var app = app || {};

var $button = $('#upload').click(function () {
    var picRequester = app.pictureRequster.load(app.constants.BASE_URL);
    var file = $('input')[0].files[0];
    //todo multiple uploads
    //todo this must be in the pictureController
    //todo check fileName
    if (app.constants.SUPPORTED_FORMATS.indexOf(file.type) !== -1) {
        picRequester.uploadPicture(file)
            .then(function (data) {
                picRequester.createPictureRepo(data)
                    .then(function (data) {
                        console.log(data)
                    }, function (err) {
                        console.error(err)
                    }).done();
            }, function (err) {
                console.error(err)
            });
    }


    //}
});

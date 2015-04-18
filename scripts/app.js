var app = app || {};

var $button = $('#upload').click(function () {
    var picRequester = app.pictureRequster.load(app.baseURL);
    var file = $('input')[0].files[0];
    //todo multiple uploads
    //todo this must be in the pictureController
    //todo check fileName
    //if(file.type === FILE_TYPE){
    //    console.log('err');

    picRequester.uploadPicture(file)
        .then(function (data) {
            picRequester.createPictureRepo(data)
                .then(function (data) {
                    console.log(data)
                }, function (err) {
                    console.error(err)
                });
        }, function (err) {
            console.error(err)
        });
    //}
});

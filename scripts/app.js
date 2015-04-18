var app = app || {};
var BASEURL = 'https://api.parse.com/1/';

var button = $('#upload').click(function () {
    var picRequester = app.pictureRequster.load(BASEURL);
    var file = $('input')[0].files[0];
    var fileName = file.name;

    //this must be in the pictureController
    picRequester.uploadPicture(fileName, file)
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
});

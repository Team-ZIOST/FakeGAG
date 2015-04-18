var app = app || {};

(function () {

    app.router = Sammy(function () {
        var $selector = $('#wrapper');

        this.get('#/', function () {
            //todo controller
            console.log('home');
        });

        this.get('#/hot', function () {
            //todo controller
            console.log('hot');
        });

        this.get('#/top-ten', function () {
            //todo controller
            console.log('top 10');
        });

        this.get('#/signup-login', function () {
            //todo controller
            console.log('login');
        });
    });
    app.router.run('#/');

}());


//var $button = $('#upload').click(function () {
//    var picRequester = app.pictureRequster.load(app.constants.BASE_URL);
//    var file = $('input')[0].files[0];
//    //todo multiple uploads
//    //todo this must be in the pictureController
//    //todo check fileName
//    if (app.constants.SUPPORTED_FORMATS.indexOf(file.type) !== -1) {
//        picRequester.uploadPicture(file)
//            .then(function (data) {
//                picRequester.createPictureRepo(data)
//                    .then(function (data) {
//                        console.log(data)
//                    }, function (err) {
//                        console.error(err)
//                    }).done();
//            }, function (err) {
//                console.error(err)
//            });
//    }
//
//
//    //}
//});

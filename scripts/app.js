var app = app || {};

(function () {
    var picRequester = app.pictureRequster.load(app.constants.BASE_URL);

    app.router = Sammy(function () {
        var $selector = $('#wrapper');

        this.get('#/', function () {
            //todo controller
            $($selector).empty();
            console.log('home');
            $('#getPics').click(function () {

                picRequester.getPictures()
                    .then(function (data) {
                        showPictures(data);
                    }, function (err) {
                        console.log(err)
                    });

            });

            function showPictures(data) {
                data.results.forEach(function (pictureData) {
                    console.log(pictureData.picture.url);
                    //todo get the selector form sammy
                    $('#wrapper').append($('<img ' + 'id="' + pictureData.objectId + '" class="image" src="' + pictureData.picture.url + '">'));
                })

            }

            var $button = $('#upload').click(function () {

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
            });
        });

        this.get('#/hot', function () {
            $($selector).empty();
            //todo controller
            console.log('hot');
        });

        this.get('#/top-ten', function () {
            //todo controller
            $($selector).empty();
            console.log('top 10');
        });

        this.get('#/signup-login', function () {
            //todo controller
            $($selector).empty();
            console.log('login');
        });
    });

    app.router.run('#/');

}());



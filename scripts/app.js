var app = app || {};

(function () {

    app.router = Sammy(function () {
        var $selector = $('#wrapper');
        var pictureRepoModel = app.pictureRepoModel.load(app.constants.BASE_URL);
        var pictureController = app.pictureController.load(pictureRepoModel);


        if(sessionStorage['userId']){
            $('#mainNav').append($('<li id="uploadSection"><a href="#/upload"><i class="pe-7s-cloud-upload"></i><span class="menuspan">Upload a picture</span></a></li>'));

        }

        this.get('#/', function () {
			app.setActiveLink('');
            pictureController.renderAllPictures($selector);
        });



        this.get('#/upload', function () {
			app.setActiveLink('upload');
            $($selector).empty();
            //todo - attach to controller

            $.get('templates/upload-template.html', function (template) {
                var output = Mustache.render(template);
                $($selector).html(output);

                var $button = $('#upload').click(function () {
                    var file = $('input')[0].files[0];
                    //todo multiple uploads
                    //todo this must be in the pictureController
                    //todo check fileName
                    var picRequester = app.pictureRequster.load(app.constants.BASE_URL);

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
        });

        this.get('#/hot', function () {
			app.setActiveLink('hot');
            $($selector).empty();
            //todo controller
            console.log('hot');
        });

        this.get('#/top-ten', function () {
			app.setActiveLink('top-ten');
            //todo controller
            $($selector).empty();
            console.log('top 10');
        });

        this.get('#/signup-login', function () {
			app.setActiveLink('signup-login');
            //todo controller
            $($selector).empty();
            if (!sessionStorage['sessionToken']) {

                $.get('templates/user-view-register.html', function (template) {
                    var output = Mustache.render(template);
                    $($selector).html(output);
                });
                $.get('templates/user-vew-login.html', function (template) {
                    var output = Mustache.render(template);
                    $($selector).append(output);

                });
            } else {
                $($selector).empty();
                //todo remove the logOutButton form here :)
                var $logOutButton = $('<button id="logOutButton">').text('Log-out');
                $logOutButton.click(function () {
                    sessionStorage.clear();
                    $('#uploadSection').remove();
                    //render the forms again
                });
                $($selector.append($logOutButton))
            }

        });
    });

    app.router.run('#/');

}());



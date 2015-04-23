var app = app || {};

(function () {

    app.router = Sammy(function () {

        //start invoking controllers
        var $selector = $('#wrapper');
        var pictureRepoModel = app.pictureRepoModel.load(app.constants.BASE_URL);
        var userModel = app.userModel.load();
        var commentModel = app.commentModel.load(app.constants.BASE_URL);
        var commentController = app.commentController.load(commentModel);
        var pictureController = app.pictureController.load(pictureRepoModel, commentController);

        var userController = app.userController.load(userModel);
        //end invoking controllers

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
            $($selector).empty();
            pictureController.renderTopTenPictures($selector);
            console.log('top 10');
        });

        this.get('#/cats', function () {
            app.setActiveLink('cats');
            //todo move empty selector to the view;
            $($selector).empty();
            pictureController.renderPicturesByCategory($selector, 'cats');
            console.log('cats');
        });

        this.get('#/signup-login', function () {
            app.setActiveLink('signup-login');

            if (sessionStorage['userId']) {
                userController.renderLogout($selector);
            } else {
                userController.renderLogin($selector);
            }

        });

        this.get('#/userPanel', function () {
            app.setActiveLink('userPanel');

            if (sessionStorage['userId']) {
                userController.renderUpdateProfile($selector);
            } else {
                userController.renderLogin($selector);
            }

        });
    });

    app.router.run('#/');

}());



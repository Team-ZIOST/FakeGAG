var app = app || {};

(function () {

    app.router = Sammy(function () {
        //var _sammy =this;
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
            if (sessionStorage['userId']) {
                pictureController.renderUploadPage($selector);
            } else {
                userController.renderLogin($selector);
            }

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
        });

        this.get('#/cats', function () {
            app.setActiveLink('cats');
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

    //

}());
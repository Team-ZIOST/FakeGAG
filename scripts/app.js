var app = app || {};

(function () {

    app.router = Sammy(function () {
        //todo clean up this mess
        if (sessionStorage['userId']) {
            $('#loginLogOut').html('<a href="#/signup-login"><i class="pe-7s-key"></i><span class="menuspan" id="login-register">Log out</span></a>')
        }

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

        this.get('#/categories', function () {
            app.setActiveLink('categories');
            pictureController.renderCategoryPage($selector);
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
var app = app || {};

(function () {

    app.router = Sammy(function () {
        var $selector = $('#wrapper');
        var pictureRepoModel = app.pictureRepoModel.load(app.constants.BASE_URL);
        var pictureController = app.pictureController.load(pictureRepoModel);


        if (sessionStorage['userId']) {
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

        this.get('#/cats', function () {
            app.setActiveLink('cats');
            //todo controller
            $($selector).empty();
            console.log('cats');
        });

        this.get('#/signup-login', function () {
            app.setActiveLink('signup-login');
            //todo controller
            $($selector).empty();
            if (!sessionStorage['sessionToken']) {

                $.get('templates/user-vew-login.html', function (template) {
                    var output = Mustache.render(template);
                    $($selector).html(output);
                    $('#loginButton').click(function(){
                        app.controller.userLogin((function (data) {

                            app.modells.user.userRole(sessionStorage['userId']);

                        }));
                    });

                    $('#register').click(function () {
                        $($selector).empty();
                        $.get('templates/user-view-register.html', function (template) {
                            var output = Mustache.render(template);
                            $($selector).html(output);

                            $('#registerButton').click(function(){
                                app.controller.userRegister()
                            });
                            function checkingInputData(data, regex, id, errorMsg, input) {
                                var m = data.match(regex);

                                if (m === null || m[0] !== data || m === '') {
                                    $(id).text(errorMsg);
                                    $('input[type="submit"]').prop('disabled', true);


                                }
                                else {
                                    $(id).html('&#10004;');
                                    $('input[type="submit"]').prop('disabled', false);
                                    inputsHasValue.length === 4 ? $('input[type="submit"]').prop('disabled', false) : '';
                                }
                            }

                            var inputsHasValue = {};
                            var repeatPasswordRegex = '';
                            var passwordRegex = /[\S+\s+]{8,100}$/;
                            var usernameRegex = /[A-z_\-0-9]{3,35}$/;
                            var emailRegex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
                            $("input").keyup(function () {
                                var name = this.name;
                                switch (name) {
                                    case "username":
                                        var $username = $('[name="username"]').val();
                                        checkingInputData($username, usernameRegex, '#username', 'username is invalid');
                                        inputsHasValue['username'] = true;
                                        break;
                                    case "password":
                                        var $password = $('[name="password"]').val();
                                        checkingInputData($password, passwordRegex, '#password', 'invalid password');
                                        repeatPasswordRegex = $password;
                                        inputsHasValue['password'] = true;
                                        break;
                                    case "email":
                                        var $email = $('[name="email"]').val();
                                        checkingInputData($email, emailRegex, '#email', 'email is invalid');
                                        inputsHasValue['email'] = true;
                                        break;
                                    case "repeat-password":
                                        var $repeatPass = $('[name="repeat-password"]').val();
                                        checkingInputData($repeatPass, repeatPasswordRegex, '#repeat-password', 'invalid password');
                                        inputsHasValue['repeat-pass'] = true;
                                        break;
                                    default:
                                        console.log('unknown case');
                                }
                            });

                        });
                    });
                });


            } else {
                $($selector).empty();
                //todo remove the logOutButton form here :)
                var $logOutButton = $('<button id="logOutButton">').text('Log-out');
                $logOutButton.click(function () {
                    app.modells.user.userLogout();
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



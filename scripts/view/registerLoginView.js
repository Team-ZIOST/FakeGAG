var app = app || {};

app.registerLoginView = (function () {
    function loadRegisterLoginPage($selector, model) {
        $($selector).empty();

        $.get('templates/user-login-register-template.html',
            function (template) {
                var output = Mustache.render(template);

                $($selector).html(output);

                $('#loginButton').click(function () {
                    var username = $('[name="username-login"]').val(),
                        password = $('[name="password-login"]').val();

                    model.loginUser(username, password)
                        .then(function () {
                            Noty.success("Welcome");
                            $('#login-register').html('Log Out');
                            location.replace('#/');
                        }, function (err) {
                            Noty.error(err.responseJSON.error);
                        });
                });

                $('#registerButton').click(function () {
                    var regUsername = $('[name="username"]').val(),
                        regPassWord = $('[name="password"]').val(),
                        regRepeatedPassword = $('[name="repeat-password"]').val(),
                        regEmail = $('[name="email"]').val();

                    if (regUsername && regEmail && regPassWord && regRepeatedPassword) {
                        if (regPassWord === regRepeatedPassword) {
                            model.registerUser(regUsername, regEmail, regPassWord)
                                .then(function (data) {
                                    Noty.success("Register successful, please login");
                                }, function (error) {
                                    Noty.error(err.responseJSON.error);
                                })
                        } else {
                            Noty.error('Passwords not match!')
                        }
                    } else {
                        Noty.error('All fields are required!')
                    }
                });
            });
    }

    function LogoutView($selector, model) {
        var $logOutButton = $('#loginLogOut');

        $($selector).empty();

        $logOutButton.click(function () {
            if (sessionStorage['userId']) {
                model.logoutUser()
                    .then(function () {
                        Noty.success("Good Bye!");
                        $('#login-register').html('Sign up/Login');
                        location.replace('#/')
                    }, function (err) {
                        Noty.error(err.responseText)
                    });
            }
        });
    }

    return {
        loginRegisterView: loadRegisterLoginPage,
        loadLogOutView: LogoutView
    }
}());
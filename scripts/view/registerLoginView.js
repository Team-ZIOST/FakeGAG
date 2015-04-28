var app = app || {};

app.registerLoginView = (function () {
    function loadRegisterLoginPage($selector, model) {
        $($selector).empty();
        $.get('templates/user-login-register-template.html',
            function (template) {
                var output = Mustache.render(template);
                $($selector).html(output);
                $('#loginButton').click(function () {
                    var username = $('[name="username-login"]').val();
                    var password = $('[name="password-login"]').val();
                    model.loginUser(username, password)
                        .then(function () {
                            Noty.success("Welcome");
                            $('#login-register').html('Log Out');
                            location.replace('#/')

                        }, function (err) {
                          //  console.log(JSON.stringify(err));
                            Noty.error(err.responseText);
                        });
                });

                $('#registerButton').click(function () {
                    var regUsername = $('[name="username"]').val();
                    var regPassWord = $('[name="password"]').val();
                    var regRepeatedPassword = $('[name="repeat-password"]').val();
                    var regEmail = $('[name="email"]').val();
                    if (regPassWord === regRepeatedPassword) {
                        model.registerUser(regUsername, regEmail, regPassWord)
                            .then(function (data) {
                                Noty.success("Register successful, please login");
                            }, function (error) {
                                Noty.error(error.responseText);
                            })
                    } else {
                        Noty.error('Passwords not match!')
                    }

                });

            });
    }

    function LogoutView($selector, model) {
        $($selector).empty();
        var $logOutButton = $('#loginLogOut');
        $logOutButton.click(function () {
            if(sessionStorage['userId']){
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


//todo use this code for checking input for login / register
//function checkingInputData(data,
//                           regex, id, errorMsg, input) {
//    var m = data.match(regex);
//
//    if (m === null || m[0] !== data || m === '') {
//        $(id).text(errorMsg);
//        $('input[type="submit"]').prop('disabled', true);
//
//
//    }
//    else {
//        $(id).html('&#10004;');
//        $('input[type="submit"]').prop('disabled', false);
//        inputsHasValue.length === 4 ? $('input[type="submit"]').prop('disabled', false) : '';
//    }
//}

//var inputsHasValue = {};
//var repeatPasswordRegex = '';
//var passwordRegex = /[\S+\s+]{8,100}$/;
//var usernameRegex = /[A-z_\-0-9]{3,35}$/;
//var emailRegex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
//$("input").keyup(function () {
//    var name = this.name;
//    switch (name) {
//        case "username":
//            var $username = $('[name="username"]').val();
//            checkingInputData($username, usernameRegex, '#username', 'username is invalid');
//            inputsHasValue['username'] = true;
//            break;
//        case "password":
//            var $password = $('[name="password"]').val();
//            checkingInputData($password, passwordRegex, '#password', 'invalid password');
//            repeatPasswordRegex = $password;
//            inputsHasValue['password'] = true;
//            break;
//        case "email":
//            var $email = $('[name="email"]').val();
//            checkingInputData($email, emailRegex, '#email', 'email is invalid');
//            inputsHasValue['email'] = true;
//            break;
//        case "repeat-password":
//            var $repeatPass = $('[name="repeat-password"]').val();
//            checkingInputData($repeatPass, repeatPasswordRegex, '#repeat-password', 'invalid password');
//            inputsHasValue['repeat-pass'] = true;
//            break;
//        default:
//            console.log('unknown case');
//    }
//});
var app = app || {};

app.registerLoginView = (function () {
    //login-register - fixed
    function loadRegisterLoginPage($selector, model) {
        $($selector).empty();
        $.get('templates/user-view-register.html', function (template) {
            var output = Mustache.render(template);
            $($selector).html(output);
            $('#loginButton').click(function () {
                var username = $('[name="username-login"]').val();
                var password = $('[name="password-login"]').val();
                model.loginUser(username, password);


            });
            $('#registerButton').click(function () {
                console.log('register')
                var regUsername = $('[name="username"]').val();
                var regPassWord = $('[name="password"]').val();
                var regRepeatedPassword = $('[name="repeat-password"]').val();
                var regEmail = $('[name="email"]').val();
                //todo validation, maybe code reuse
                ///todo include values in the function
                // model.userRegister()
                model.registerUser(regUsername, regEmail, regPassWord)

            });
        });
    }

    function LogoutView($selector, model) {
        $($selector).empty();
        //todo remove the logOutButton form here :)
        var $logOutButton = $('<button id="logOutButton">').text('Log-out');
        $logOutButton.click(function () {
            console.log('logged out');
            //todo - this must be the controller!
            model.logoutUser();

            //todo render the forms again
        });
        $selector.append($logOutButton);
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
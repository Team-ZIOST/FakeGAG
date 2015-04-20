var app = app || {};

app.modells = (function () {
    var user = (function () {
        function checkingInputData(data, regex, id, errorMsg, input) {
            var m = data.match(regex)

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
        $(document).ready(function () {
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
        function parseComQuery(methodType, inputData, url) {
            return $.ajax({
                method: methodType,
                headers: {
                    'X-Parse-Application-Id': '2TuV4wtwFeGfuHRPMI6OQlep5kBhK9VxXwh0wQDC',
                    'X-Parse-REST-API-Key': 'fQygihlNWiKhnd63W3E4mrZTG8Kq2Z7bRlu1Ajvw'
                },
                data: JSON.stringify(inputData),
                url: url
            })

        }

        function userRegister(username, email, password, repeatPassword) {
            var data = {
                'username': username,
                'email': email,
                'password': password
            };
            parseComQuery('post', data, 'https://api.parse.com/1/users').success(function (d) {
                var dataRole = {
                    "users": {
                        "__op": "AddRelation",
                        "objects": [
                            {
                                "__type": "Pointer",
                                "className": "_User",
                                "objectId": d.objectId
                            }
                        ]
                    }
                };
                parseComQuery('put', dataRole, 'https://api.parse.com/1/roles/LGlTwmEecV').success(function () {
                    console.log('ok');
                }).error(function (data) {
                    console.log(data);
                });
                console.log('success');

            }).error(function (data) {
                console.log(data);
            });


            return false;
        }

        function userLogin(username, password) {
            parseComQuery('get', {}, 'https://api.parse.com/1/login?username=' + username + '&password=' + password).success(function (d) {
                sessionStorage['sessionToken'] = d.sessionToken;
                console.log('success')
            }).error(function (e) {
                //var json = JSON.parse(e.ma)
                e.responseJSON.code == 101 ? console.log('invalid username or password') : ''
            });
            return false;
        }
        app.parseComQuery = parseComQuery;
        return {
            userRegister: userRegister,
            userLogin: userLogin
        }
    }());
    return {
        user: user
    };

}() );

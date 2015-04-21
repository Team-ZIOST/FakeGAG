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
            var headers = app.constants.HEADERS;
            var url = app.constants.BASE_URL + 'users';
            console.log(headers)

          app.baseRequest.makeRequest('post',  headers, url, JSON.stringify(data)).then(function(d){
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
              url = app.constants.BASE_URL + 'roles/LGlTwmEecV';
              app.baseRequest.makeRequest('put',  headers, url, JSON.stringify(dataRole)).then(function(d) {
                  console.log('success');
              })
          }, function(){
              console.log('error');
          })
            console.log('reg')
            return false;
        }

        function userLogin(username, password) {
            var url = app.constants.BASE_URL + 'login/?username='+username+'&password='+ password
            app.baseRequest.makeRequest('get',  app.constants.HEADERS, url, {}).then(function(d){
                sessionStorage['sessionToken'] = d.sessionToken;
                sessionStorage['userId'] = d.objectId;
                if(  $( "#uploadSection" ).length===0 ) {
                    $('#mainNav').append($('<li id="uploadSection"><a href="#/upload"><i class="pe-7s-cloud-upload"></i><span class="menuspan">Upload a picture</span></a></li>').hide());
                    $('#uploadSection').fadeIn(500);
                    console.log('success');
                }
            }, function(){
                console.log('err');
            });

            return false;
        }

        return {
            userRegister: userRegister,
            userLogin: userLogin
        }
    }());
    return {
        user: user
    };

}() );

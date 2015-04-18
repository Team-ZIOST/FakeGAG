var app = app || {};

app.modells = (function(){
    var user = (function(){
        function User(baseUrl){
            this._baseUrl = baseUrl;
            console.log('instance');
            //return 'OK'
        }
        User.prototype.userRegister = function userRegister(username, email, password, repeatPassword){
            function parseComQuery(methodType, inputData, url) {
                return $.ajax({
                        method: methodType,
                        headers: {
                            'X-Parse-Application-Id' : '2TuV4wtwFeGfuHRPMI6OQlep5kBhK9VxXwh0wQDC',
                            'X-Parse-REST-API-Key' : 'fQygihlNWiKhnd63W3E4mrZTG8Kq2Z7bRlu1Ajvw'
                        },
                        data: JSON.stringify(inputData),
                        url: url
                    })

            }
            if(password === repeatPassword) {
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
                                    "objectId": "8TOXdXf3tz"
                                },
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
                    })
                    console.log('success');

                }).error(function (data) {
                    console.log('err' + data);
                });
            }
            return false;
        }
        User.prototype.userLogin = function userLogin(){
            console.log('login');
            return false;
        }
        return{
            instance: User
        }
    }())
    return {
        user: user
    };

}() )

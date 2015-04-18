var app = app || {};

app.controller = (function(){
    function userLogin(){
        console.log('login user');
        return false;
    }
    function userRegister(){
        console.log('register');
        var $name = $('[name="username"]').val();
        var $email = $('[name="email"]').val();
        var $password = $('[name="password"]').val();
        var $repPass = $('[name="repeat-password"]').val();
        var userInstance = new app.modells.user.instance('https://api.parse.com/1/');
        console.log(userInstance._baseUrl);
        userInstance.userRegister($name, $email, $password, $repPass)

        console.log($repPass);
        return false;

    }
    return {
        userLogin: userLogin,
        userRegister: userRegister

    }
}());

var app = app || {};

app.controller = (function(){
    function userLogin(){
        var $username = $('[name="username"]').val();
        var $password = $('[name="password"]').val();
        app.modells.user.userLogin($username, $password);
        return false;
    }
    function userRegister(){
        console.log('register');
        var $name = $('[name="username"]').val();
        var $email = $('[name="email"]').val();
        var $password = $('[name="password"]').val();
        var $repPass = $('[name="repeat-password"]').val();


        app.modells.user.userRegister($name, $email, $password, $repPass);

        console.log($repPass);
        return false;

    }
    return {
        userLogin: userLogin,
        userRegister: userRegister

    }
}());

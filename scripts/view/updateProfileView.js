var app = app || {};

app.updateProfileView = (function () {
    function updateView($selector, controller) {
        $selector.empty();

        $.get('templates/profile-update-template.html', function (template) {
            var output = Mustache.render(template);

            $selector.html(output);

            $('#updateButton').click(function () {
                var username = $('#email').val();
                var password = $('#password').val();
                var repeatPassword = $('#confirm-password').val();
                if(password === repeatPassword){
                controller.updateProfile(username, password)
                    .then(function () {
                        Noty.success('Updated Profile!');
                    }, function (err) {
                        console.log(err.responseText);
                        Noty.error(err.responseText)
                    });
                }else{
                    Noty.error('New passwords not match!');
                }
            });
        });
    }

    return {
        loadUpdateView: updateView
    }
}());
var app = app || {};

app.updateProfileView = (function () {
    function updateView($selector, controller) {
        $selector.empty();

        $.get('templates/profile-update-template.html', function (template) {
            var output = Mustache.render(template);

            $selector.html(output);

            $('#updateButton').click(function () {
                var username = $('#email').val(),
                    password = $('#password').val(),
                    repeatPassword = $('#confirm-password').val();

                if (password === repeatPassword) {
                    controller.updateProfile(username, password)
                        .then(function () {
                            Noty.success('Updated Profile!');
                        }, function (err) {
                            Noty.error(err.responseJSON.error);
                        });
                } else {
                    Noty.error('New passwords not match!');
                }
            });
        });
    }

    return {
        loadUpdateView: updateView
    }
}());
var app = app || {};

app.updateProfileView = (function () {
    function updateView($selector, model) {
        $selector.empty();

        $.get('templates/profile-update-template.html', function (template) {
            var output = Mustache.render(template);
            $selector.html(output);

            $('#updateButton').click(function () {
                var username = $('#email').val();
                var password = $('#password').val();

                model.updateProfile(username, password);
            });
        });
    }

    return {
        loadUpdateView: updateView
    }
}());
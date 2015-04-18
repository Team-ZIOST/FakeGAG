var app = app || {};

app.homeView = (function(){
    function homeView(selector, data) {
        $.get('templates/home-template.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);
            //$('#login').click(function (app) {
            //    app.controller.getHomePage(selector);
            //});

        })
    }

    return {
        load: function (selector, data) {
            return new LoginView(selector, data);
        }
    }


}());
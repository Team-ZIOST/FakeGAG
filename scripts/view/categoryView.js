var app = app || {};

app.categoryView = (function () {
    //login-register - fixed

    //todo what the fuck controller
    function categoryView($selector, controller) {
        this._controller = controller;
        var _this = this;
        $($selector).empty();
        $.get('templates/categories-template.html', function (template) {
            var output = Mustache.render(template);
            $($selector).html(output);
            var  $container  = $('#container')
            var $selectionTypes = $('#select').on('change', function () {
                var category = this.value;
                _this._controller.renderPicturesByCategory($container, category);
                    //.then(function(data){
                    //    //console.log(data)
                    // //   app.picturesView.load(data, $selector, _this._controller)
                    //}, function(err){
                    //    console.log(err.responseText);
                    //});
                //console.log(category);
            });
        });
    }

    return {
        loadCategoryView: categoryView
    }

}());
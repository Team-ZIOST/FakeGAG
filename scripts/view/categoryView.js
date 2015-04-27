var app = app || {};

app.categoryView = (function () {
    //todo what the fuck controller
    function categoryView($selector, controller) {
        var _this = this;

        this._controller = controller;
        $($selector).empty();

        $.get('templates/categories-template.html', function (template) {
            var output = Mustache.render(template),
                $container = $('#container'),
                $selectionTypes = $('#select');

            $($selector).html(output);
            $selectionTypes.on('change', function () {
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
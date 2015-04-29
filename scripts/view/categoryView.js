var app = app || {};

app.categoryView = (function () {
    function categoryView($selector, controller) {
        var _this = this;

        this._controller = controller;
        $($selector).empty();

        $.get('templates/categories-template.html', function (template) {
            var output = Mustache.render(template);

            $selector.html(output);

            $('#select').on('change', function () {
                var category = this.value;

                _this._controller.renderPicturesByCategory($('#container'), category);
            });
        });
    }

    return {
        loadCategoryView: categoryView
    }
}());
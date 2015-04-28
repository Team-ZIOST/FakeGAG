var Noty = (function () {

    function display(type, text, time) {
        var n = noty({
            text: text,
            type: type,
            closeWith: ['click'],
            dismissQueue: true,
            layout: 'topCenter',
            theme: 'Animated',
            maxVisible: 10
            // timeout: time
        });
    }

    function success(text) {
        display('success', text, 2500);
    }

    function error(text) {
        display('error', text, 2500);
    }

    return {
        success: success,
        error: error
    }
}());

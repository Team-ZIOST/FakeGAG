var app = app || {};

app.constants = (function () {
    var baseURL = 'https://api.parse.com/1/';

    var headers = {
        'X-Parse-Application-ID': '2TuV4wtwFeGfuHRPMI6OQlep5kBhK9VxXwh0wQDC',
        'X-Parse-REST-API-Key': 'fQygihlNWiKhnd63W3E4mrZTG8Kq2Z7bRlu1Ajvw'
    };

    var supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];

    return {
        BASE_URL: baseURL,
        HEADERS: headers,
        SUPPORTED_FORMATS: supportedFormats
    }
})();
var app = app || {};

(function () {

app.setActiveLink = function setActiveLink(name){
    var ul = $('ul')
	
    ul.children().removeClass('active')

    ul.find('a[href="#/'+name+'"]').parent().addClass('active')
}

}());
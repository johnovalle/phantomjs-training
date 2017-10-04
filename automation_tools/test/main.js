var url = 'https://www.google.com/';

// don't create a new instance of casper,
// must use the test argument
// test.done() to finish the test

function checkSelectorForAttr(selector, attr) {
    var results = [];
    var elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        return null;    
    }
    for (var i =0; i<elements.length; i++) {
        var current = elements[i];
        var hasAttr = current.hasAttribute(attr);
        if(!hasAttr) {
            results.push(current.outerHTML);
        }
    }
    return results;
}

casper.options.remoteScripts.push('https://code.jquery.com/jquery-2.2.3.min.js');

casper.test.begin("Testing accessibility", function(test){
    casper.start(url, function(){
        this.evaluate(function() {
            $.noConflict();
        });
        //test.assertHttpStatus(200, 'Page is up and running');
    });

    casper.then(function() {
        test.assertDoesntExist('a input', "No input elements exist inside anchor elements");
    });

    casper.then(function() {
       // test.assert(casper.getCurrentUrl() === url, 'URL is the one expected');
        test.assertExists('html[lang]', 'A html element with a "lang" attribute exists');
        test.assertTruthy(this.getElementAttribute('html[lang]', 'lang'), 'html lang attribute is not empty');
    });

    casper.then(function(){
        test.assertExists('head title', 'A title element exists inside the head');
    });

    casper.then(function(){
        var imagesWithNoAltAttr = this.evaluate(checkSelectorForAttr, 'img', 'alt');
        if(imagesWithNoAltAttr && imagesWithNoAltAttr.length > 0) {
            test.fail('Some images don\'t have an "alt" attribute');
        }
    });

    casper.run(function() {
        test.done();
    });
});
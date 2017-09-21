var casper = require('casper').create();
var fs = require('fs');
var data;
casper.on('remote.message', function(msg) {
    console.log('remote message is: ' + msg);
});

casper.start('https://www.google.com/', function() {
    this.fill('form', {q: 'algorithms 4th edition'}, true);
    //this.capture('./output/test.png');
});
// casper.then(function(){
//     this.capture('./output/test.png');
// });
casper.wait(1000, function() {
    data = this.evaluate(function() {
        //var body = document.querySelector('body');
        var targetElements = document.querySelectorAll('.g h3 a');
        
        //console.log(body.innerHTML);
        //console.log(window.navigator.userAgent);
        var data = [];
        for (var i=0, len=targetElements.length; i<len; i++){
            var currentEl = targetElements[i];
            var currentLink = currentEl.getAttribute("href");
            var currentTitle = currentEl.text;
            var currentItem = {
                'link': currentLink,
                'title': currentTitle
            };
            data.push(currentItem);
        }
        return data;
    });
    //console.log(JSON.stringify(data));
});
// casper.thenOpen('http://www.bing.com', function() {
//     var message = "the current page title is: ";
//     var title = this.evaluate(function(message){
//         return message + document.title;
//     }, message);
//     var title = this.getTitle();
//     casper.echo(title, 'INFO');
// });
casper.run(function(){
    fs.write('./output/output.json', JSON.stringify(data, null, '\t'));
    this.exit();
});
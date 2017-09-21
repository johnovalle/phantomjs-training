var casper = require('./casper-base');
var utils = require('utils');
var brokenResourceExists = false;
var urlState = {};


var urls = [
    'https://web.archive.org/web/20010331101744/http://www.bbc.co.uk/?ok',
    'https://web.archive.org/web/20010405065637/http://www.bbc.co.uk/?ok',
    'http://www.google.com',
    'http://www.bing.com'
];

casper.on('resource.received', function(resource){
    //console.log(resource);
    if(resource.stage === 'end' && resource.status > 400){ // >400 is an error
        utils.dump(resource.url);
        brokenResourceExists = true;
    }
    
});

casper.start('http://www.google.com');
casper.each(urls, function(self, url, index){
    self.thenOpen(url, function(){
        urlState[url] = brokenResourceExists;
    });
    self.then(function() {
        brokenResourceExists = false;
    });
});

casper.run(function() {
    utils.dump(urlState);
    this.exit();
});
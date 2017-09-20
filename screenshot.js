var webpage = require('webpage').create();

webpage.open('https://www.google.com/', function(status){
  webpage.render('screenshot.png');
  phantom.exit();
});

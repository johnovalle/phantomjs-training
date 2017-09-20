var webpage = require('webpage').create();

webpage.open('https://www.google.com/', function(status){
  if(status !== 'success'){
    console.log('Unable to access network');
  } else {
    var title = webpage.evaluate(function(){
      return document.title;
    });
  }
  console.log('the title is: ', title);
  phantom.exit();
});

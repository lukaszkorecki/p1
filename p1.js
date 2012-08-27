var page = require('webpage').create(),
    file = phantom.args[0],
    address = '/Users/lukasz/Dropbox/1p/1password.agilekeychain/1Password.html';

page.viewportSize = { width: 600, height: 600 };
page.onConsoleMessage = function (msg) { console.log('[1p] ' + msg);
};

page.onError = function (msg, trace) {
  console.log(msg);
  trace.forEach(function(item) { console.log('[1p] [err]  ', item.file, ':', item.line); });
};

page.open(address, function (status) {

  if (status !== 'success') {
    console.log('Unable to load the address!');
  } else {
    console.log('im here!');
    // really unsafe: pass.js looks like this:
    // PASSWORD = '<your 1password here>'
    // but well...
    page.injectJs('pass.js');
    window.setTimeout(function () {
      page.evaluate(function(){
        console.log('woop!');
        try {

          var i = document.getElementById('masterPassword');
          console.log(i);
          var s = document.getElementById('unlock');
          console.log(s);

          console.log(PASSWORD);
          i.setAttribute('value', PASSWORD);
          s.click();
        }catch(e) {
          console.log(e);
        }
      });


    }, 1400);
    window.setTimeout(function(){
      // we want some proof, right?
      page.render(file);
      phantom.exit();
    },2000);
  }
});

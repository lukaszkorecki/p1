var page = require('webpage').create(),
pass_file = phantom.args[0],
keychain = phantom.args[1]+'/1password.agilekeychain/1Password.html',
file = phantom.args[2];

// probably doesn't need to be bigger
page.viewportSize = { width: 1000, height: 600 };
page.onConsoleMessage = function (msg) { console.log('[p1] ' + msg);
};

// console running in browser context
page.onError = function (msg, trace) {
  console.log(msg);
  trace.forEach(function(item) { console.log('[1p] [err]  ', item.file, ':', item.line); });
};

// lets do this
page.open(keychain, function (status) {
  if (status !== 'success') {
    // FIXME better debug
    console.log('Unable to load the address!');
    console.log('Tried: '+keychain);
    phantom.exit(1);
  } else {
    page.injectJs(pass_file);
    window.setTimeout(function () {
      // TODO this needs to be extracted and modularized or something
      page.evaluate(function(){
        console.log('woop!');
        try {

          var i = document.getElementById('masterPassword');
          console.log(i);
          var s = document.getElementById('unlock');
          console.log(s);

          i.setAttribute('value', PASSWORD);
          s.click();
        }catch(e) {
          console.log(e);
        }
      });


    }, 1400);
    // FIXME this needs to be in debug only mode?
    window.setTimeout(function(){
      // we want some proof, right?
      page.render(file);
      phantom.exit();
    },2000);
  }
});

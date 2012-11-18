var page = require('webpage').create(),
pass_file = phantom.args[0],
keychain = phantom.args[1]+'/1password.agilekeychain/1Password.html',
file = phantom.args[2];

// probably doesn't need to be bigger
page.viewportSize = { width: 1000, height: 600 };

// setup console running in phantom/cli context
page.onConsoleMessage = function (msg) { console.log('[p1] ' + msg);
};

// setup console running in browser context
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
    // TODO this needs to be extracted and modularized or something
    // 1password.html has jquery already so this should be
    // easy
    page.evaluate(function(){

        function logMeIn(password) {

          var i = $('#masterPassword');
          var s = $('#unlock');
          console.log(i);
          console.log(s);

          i.attr('value', password);
          s.click();
        }

        function searchAndGet(term) {
          // use search box
          $('#search').attr('value',term).keyup();
          // results get listed, check how many there are
          var results = $('#listPane li strong');
          // we got some results
          console.log([
                      "Found",
                      results.count,
                      (results.count == 1? "item" : "items")
          ].join(' '));
          results.map(function(){
            console.log(this.innerText);
          });
          console.log("Username / password for first result:");

        }

        function displayUsernameAndPassword() {

          // TODO FIXME
          // make this less hacky, ok?
           trs = $($('#detailsPane tbody')[0]).find('tr');
          var username = $(trs[1]).find('td')[1].innerText;
          var password = $(trs[2]).
            find('.revealButton').
            attr('onclick').
            toString().
            split(',')[1].
            trim().
            replace(/^"/,'').replace(/"$/,'');
          console.log(username + " | " + password);
        }

        $(function(){
          logMeIn(PASSWORD);
      });
    });


    // FIXME this needs to be in debug only mode?
    window.setTimeout(function(){
      // we want some proof, right?
      page.render(file);
      phantom.exit();
    },2000);
  }
});

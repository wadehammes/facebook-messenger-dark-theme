function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function toggleClass() {
  var darkEnabled = readCookie('dark');
  if (darkEnabled || document.querySelector('body').classList.contains('darkUI')) {
    document.querySelector('body').classList.remove('darkUI');
    eraseCookie('dark');
  } else {
    document.querySelector('body').classList.add('darkUI');
    createCookie('dark');
  }
  return false;
}

chrome.runtime.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // Create Elements
      var bodyElement = document.getElementsByTagName('body')[0];
      var toggleUI = document.createElement('span');
      var toggleText = document.createElement('span');

      // Set Attributes for Checkbox
      toggleUI.setAttribute('class','toggleUI');
      toggleUI.setAttribute('id', 'toggleUI');

      toggleText.setAttribute('class','toggleText');
      toggleText.innerHTML = 'Dark';

      // Append to body
      bodyElement.appendChild(toggleUI);
      toggleUI.appendChild(toggleText);

      // Build cookie for toggle rememberance
      var darkEnabled = readCookie('dark');
      if (darkEnabled) {
        document.querySelector('body').classList.add('darkUI');
      } else {
        document.querySelector('body').classList.remove('darkUI');
      }

      // Fire toggling of classes
      document.getElementById('toggleUI').onclick = toggleClass;
    }
  }, 10);
});

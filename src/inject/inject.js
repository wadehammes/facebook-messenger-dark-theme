function toggleClass() {
    if(document.querySelector('body').classList.contains('darkUI')) {
        document.querySelector('body').classList.remove('darkUI');
        document.getElementById('toggleUI').innerHTML = 'Dark';
    } else {
        document.querySelector('body').classList.add('darkUI');
        document.getElementById('toggleUI').innerHTML = 'Light';
    }
    return false;
}

chrome.runtime.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            var bodyElement = document.getElementsByTagName('body')[0];
            var toggleUI = document.createElement('span');

            toggleUI.setAttribute('class','toggleUI');
            toggleUI.setAttribute('id', 'toggleUI');
            toggleUI.innerHTML = 'Dark';

            bodyElement.appendChild(toggleUI);

            document.getElementById('toggleUI').onclick = toggleClass;
        }
    }, 10);
});

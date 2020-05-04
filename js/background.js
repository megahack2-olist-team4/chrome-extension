var commonQuestions;

// chrome.browserAction.onClicked.addListener(clickedIcon);
// function clickedIcon(tab) {
//   chrome.tabs.sendMessage(tab.id, {teste: 'hello'});
// }

function dispatchMessage(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, commonQuestions);

}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message !== 'common-questions') return;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      commonQuestions = JSON.parse(this.responseText);
      chrome.tabs.query({active: true, currentWindow: true}, dispatchMessage);
    }
  };
  xhttp.open('GET', 'https://megahack2-olist-team4.herokuapp.com/api/v1/sites', true);
  xhttp.send();

});

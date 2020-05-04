// chrome.browserAction.onClicked.addListener(clickedIcon);
// function clickedIcon(tab) {
//   chrome.tabs.sendMessage(tab.id, {teste: 'hello'});
// }

function dispatchMessage(tabs) {
  var commonQuestions = this;
  chrome.tabs.sendMessage(tabs[0].id, commonQuestions);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message !== 'common-questions') return;

  execAjax('get', 'https://megahack2-olist-team4.herokuapp.com/api/v1/sites/818e87db-5a07-4a21-85cc-585973a1b599', '', function(response) {
    chrome.tabs.query({active: true, currentWindow: true}, dispatchMessage.bind(response));
  });
});

function isJson(value) {
  var json;
  try {
    json = JSON.parse(value);
  } catch (e) {
    return false;
  }
  return typeof json === 'object';
}

function execAjax(method, url, parametros, returnFunction) {
  var parametrosURL = parametros === '' ? parametros : '&' + parametros;
    method = method.toUpperCase(),
    ajax = new XMLHttpRequest();

  ajax.open(method, url + parametrosURL, true);
  ajax.timeout = 10000;
  ajax.ontimeout = function() {
    console.log('Erro! Tempo excedido;');
  };

  if (method === 'GET') {
    ajax.send();
  } else {
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send(parametros);
  }

  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      if (ajax.response != '') {
        var response = isJson(ajax.response) ? JSON.parse(ajax.response) : ajax.response;
        returnFunction(response);
      }
    }
  };
}
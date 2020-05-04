(function () {

  var ecommerceKey = getEcommerceKey();
  console.log(ecommerceKey);

  if (notIsProductPage(ecommerceKey)) {
    return;
  }

  //cria o modal
  var search = getSearchData();
  var content = getHtmlContent(search, ecommerceKey);
  document.body.insertAdjacentHTML('afterbegin', content);

  // chrome.runtime.onMessage.addListener(clickedIcon);
  // function clickedIcon(message, sender, sendResponse) {
  //   console.log(message.teste);
  // }

  // perguntas frequentes
  chrome.runtime.onMessage.addListener(commonQuestions);
  function commonQuestions(message, sender, sendResponse) {
    console.log(message);
    
    var html = message.included.map((item) => document.querySelector(item.attributes.answer_xpath) ? `<div class="questions-item"><p>${item.attributes.description}</p><p>${document.querySelector(item.attributes.answer_xpath).textContent}</p></div>` : '').join('');
    document.querySelector('.questions').innerHTML = html;
    document.querySelector('.content > div:first-child').style.marginLeft = '-119%';
  }
  document
    .querySelector('.common-questions')
    .addEventListener('click', () => chrome.runtime.sendMessage('common-questions'));

  // Ancoras (ficha tecnica, descricao, preco, etc)
  var summaryItems = document.querySelectorAll('.summary-item');
  summaryItems.forEach((element) => {
    element.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (element.classList.contains('common-questions')) return;

      // var elementProp = $x(getSearchData(element.dataset.key, ecommerceKey));
      var elementProp = document.querySelectorAll(getSearchData(element.dataset.key, ecommerceKey)),
      elementInfo = elementProp[0].getBoundingClientRect();
      window.scrollTo(0, elementInfo.top + window.pageYOffset);

      // if (!element.dataset.key) return;      

      // var findTexts = getSearchData(element.dataset.key, ecommerceKey),
      //   isFicha = false,
      //   findResult = true;

      // for (var i = 0; i < findTexts.length; i++) {
      //   var findText = findTexts[i],
      //     findResult = true;

      //   while (!isFicha && findResult) {
      //     findResult = window.find(findText, false);
      //     isFicha = isFichaTecnica(findText);
      //   }

      //   if (isFicha) {
      //     break;
      //   }
      // }

      // if (!findResult) {
      //   alert('termo não encontrado');
      // }
    });
  });
})();

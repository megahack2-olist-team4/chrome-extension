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

    var html = message.included
      .map((item) =>
        document.querySelector(item.attributes.answer_xpath)
          ? `<div class="questions-item"><p>${item.attributes.description}</p><p>${
              document.querySelector(item.attributes.answer_xpath).textContent
            }</p></div>`
          : ''
      )
      .join('');
    document.querySelector('.questions').innerHTML = html;
    initQuestions();
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

  // Create an instance of mark.js and pass an argument containing
  // the DOM object of the context (where to search for matches)
  var markInstance = new Mark(document.querySelector('.questions'));
  // Cache DOM elements
  var keywordInput = document.querySelector('input.search-questions-entry');
  var optionInputs = document.querySelectorAll("input[name='opt[]']");

  function performMark() {
    // Read the keyword
    var keyword = keywordInput.value;

    // Determine selected options
    var options = {};
    [].forEach.call(optionInputs, function (opt) {
      options[opt.value] = opt.checked;
    });

    // Remove previous marked elements and mark
    // the new keyword inside the context
    markInstance.unmark({
      done: function () {
        markInstance.mark(keyword, options);
      },
    });
  }

  // Listen to input and option changes
  keywordInput.addEventListener('input', performMark);
  for (var i = 0; i < optionInputs.length; i++) {
    optionInputs[i].addEventListener('change', performMark);
  }

  function initQuestions() {
    function removeAccents(string) {
      let mapAccentsHex = {
        a: /[\xE0-\xE6]/g,
        A: /[\xC0-\xC6]/g,
        e: /[\xE8-\xEB]/g,
        E: /[\xC8-\xCB]/g,
        i: /[\xEC-\xEF]/g,
        I: /[\xCC-\xCF]/g,
        o: /[\xF2-\xF6]/g,
        O: /[\xD2-\xD6]/g,
        u: /[\xF9-\xFC]/g,
        U: /[\xD9-\xDC]/g,
        c: /\xE7/g,
        C: /\xC7/g,
        n: /\xF1/g,
        N: /\xD1/g,
      };

      for (let char in mapAccentsHex) {
        string = string.replace(mapAccentsHex[char], char);
      }

      return string;
    }

    var questions = document.querySelectorAll('.questions-item');
    document.querySelector('.search-questions-entry').addEventListener('input', function () {
      for (var i = 0; i < questions.length; i++) {
        questions[i].hidden =
          removeAccents(questions[i].textContent.toLowerCase()).indexOf(removeAccents(this.value).toLowerCase()) !== -1
            ? false
            : true;
      }
    });
  }


  

  // the input field
  var $input = $("input.search-entry"),
    // next button
    // $nextBtn = $("button.nextResult"),
    // the context where to search
    $content = $(".root-app"),
    // jQuery object to save <mark> elements
    $results,
    // the class that will be appended to the current
    // focused element
    currentClass = "current",
    // top offset for the jump (the search bar)
    offsetTop = 50,
    // the current index of the focused element
    currentIndex = 0;

  /**
   * Jumps to the element matching the currentIndex
   */
  function jumpTo() {
    if ($results.length) {
      var position,
        $current = $results.eq(currentIndex);
      $results.removeClass(currentClass);
      if ($current.length) {
        $current.addClass(currentClass);
        position = $current.offset().top - offsetTop;
        window.scrollTo(0, position);
      }
    }
  }

  /**
   * Searches for the entered keyword in the
   * specified context on input
   */
  $input.on("input", function() {
  	var searchVal = this.value;
    $content.unmark({
      done: function() {
        $content.mark(searchVal, {
          separateWordSearch: true,
          done: function() {
            $results = $content.find("mark");
            currentIndex = 0;
            jumpTo();
          }
        });
      }
    });
  });

  /**
   * Next and previous search jump to
   */
  //   $nextBtn.add($prevBtn).on("click", function() {
  //     if ($results.length) {
  //       currentIndex += $(this).is($prevBtn) ? -1 : 1;
  //       if (currentIndex < 0) {
  //         currentIndex = $results.length - 1;
  //       }
  //       if (currentIndex > $results.length - 1) {
  //         currentIndex = 0;
  //       }
  //       jumpTo();
  //     }
  //   });
  // });
})();

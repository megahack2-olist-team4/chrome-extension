var search = {
  fichaTecnica: {
    text: 'Caracteristicas',
    terms: ['ficha técnica', 'especificações técnicas', 'informações do produto', 'características principais'],
  },
  // descricao: {
  //   text: 'Descrição',
  //   terms: [],
  // },
};
var content = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  ::placeholder {
    color: #8C978F;
    letter-spacing: 0.02em;
    font-size: 16px;
    line-height: 24px;
  }
  .controller {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: #2F89FC;
    padding: 4px 8px 4px 4px;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    z-index: 9999;
  }
  .checkbox {
    
  }
  .content {
    position: fixed;
    top: 50%;
    right: 48px;
    transform: translateY(-50%);
    width: 292px;
    padding: 16px 24px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.24);
    border-radius: 8px;
    z-index: 9999;
    background-color: #FFF;
  }
  .search {
    position: relative;
  }
  .search-icon {
    position: absolute;
    left: 16px;
    top: -2px;
  }
  .search-entry {
    width: 100%;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #40514E;
    padding: 11px 16px 11px 56px;
    border: 1px solid transparent;
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.24);
    border-radius: 4px;
  }
  .search-entry:focus {
    border: 1px solid #2F89FC;
  }
  .summary {
    margin-top: 16px;
  }
  .summary-item {
    position: relative;
    border-bottom: 1px solid #F2F2F2;
    padding: 12px 32px 12px 0;
    cursor: pointer;
  }
  .summary-item:last-child {
    border-bottom: 0;
  }
  .summary-item:hover span {
    color: #2F89FC;
  }
  .summary-item:hover svg {
    right: -4px;
  }
  .summary-item span {
    font-size: 18px;
    line-height: 24px;
    color: #40514E;
    letter-spacing: 0.02em;
    transition: color .15s;
  }
  .summary-item svg {
    position: absolute;
    top: 12px;
    right: 0;
    transition: right .15s;
  }
</style>
<div id="teste">
  <label class="controller">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#30E3CA"></circle>
      <path d="M23.5006 11.7353C23.5006 11.8946 23.4513 12.1547 23.3258 12.5109C23.2033 12.8589 23.0186 13.2692 22.7751 13.7189C22.288 14.6182 21.5788 15.6504 20.7002 16.6255C18.9275 18.5929 16.5523 20.2353 14.0006 20.2353C11.4489 20.2353 9.07376 18.5929 7.301 16.6255C6.42245 15.6504 5.71317 14.6182 5.22612 13.7189C4.9826 13.2692 4.79796 12.8589 4.67538 12.5109C4.54993 12.1547 4.50061 11.8946 4.50061 11.7353C4.50061 11.7223 4.50089 11.7109 4.50136 11.701C4.54009 11.7013 4.60131 11.7059 4.69243 11.7234C5.10576 11.8025 5.71629 12.0531 6.55654 12.3978C6.6165 12.4225 6.67763 12.4475 6.73994 12.4731C8.54818 13.2141 11.1304 14.2353 14.0006 14.2353C16.8708 14.2353 19.453 13.2141 21.2613 12.4731C21.3236 12.4475 21.3847 12.4224 21.4447 12.3978C22.2849 12.0531 22.8955 11.8025 23.3088 11.7234C23.3999 11.7059 23.4611 11.7013 23.4999 11.701C23.5003 11.7109 23.5006 11.7223 23.5006 11.7353ZM4.50972 11.6406C4.50983 11.6408 4.50934 11.6427 4.50795 11.6457C4.50892 11.642 4.50961 11.6405 4.50972 11.6406ZM23.4915 11.6406C23.4916 11.6405 23.4923 11.642 23.4933 11.6457C23.4919 11.6426 23.4914 11.6408 23.4915 11.6406Z" stroke="#F5F5F5"></path>
      <path d="M18.1086 25.5439C17.9492 25.5439 17.6892 25.4945 17.333 25.3691C16.9849 25.2465 16.5746 25.0619 16.125 24.8183C15.2256 24.3313 14.1934 23.622 13.2184 22.7435C11.251 20.9707 9.60858 18.5956 9.60858 16.0439C9.60858 13.4922 11.251 11.117 13.2184 9.34424C14.1934 8.4657 15.2256 7.75642 16.125 7.26937C16.5746 7.02584 16.9849 6.84121 17.333 6.71862C17.6892 6.59318 17.9492 6.54385 18.1086 6.54385C18.1216 6.54385 18.1329 6.54414 18.1429 6.5446C18.1425 6.58333 18.1379 6.64456 18.1205 6.73567C18.0413 7.149 17.7908 7.75954 17.446 8.59978C17.4214 8.65974 17.3963 8.72087 17.3708 8.78318C16.6298 10.5914 15.6086 13.1736 15.6086 16.0439C15.6086 18.9141 16.6298 21.4963 17.3708 23.3045C17.3963 23.3668 17.4214 23.428 17.446 23.4879C17.7908 24.3282 18.0413 24.9387 18.1205 25.352C18.1379 25.4431 18.1425 25.5044 18.1429 25.5431C18.1329 25.5436 18.1216 25.5439 18.1086 25.5439ZM18.2032 6.55296C18.2031 6.55307 18.2012 6.55259 18.1981 6.55119C18.2018 6.55216 18.2034 6.55286 18.2032 6.55296ZM18.2032 25.5347C18.2034 25.5349 18.2018 25.5355 18.1981 25.5365C18.2012 25.5351 18.2031 25.5346 18.2032 25.5347Z" stroke="#F5F5F5"></path>
    </svg>
  </label>
  <div class="content">
    <label class="search">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#40514E" class="search-icon">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
      </svg>
      <input type="text" placeholder="Buscar na página..." class="search-entry">
    </label>
    <div class="summary">
      ${Object.keys(search)
        .map(
          (key) => `
            <div class="summary-item" data-key="${key}">
              <span>${search[key].text}</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#A5AEA6">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </div>
          `
        )
        .join('')}
        <div class="summary-item common-questions">
          <span>Perguntas frequentes</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#A5AEA6">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </div>

    </div>
  </div>
</div>
`;
document.body.insertAdjacentHTML('afterbegin', content);

// chrome.runtime.onMessage.addListener(clickedIcon);
// function clickedIcon(message, sender, sendResponse) {
//   console.log(message.teste);
// }

// perguntas frequentes
chrome.runtime.onMessage.addListener(commonQuestions);
function commonQuestions(message, sender, sendResponse) {
  var html = message.data.map((item)=>`<p>${item.attributes.name}</p>`).join('');
  document.querySelector('.summary').innerHTML = html;
  
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

    if (!element.dataset.key) return;

    var findTexts = search[element.dataset.key].terms,
      isFicha = false,
      findResult = true;

    for (var i = 0; i < findTexts.length; i++) {
      var findText = findTexts[i],
        findResult = true;

      while (!isFicha && findResult) {
        findResult = window.find(findText, false);
        isFicha = isFichaTecnica(findText);
      }
      if (isFicha) {
        break;
      }
    }

    if (!findResult) {
      alert('termo não encontrado');
    }
  });
});

function isFichaTecnica(findText) {
  var selection = window.getSelection(),
    parent = selection.getRangeAt(0).commonAncestorContainer;
  console.log(parent.textContent.trim().toLowerCase());
  console.log(findText.trim().toLowerCase());
  return parent.textContent.trim().toLowerCase() == findText.trim().toLowerCase();
}

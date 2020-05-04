function notIsProductPage() {
  var hostName = window.location.hostname,
    urlParams = window.location.search,
    result = false;

  //carrefour, mercado livre /p/


  if (['www.pontofrio.com.br', 'www.extra.com.br', 'www.casasbahia.com.br'].indexOf(hostName) !== -1 &&
  urlParams.indexOf('IdSku') === -1) {
    result = true;
  } else if (['www.mercadolivre.com.br'].indexOf(hostName) !== -1 &&
  urlParams.indexOf('type=product') === -1) {
    retult = true;
  }
  
  return result;
}

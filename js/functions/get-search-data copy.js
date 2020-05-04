function getSearchData(key, ecommerceKey) {
  var data = {
    descricao: {
      text: 'Descrição',
      terms: {
        mercadolivre: [],
      },
    },
    cores: {
      text: 'Cores',
      terms: {
        mercadolivre: [],
      },
    },
    avaliacoes: {
      text: 'Avaliações',
      terms: {
        mercadolivre: [
          'Opiniões sobre o produto', // mercado livre
        ],
        // 'AVALIAÇÃO DOS CLIENTES', //ponto frio
        // 'avaliações', // americanas
      },
    },
    fichaTecnica: {
      text: 'Características',
      terms: {
        mercadolivre: ['Características principais'],
        // 'ficha técnica',
        // 'especificações técnicas',
        // 'informações do produto',
        // 'características principais'
      },
    },
  };
  debugger;
  return key && ecommerceKey ? data[key].terms[ecommerceKey] : data;
}

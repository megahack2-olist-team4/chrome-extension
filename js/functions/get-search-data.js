function getSearchData(key, ecommerceKey) {
  var data = {
    descricao: {
      text: 'Descrição',
      terms: {
        mercadolivre: [
          '//*[@id="root-app"]/div/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/h1',
          '#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div.ui-pdp-container__row.ui-pdp--relative.ui-pdp-with--separator--fluid.pb-40 > div.ui-pdp-container__col.col-3.pb-40 > div.ui-pdp-container__row.ui-pdp-with--separator--fluid.ui-pdp-with--separator--48 > div.ui-pdp-container__col.col-2.mr-32 > div.ui-pdp-container__top-wrapper.mt-40 > div.ui-pdp-header > h1'
        ],
      },
    },
    cores: {
      text: 'Cores',
      terms: {
        mercadolivre: [
          '//*[@id="root-app"]/div/div[2]/div[1]/div[1]/div[4]/div/div/div[1]/table/tbody/tr[5]/th',
          '#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div.ui-pdp-container__row.ui-pdp--relative.ui-pdp-with--separator--fluid.pb-40 > div.ui-pdp-container__col.col-3.pb-40 > div:nth-child(4) > div > div > div.ui-pdp-specs__table > table > tbody > tr:nth-child(5) > th'
        ]
      },
    },
    avaliacoes: {
      text: 'Avaliações',
      terms: {
        mercadolivre: [
          '//*[@id="root-app"]/div/div[2]/div[3]/div[1]/div[1]/div/section/header/h2',
          '#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div:nth-child(3) > div.ui-pdp-container__col.col-3 > div:nth-child(1) > div > section > header > h2'
        ]
      },
    },
    fichaTecnica: {
      text: 'Características',
      terms: {
        mercadolivre: [
          '//*[@id="root-app"]/div/div[2]/div[1]/div[1]/div[4]/div/div/h2',
          '#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div.ui-pdp-container__row.ui-pdp--relative.ui-pdp-with--separator--fluid.pb-40 > div.ui-pdp-container__col.col-3.pb-40 > div:nth-child(4) > div > div > h2'
        ]
      }
    },
  };

  // return key && ecommerceKey ? data[key].terms[ecommerceKey] : data;
  return key && ecommerceKey ? data[key].terms[ecommerceKey][1] : data;
}

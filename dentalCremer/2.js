const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  await fs.promises.mkdir(`listsCr/${timestamp}`, { recursive: true })
  const URLArray = [];

  // links to item page
  URLArray.push([
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-ceramico-edgewise.html',
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-ceramico-mbt.html',
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-ceramico-roth.html',
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-composite-roth.html',
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-de-aco-edgewise.html',
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-de-aco-mbt.html?p=1',
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-de-aco-mbt.html?p=2',
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-de-aco-roth.html?p=1',
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-de-aco-roth.html?p=2',
    'https://www.dentalcremer.com.br/ortodontia/braquete-reposicao/braquete-de-aco-roth.html?p=3',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/dentistica-e-estetica/resina-composta.html?p=1',
    'https://www.dentalcremer.com.br/dentistica-e-estetica/resina-composta.html?p=2',
    'https://www.dentalcremer.com.br/dentistica-e-estetica/resina-composta.html?p=3',
    'https://www.dentalcremer.com.br/dentistica-e-estetica/resina-composta.html?p=4',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/dentistica-e-estetica/aplicador-descartavel.html', // Microbrush
    'https://www.dentalcremer.com.br/instrumentais/aplicador.html', // Microbrush
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/cimentos/restaurador-provisorio.html?p=1',
    'https://www.dentalcremer.com.br/cimentos/restaurador-provisorio.html?p=2', 
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/biosseguranca/embalagem-para-esterilizacao.html?p=1',
    'https://www.dentalcremer.com.br/biosseguranca/embalagem-para-esterilizacao.html?p=2',
    'https://www.dentalcremer.com.br/biosseguranca/embalagem-para-esterilizacao.html?p=3',
    'https://www.dentalcremer.com.br/biosseguranca/embalagem-para-esterilizacao.html?p=4',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/dentistica-e-estetica/tira-de-lixa.html?p=1',
    'https://www.dentalcremer.com.br/dentistica-e-estetica/tira-de-lixa.html?p=2',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/dentistica-e-estetica/matriz.html?p=1',
    'https://www.dentalcremer.com.br/dentistica-e-estetica/matriz.html?p=2',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/dentistica-e-estetica/ionomero-de-vidro.html?p=1',
    'https://www.dentalcremer.com.br/dentistica-e-estetica/ionomero-de-vidro.html?p=2',
    'https://www.dentalcremer.com.br/dentistica-e-estetica/ionomero-de-vidro.html?p=3',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/dentistica-e-estetica/acido.html?p=1',
    'https://www.dentalcremer.com.br/dentistica-e-estetica/acido.html?p=2',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/protese/resina-acrilica.html?p=1',
    'https://www.dentalcremer.com.br/protese/resina-acrilica.html?p=2',
    'https://www.dentalcremer.com.br/protese/resina-acrilica.html?p=3',
    'https://www.dentalcremer.com.br/protese/resina-acrilica.html?p=4',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/protese/gesso.html?p=1',
    'https://www.dentalcremer.com.br/protese/gesso.html?p=2',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/protese/cera.html?p=1',
    'https://www.dentalcremer.com.br/protese/cera.html?p=2',
    'https://www.dentalcremer.com.br/protese/cera.html?p=3',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/protese/pino-de-fibra-de-carbono.html',
    'https://www.dentalcremer.com.br/protese/pino-de-fibra-de-vidro.html?p=1',
    'https://www.dentalcremer.com.br/protese/pino-de-fibra-de-vidro.html?p=2',
  ])

  URLArray.push([
    'https://www.dentalcremer.com.br/cimentos/cimento-resinoso.html?p=1',
    'https://www.dentalcremer.com.br/cimentos/cimento-resinoso.html?p=2',

  ])


  const browser = await puppeteer.launch();
  let totalObject = []

  for(let URLArrayIndex = 0; URLArrayIndex < URLArray.length; URLArrayIndex++) {
    let totalObjectResetIndex = 0;
    for(URL of URLArray[URLArrayIndex]) {
      
      // format JSON file name.
      function jsonFileName(URLArrayIndex) {
        switch (URLArrayIndex) {
          case 0:
            return `cr-${URL.slice(32, ).split("/")[1]}`; 
          case 1:
            return `cr-${URL.slice(32, -9).split("/")[1]}`;
          case 2:
            return `cr-aplicadores`;
          case 3:
            return `cr-restaurador-provisorio.html`;
          case 4:
            return `cr-embalagem-para-esterilizacao.html`;
          case 5:
            return `cr-tira-de-lixa.html`;
          case 6:
            return `cr-matriz.html`;
          case 7:
            return `cr-ionomero-de-vidro.html`;
          case 8:
            return `cr-acido.html`;
          case 9:
            return `cr-resina-acrilica.html`;
          case 10:
            return `cr-gesso.html`;
          case 11:
            return `cr-cera.html`;
          case 12:
            return `cr-pino-de-fibra.html`;
          case 13:
            return `cr-cimento-resinoso.html`;          
          }
      }
      console.log(jsonFileName(URLArrayIndex))

      if (totalObjectResetIndex != URLArrayIndex) {
        totalObject = [];
      }
  
      const page = await browser.newPage();
      await page.goto(URL);
  
      const productList = await page.evaluate(async () => {
        // time object build
        const today = new Date()
        const stringifiedTimeData = JSON.stringify(today)
        const mins = today.getMinutes()
        const hours = today.getHours()
        const theDate = today.getDate();
        const theMonth = today.getMonth() + 1;
        const theYear = today.getFullYear();
        const theDay = today.getDay(); //day of the week
        const timeData = {stringifiedTimeData, mins, hours, theDate, theMonth, theYear, theDay }
        
        // scraping part
        const titleList = document.querySelectorAll('ol.products strong.product.name')
        const titleArray = [...titleList]
        const titleObject = titleArray.map(t => {
          return t.textContent
        }) 
  
        const detailsList = document.querySelectorAll('ol.products div.product.description')
        const detailsArray = [...detailsList]
        const detailsObject = detailsArray.map(t => {
          return t.textContent
        })
  
        const priceList = document.querySelectorAll('div.products div.price-box span.price')
        const antiPriceList = document.querySelectorAll('div.products div.price-box span.old-price span.price')
        const priceArray = [...priceList]
        const antiPriceArray = [...antiPriceList]
        for(antiPrice of antiPriceArray) {
          priceArray.map((p, index) => {
            if(p === antiPrice) {
              priceArray.splice(index, 1)
            }
          })
        }
        const priceObject = priceArray.map(h => {
          return h.textContent
        })
  
        const linkList = document.querySelectorAll('ol.products a.product.photo')
        const linkArray = [...linkList]
        const linkObject = linkArray.map(h => {
          return h.href
        })
  
        const imgList = document.querySelectorAll('ol.products img.owl-lazy.product-image-photo')
        const imgArray = [...imgList]
        const imgObject = imgArray.map(t => {
          return t.src
        })
        
        const productObject = []
        let i;
        for (i = 0; i < titleObject.length; i += 1) {
          productObject.push({
            id: i,
            title: titleObject[i],
            details: detailsObject[i],
            price: priceObject[i],
            href: linkObject[i],
            img: imgObject[i], 
            time: timeData,
          })
        }
  
        return [productObject, timeData]
      })

      for (i = 0; i < productList[0].length; i += 1) {
      totalObject.push(productList[0][i])
      }

      fs.writeFile(`listsCr/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(totalObject, null, 2), err => {
        if (err) throw new Error('something went wrong')
        console.log('well done!')
      })
      totalObjectResetIndex = URLArrayIndex;
    }
  }
  console.log('the end')
  browser.close();
})();




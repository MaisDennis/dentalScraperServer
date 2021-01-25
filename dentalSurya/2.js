const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  await fs.promises.mkdir(`listsSu/${timestamp}`, { recursive: true })
  const URLArray = [];
  
  // links to item page
  URLArray.push([
    'https://www.suryadental.com.br/ortodontia/orthometric.html?p=1',
    'https://www.suryadental.com.br/ortodontia/orthometric.html?p=2',
    'https://www.suryadental.com.br/ortodontia/orthometric.html?p=3',
    'https://www.suryadental.com.br/ortodontia/orthometric.html?p=4',
    'https://www.suryadental.com.br/ortodontia/orthometric.html?p=5',
    'https://www.suryadental.com.br/ortodontia/orthometric.html?p=6',
    'https://www.suryadental.com.br/ortodontia/orthometric.html?p=7',
    'https://www.suryadental.com.br/ortodontia/eurodonto.html?p=1',
    'https://www.suryadental.com.br/ortodontia/eurodonto.html?p=2',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=1',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=2',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=3',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=4',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=5',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=6',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=7',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=8',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=9',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=10',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=11',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=12',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=13',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=14',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=15',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=16',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=17',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=18',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=19',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=20',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=21',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=22',
    'https://www.suryadental.com.br/ortodontia/morelli.html?p=23',
  ])


  URLArray.push([
    'https://www.suryadental.com.br/dentistica-e-estetica/ionomeros.html?p=1',
    'https://www.suryadental.com.br/dentistica-e-estetica/ionomeros.html?p=2',
  ])

  URLArray.push([
    'https://www.suryadental.com.br/dentistica-e-estetica/resinas.html?p=1',
    'https://www.suryadental.com.br/dentistica-e-estetica/resinas.html?p=2',
    'https://www.suryadental.com.br/dentistica-e-estetica/resinas.html?p=3',
    'https://www.suryadental.com.br/dentistica-e-estetica/resinas.html?p=4',
    'https://www.suryadental.com.br/dentistica-e-estetica/resinas.html?p=5',
  ])

  URLArray.push([
    'https://www.suryadental.com.br/dentistica-e-estetica/matrizes-aco.html?p=1',
    'https://www.suryadental.com.br/dentistica-e-estetica/matrizes-aco.html?p=2',
  ])

  URLArray.push([
    'https://www.suryadental.com.br/descartaveis/fio-de-sutura.html?p=1',
    'https://www.suryadental.com.br/descartaveis/fio-de-sutura.html?p=2',
  ])

  URLArray.push([
    'https://www.suryadental.com.br/descartaveis/luvas-procedimento-nitrilo.html',
    'https://www.suryadental.com.br/descartaveis/luva-latex-para-procedimentos.html',
    'https://www.suryadental.com.br/descartaveis/luva-de-vinil-para-procedimentos.html', // juntar em luvas de procedimento
  ])

  URLArray.push([
    'https://www.suryadental.com.br/protese-laboratorial/resina-acrilica-para-moldeiras.html',
    'https://www.suryadental.com.br/protese-laboratorial/resinas-acrilicas-caracterizacao.html',
    'https://www.suryadental.com.br/protese-clinica-e-implante/resinas-acrilicas-provisorias.html',
  ])

  URLArray.push([
    'https://www.suryadental.com.br/protese-laboratorial/gesso.html?p=1',
    'https://www.suryadental.com.br/protese-laboratorial/gesso.html?p=2',
    'https://www.suryadental.com.br/protese-laboratorial/gesso.html?p=3',
  ])

  URLArray.push([
    'https://www.suryadental.com.br/protese-laboratorial/ceras.html?p=1',
    'https://www.suryadental.com.br/protese-laboratorial/ceras.html?p=2',
    'https://www.suryadental.com.br/protese-laboratorial/ceras.html?p=3',
    'https://www.suryadental.com.br/protese-laboratorial/ceras.html?p=4',
    'https://www.suryadental.com.br/protese-laboratorial/ceras.html?p=5',
  ])

  URLArray.push([
    'https://www.suryadental.com.br/dentistica-e-estetica/pino-de-fibra-de-vidro.html?p=1',
    'https://www.suryadental.com.br/dentistica-e-estetica/pino-de-fibra-de-vidro.html?p=2',
  ])

  URLArray.push([ // alginato, silicone de adição e condensação.
  'https://www.suryadental.com.br/protese-clinica-e-implante/moldagem.html?p=1',
  'https://www.suryadental.com.br/protese-clinica-e-implante/moldagem.html?p=2',
  'https://www.suryadental.com.br/protese-clinica-e-implante/moldagem.html?p=3',
  'https://www.suryadental.com.br/protese-clinica-e-implante/moldagem.html?p=4',
  'https://www.suryadental.com.br/protese-clinica-e-implante/moldagem.html?p=5',
  'https://www.suryadental.com.br/protese-clinica-e-implante/moldagem.html?p=6',
  'https://www.suryadental.com.br/protese-clinica-e-implante/moldagem.html?p=7',
  'https://www.suryadental.com.br/protese-clinica-e-implante/moldagem.html?p=8',
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
            return `su-braquete-reposicao`;  
          case 1:
            return `su-ionomeros`;
          case 2:
            return `su-resinas`;
          case 3:
            return `su-matriz`;
          case 4:
            return `su-fio-de-sutura`;
          case 5:
            return `su-luva-de-procedimento`;  
          case 6:
            return `su-resina-acrilica`;  
          case 7:
            return `su-gesso`;  
          case 8:
            return `su-cera`;  
          case 9:
            return `su-pino-de-fibra`;  
          case 10:
            return `su-alginato-silicones`;  
                    

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
        const titleList = document.querySelectorAll('ul.row h3 a')
        const titleArray = [...titleList]
        const titleObject = titleArray.map(t => {
          return t.textContent
        })
  
        const priceList = document.querySelectorAll('ul.row div.product-price-on')
        const priceArray = [...priceList]
        const priceObject = priceArray.map(h => {
          return h.textContent
        })
  
        const linkList = document.querySelectorAll('ul.row h3 a')
        const linkArray = [...linkList]
        const linkObject = linkArray.map(t => {
          return t.href
        })
  
        const imgList = document.querySelectorAll('ul.row div.product-image img')
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

      // log for testing
      // console.log(totalObject)

      fs.writeFile(`listsSu/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(totalObject, null, 2), err => {
        if (err) throw new Error('something went wrong')
        console.log('well done!')
      })

      totalObjectResetIndex = URLArrayIndex;
    }
  }
  console.log('the end')
  browser.close();
})();
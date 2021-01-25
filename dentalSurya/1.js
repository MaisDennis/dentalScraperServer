const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  await fs.promises.mkdir(`listsSu/${timestamp}`, { recursive: true })
  const URLArray = [];

  URLArray.push([
    'https://www.suryadental.com.br/descartaveis/sugadores-cirurgicos-plasticos.html',
    'https://www.suryadental.com.br/descartaveis/gazes.html',
    'https://www.suryadental.com.br/descartaveis/agulhas-gengivais.html',
    'https://www.suryadental.com.br/anestesicos-e-medicamentos/anestesicos.html',
    'https://www.suryadental.com.br/descartaveis/pinceis-microaplicadores.html',
    'https://www.suryadental.com.br/descartaveis/luvas-cirurgicas-estereis.html',
    'https://www.suryadental.com.br/dentistica-e-estetica/tiras-de-poliester.html',
    'https://www.suryadental.com.br/dentistica-e-estetica/acidos.html',
    'https://www.suryadental.com.br/dentistica-e-estetica/cunha.html',
    'https://www.suryadental.com.br/descartaveis/lencol-de-borracha.html',
    'https://www.suryadental.com.br/endodontia/obturadores-restauradores.html',
    'https://www.suryadental.com.br/diversos/esterilizacao.html', // filtrar agua destilada
    'https://www.suryadental.com.br/descartaveis/algodoes.html', // filtrar rolete
    'https://www.suryadental.com.br/endodontia/filme-radiografico.html',

    // 'https://www.suryadental.com.br/protese-laboratorial/muralhas.html', // silicone de adição e condensação
    'https://www.suryadental.com.br/#&search-term=pino%20met%C3%A1lico', // pino metálico
    'https://www.suryadental.com.br/protese-clinica-e-implante/cimentos-zinco.html',
    'https://www.suryadental.com.br/protese-clinica-e-implante/cimentos-resinosos.html',
    'https://www.suryadental.com.br/protese-clinica-e-implante/cimentos-temporarios.html',
    'https://www.suryadental.com.br/protese-laboratorial/acessorios.html?p=9#&search-term=alginato' // alginato
    
  ])

  const browser = await puppeteer.launch();

  for(let URLArrayIndex = 0; URLArrayIndex < URLArray.length; URLArrayIndex++) {
    for (URL of URLArray[URLArrayIndex]) {
      // format JSON file name.
      function jsonFileName(URLArrayIndex) {
        switch (URLArrayIndex) {
          case 0:
            return `su-${URL.slice(32, ).split("/")[1]}`; 
          // case 1:
          //   return `su-${URL.slice(32, ).split("/")[1]}`;
        }
      }
      console.log(jsonFileName(URLArrayIndex)) 
      
      const page = await browser.newPage();
      await page.goto(URL);
  
      const productList = await page.evaluate(() => {
        const today = new Date()
        const stringifiedTimeData = JSON.stringify(today)
        const mins = today.getMinutes()
        const hours = today.getHours()
        const theDate = today.getDate();
        const theMonth = today.getMonth() + 1;
        const theYear = today.getFullYear();
        const theDay = today.getDay(); //day of the week
        
        const timeData = {stringifiedTimeData, mins, hours, theDate, theMonth, theYear, theDay }
        
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
      // console.log(productList)
      fs.writeFile(`listsSu/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(productList[0], null, 2), err => {
        if (err) throw new Error('something went wrong')
        console.log('well done!')
      })
    }
  }
  console.log('the end')
  await browser.close();
})();
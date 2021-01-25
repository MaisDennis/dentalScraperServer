const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  await fs.promises.mkdir(`listsCi/${timestamp}`, { recursive: true })
  const URLArray = [];

  URLArray.push([
    'https://www.dentalecia.com.br/descartaveis/sugador-descartavel',
    'https://www.dentalecia.com.br/descartaveis/compressa-descartavel',
    'https://www.dentalecia.com.br/descartaveis/agulhas',
    
    'https://www.dentalecia.com.br/dentistica-e-estetica/aplicador-descartavel',
    'https://www.dentalecia.com.br/endodontia/lencol-de-borracha--endodontia-',
    'https://www.dentalecia.com.br/cirurgia-e-periodontia/fio-de-sutura-agulhado',
    'https://www.dentalecia.com.br/cimentos/cimento-provisorio',
    'https://www.dentalecia.com.br/dentistica-e-estetica/acido',
    'https://www.dentalecia.com.br/dentistica-e-estetica/cunhas',
    'https://www.dentalecia.com.br/dentistica-e-estetica/discos-de-lixa',
    'https://www.dentalecia.com.br/dentistica-e-estetica/ionomero-de-vidro',
    'https://www.dentalecia.com.br/biosseguranca/embalagem-p--esterilizacao',
    'https://www.dentalecia.com.br/descartaveis/algodao',
    'https://www.dentalecia.com.br/moldagem/alginato?PS=16',
    'https://www.dentalecia.com.br/moldagem/silicone-de-adicao?PS=16',
    'https://www.dentalecia.com.br/moldagem/silicone-de-condensacao?PS=16',
    
    'https://www.dentalecia.com.br/cimentos/cimento-resinoso',
    'https://www.dentalecia.com.br/cimentos/cimento-provisorio',
    'https://www.dentalecia.com.br/cimentos/cimento-fosfato-de-zinco',
    'https://www.dentalecia.com.br/ortodontia/braquete',
    'https://www.dentalecia.com.br/premium/resina-composta',
    'https://www.dentalecia.com.br/dentistica-e-estetica/matriz',

    
    // 'https://www.dentalecia.com.br/categoria/descartaveis/sugador-descartavel',
    // 'https://www.dentalecia.com.br/categoria/descartaveis/compressa-descartavel',
    // 'https://www.dentalecia.com.br/categoria/descartaveis/agulhas',
    // 'https://www.dentalecia.com.br/categoria/anestesicos',
    // 'https://www.dentalecia.com.br/categoria/dentistica-e-estetica/aplicador-descartavel',
    // 'https://www.dentalecia.com.br/categoria/radiologia/acessorios-p-raio-x',
    // // agua
    // 'https://www.dentalecia.com.br/categoria/endodontia/lencol-de-borracha-endodontia',
    // 'https://www.dentalecia.com.br/categoria/cirurgia-e-periodontia/fio-de-sutura-agulhado',
    // 'https://www.dentalecia.com.br/categoria/cimentos/cimento-provisorio',
    // 'https://www.dentalecia.com.br/categoria/dentistica-e-estetica/acido',
    // 'https://www.dentalecia.com.br/categoria/dentistica-e-estetica/cunhas',
    // 'https://www.dentalecia.com.br/categoria/dentistica-e-estetica/tira-de-lixa',
    // 'https://www.dentalecia.com.br/categoria/dentistica-e-estetica/ionomero-de-vidro',
    // 'https://www.dentalecia.com.br/categoria/biosseguranca-e-estojos/embalagem-p-esterilizacao',
    // 'https://www.dentalecia.com.br/categoria/descartaveis/algodao',
    // 'https://www.dentalecia.com.br/categoria/cimentos/cimento-provisorio',

    // 'https://www.dentalecia.com.br/categoria/protese/resina-acrilica',
    // 'https://www.dentalecia.com.br/categoria/moldagem/alginato-moldagem',
    // 'https://www.dentalecia.com.br/categoria/protese/gesso',
    // 'https://www.dentalecia.com.br/categoria/protese/pino-fibra-de-vidro',
    // 'https://www.dentalecia.com.br/categoria/protese/pino-metalico',
    // 'https://www.dentalecia.com.br/categoria/cimentos/cimento-resinoso',
    // 'https://www.dentalecia.com.br/categoria/cimentos/cimento-provisorio',
    // 'https://www.dentalecia.com.br/categoria/cimentos/cimento-fosfato-de-zinco',
  ])

  URLArray.push([
    // 'https://www.dentalecia.com.br/categoria/anestesicos',              
    'https://www.dentalecia.com.br/anestesico',
    'https://www.dentalecia.com.br/gesso',
    'https://www.dentalecia.com.br/pino%20de%20fibra',
    'https://www.dentalecia.com.br/pino%20metalico',
    'https://www.dentalecia.com.br/cera',

  ])

  const browser = await puppeteer.launch();

  for(let URLArrayIndex = 0; URLArrayIndex < URLArray.length; URLArrayIndex++) {
    for (URL of URLArray[URLArrayIndex]) {
      // format JSON file name.
      function jsonFileName(URLArrayIndex) {
        switch (URLArrayIndex) {
          case 0:
            return `ci-${URL.slice(32, ).split("/")[1]}`; 
          case 1:
            return `ci-${URL.slice(30, ).split("/")[0]}`;
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
        
        const titleList = document.querySelectorAll('div.vitrine h3 a')
        const titleArray = [...titleList]
        const titleObject = titleArray.map(t => {
          return t.textContent
        })
  
        const priceList = document.querySelectorAll('div.vitrine ul p.product__price span.product__newPrice')
        const priceArray = [...priceList]
        const priceObject = priceArray.map(h => {
          return h.textContent
        })
  
        const linkList = document.querySelectorAll('div.vitrine h3 a')
        const linkArray = [...linkList]
        const linkObject = linkArray.map(t => {
          return t.href
        })
  
        const imgList = document.querySelectorAll('div.vitrine div.product__image img')
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
      fs.writeFile(`listsCi/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(productList[0], null, 2), err => {
        if (err) throw new Error('something went wrong')
        console.log('well done!')
      })
    }
  }
  console.log('the end')
  await browser.close();
})();
const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  await fs.promises.mkdir(`listsCr/${timestamp}`, { recursive: true })
  const URLArray = [];
  
  // links to item page
  URLArray.push([
    'https://www.dentalcremer.com.br/descartaveis/luva-de-procedimento.html',
    'https://www.dentalcremer.com.br/descartaveis/luva-cirurgica-esteril.html',
    'https://www.dentalcremer.com.br/descartaveis/sugador-descartavel.html',
    'https://www.dentalcremer.com.br/descartaveis/rolo-dental.html',
    'https://www.dentalcremer.com.br/descartaveis/compressa-descartavel.html',
    'https://www.dentalcremer.com.br/dentistica-e-estetica/cunha.html',    
    'https://www.dentalcremer.com.br/anestesicos-e-agulha-gengival/agulha-gengival.html',
    'https://www.dentalcremer.com.br/anestesicos-e-agulha-gengival/anestesico.html',
    'https://www.dentalcremer.com.br/radiologia/acessorio-para-raio-x.html',
    'https://www.dentalcremer.com.br/radiologia/filme-radiografico.html',
    'https://www.dentalcremer.com.br/biosseguranca/agua-destilada.html',
    'https://www.dentalcremer.com.br/endodontia/lencol-de-borracha-para-endodontia.html',
    'https://www.dentalcremer.com.br/cirurgia-e-periodontia/fio-de-sutura-agulhado.html',

    'https://www.dentalcremer.com.br/moldagem/alginato.html',
    'https://www.dentalcremer.com.br/moldagem/silicone-de-adicao.html',
    'https://www.dentalcremer.com.br/moldagem/silicone-de-condensacao.html',
    'https://www.dentalcremer.com.br/protese/pino-metalico.html',
    'https://www.dentalcremer.com.br/cimentos/cimento-provisorio.html',
    'https://www.dentalcremer.com.br/cimentos/cimento-fosfato-de-zinco.html'
  ])

  const browser = await puppeteer.launch();
  
  for(let URLArrayIndex = 0; URLArrayIndex < URLArray.length; URLArrayIndex++) {
    for(URL of URLArray[URLArrayIndex]) {

      // format JSON file name.
      function jsonFileName(URLArrayIndex) {
        switch (URLArrayIndex) {
          case 0:
            return `cr-${URL.slice(32, ).split("/")[1]}`; 
        }
      }
      console.log(jsonFileName(URLArrayIndex))
  
      const page = await browser.newPage();
      await page.goto(URL);
  
      const productList = await page.evaluate(async () => {
        const today = new Date()
        const stringifiedTimeData = JSON.stringify(today)
        const mins = today.getMinutes()
        const hours = today.getHours()
        const theDate = today.getDate();
        const theMonth = today.getMonth() + 1;
        const theYear = today.getFullYear();
        const theDay = today.getDay(); //day of the week
        const timeData = {stringifiedTimeData, mins, hours, theDate, theMonth, theYear, theDay }
        
        const titleList = document.querySelectorAll('div.products strong.product.name')
        const titleArray = [...titleList]
        const titleObject = titleArray.map(t => {
          return t.textContent
        })
        
  
        const detailsList = document.querySelectorAll('div.products div.product.description')
        const detailsArray = [...detailsList]
        const detailsObject = detailsArray.map(t => {
          return t.textContent
        })
               
        const priceList = document.querySelectorAll('div.products div.price-box span.price')
        const antiPriceList = document.querySelectorAll('div.products div.price-box span.old-price span.price')
        const priceArray = [...priceList]
        const antiPriceArray = [...antiPriceList]
        // if(antiPriceArray !== null) {
          for(antiPrice of antiPriceArray) {
            priceArray.map((p, index) => {
              if(p === antiPrice) {
                priceArray.splice(index, 1)
              }
            })
          }
        // }
        
        const priceObject = priceArray.map(h => {
          return h.textContent
        })

        const linkList = document.querySelectorAll('div.products a.product')
        const linkArray = [...linkList]
        const linkObject = linkArray.map(h => {
          return h.href
        })
  
        const imgList = document.querySelectorAll('div.products img.owl-lazy')
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
        // return priceObject;
      })
      // console.log(productList)
      fs.writeFile(`listsCr/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(productList[0], null, 1), err => {
        if (err) throw new Error('something went wrong')
        console.log('well done!')
      })
    }
  }
  console.log('the end')
  browser.close();
})();
const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  await fs.promises.mkdir(`listsCi/${timestamp}`, { recursive: true })
  const URLArray = [];
  
  // links to item page
  URLArray.push([
    'https://www.dentalecia.com.br/categoria/ortodontia/braquete?viewList=g&pageNumber=1&pageSize=12&category=120788&labelFilter=%5B%5D',
    'https://www.dentalecia.com.br/categoria/ortodontia/braquete?viewList=g&pageNumber=2&pageSize=12&category=120788&labelFilter=%5B%5D',
  ])

  URLArray.push([
    'https://www.dentalecia.com.br/categoria/resinas/resina-composta?viewList=g&pageNumber=1&pageSize=12&category=23893&labelFilter=%5B%5D',
    'https://www.dentalecia.com.br/categoria/resinas/resina-composta?viewList=g&pageNumber=2&pageSize=12&category=23893&labelFilter=%5B%5D',
  ])

  URLArray.push([
    'https://www.dentalecia.com.br/categoria/dentistica-e-estetica/matriz?viewList=g&pageNumber=1&pageSize=12&category=23945&labelFilter=%5B%5D',
    'https://www.dentalecia.com.br/categoria/dentistica-e-estetica/matriz?viewList=g&pageNumber=2&pageSize=12&category=23945&labelFilter=%5B%5D',
  ])

  URLArray.push([ // ceras
    'https://www.dentalecia.com.br/categoria/protese/ceras?viewList=g&pageNumber=1&pageSize=12&category=23991&labelFilter=%5B%5D',
    'https://www.dentalecia.com.br/categoria/protese/ceras?viewList=g&pageNumber=2&pageSize=12&category=23991&labelFilter=%5B%5D',
  ])

  URLArray.push([ // silicone de adição
    'https://www.dentalecia.com.br/categoria/moldagem/silicone-de-adicao?viewList=g&pageNumber=1&pageSize=12&category=23906&labelFilter=%5B%5D',
    'https://www.dentalecia.com.br/categoria/moldagem/silicone-de-adicao?viewList=g&pageNumber=2&pageSize=12&category=23906&labelFilter=%5B%5D',
  ])

  URLArray.push([ // silicone de condensação
    'https://www.dentalecia.com.br/categoria/moldagem/silicone-de-condensacao?viewList=g&pageNumber=2&pageSize=12&category=23907&labelFilter=%5B%5D',
    'https://www.dentalecia.com.br/categoria/moldagem/silicone-de-condensacao?viewList=g&pageNumber=2&pageSize=12&category=23907&labelFilter=%5B%5D',
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
            return `ci-braquete-reposicao`; 
          case 1:
            return `ci-resina-composta`;
          case 2:
            return `ci-matriz`;
          case 3:
            return `ci-ceras`;
          case 4:
            return `ci-silicone-de-adicao`;
          case 5:
            return `ci-silicone-de-condensacao`;
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
        const titleList = document.querySelectorAll('div.categoryProducts h3 span')
        const titleArray = [...titleList]
        const titleObject = titleArray.map(t => {
          return t.textContent
        })
  
        const priceList = document.querySelectorAll('div.categoryProducts span.preco')
        const priceArray = [...priceList]
        const priceObject = priceArray.map(h => {
          return h.textContent
        })
  
        const linkList = document.querySelectorAll('div.categoryProducts a.ui.image.fluid')
        const linkArray = [...linkList]
        const linkObject = linkArray.map(t => {
          return t.href
        })
  
        const imgList = document.querySelectorAll('div.categoryProducts img.visible.content')
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

      fs.writeFile(`listsCi/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(totalObject, null, 2), err => {
        if (err) throw new Error('something went wrong')
        console.log('well done!')
      })

      totalObjectResetIndex = URLArrayIndex;
    }
  }
  console.log('the end')
  browser.close();
})();
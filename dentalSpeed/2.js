const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  await fs.promises.mkdir(`listsSp/${timestamp}`, { recursive: true })
  const URLArray = [];

  // links to item page
  URLArray.push([
    'https://dentalspeed.com/grupo/braquete-ceramico',
    'https://dentalspeed.com/grupo/braquete-de-policarbonato',
    'https://dentalspeed.com/grupo/braquete-metalico'      
  ])

  URLArray.push([
    'https://dentalspeed.com/grupo/luvas',
    'https://dentalspeed.com/grupo/luva-cirurgica',
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
            return `sp-braquete-reposicao`;
          case 1:
            return `sp-luvas`;
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
        const titleList = document.querySelectorAll('div.list-result div.product-details span.product-name')
        const titleArray = [...titleList]
        const titleObject = titleArray.map(t => {
          return t.textContent
        })

        const subTitleList = document.querySelectorAll('div.list-result div.product-details span.product-brand')
        const subTitleArray = [...subTitleList]
        const subTitleObject = subTitleArray.map(t => {
          return t.textContent
        })
  
        const detailsList = document.querySelectorAll('div.list-result div.product-details span.product-description')
        const detailsArray = [...detailsList]
        const detailsObject = detailsArray.map(t => {
          return t.textContent
          
        })
  
        const priceList = document.querySelectorAll('div.list-result div.product-price span.product-price-big')
        const priceArray = [...priceList]
        const priceObject = priceArray.map(h => {
          return h.textContent
        })
  
        const linkList = document.querySelectorAll('div.list-result div.product-item a')
        const linkArray = [...linkList]
        const linkObject = linkArray.map(t => {
          return t.href
        })
  
        const imgList = document.querySelectorAll('div.list-result div.product-image img')
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
            brand: subTitleObject[i],
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

            // log for testing
      // console.log(totalObject)

      fs.writeFile(`listsSp/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(totalObject, null, 2), err => {
        if (err) throw new Error('something went wrong')
        console.log('well done!')
      })
      totalObjectResetIndex = URLArrayIndex;
    }
  }
  console.log('the end')
  browser.close();
})();




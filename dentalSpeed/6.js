const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  await fs.promises.mkdir(`listsSp/${timestamp}`, { recursive: true })

  const URLArray = [
    'https://dentalspeed.com/hotsite/radiologia',

  ]

  const browser = await puppeteer.launch();

  for (URL of URLArray) {
    const res = URL.slice(32, );
    console.log(res)

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
    // console.log(productList)
    fs.writeFile(`listsSp/${timestamp}/sp-${res}.json`, JSON.stringify(productList[0], null, 2), err => {
      if (err) throw new Error('something went wrong')
      console.log('well done!')
    })
  }
  console.log('the end')
  await browser.close();
})();
const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  await fs.promises.mkdir(`listsSp/${timestamp}`, { recursive: true })

  const URLArray = [
    // 'https://busca.dentalspeed.com/Luvas+Latex+Para+Procedimento.html', apagagar logo mais
    // 'https://busca.dentalspeed.com/Sugador.html',
    // 'https://busca.dentalspeed.com/Resina+Composta.html',
    // 'https://busca.dentalspeed.com/Braquete.html',
    // 'https://busca.dentalspeed.com/Ionomero+de+vidro.html',
    'https://busca.dentalspeed.com/acidos+fosforicos.html',
    'https://busca.dentalspeed.com/matriz.html',
    'https://busca.dentalspeed.com/tiras+de+lixa.html',
    'https://busca.dentalspeed.com/fio+sutura.html',
    'https://busca.dentalspeed.com/aplicador.html',
    'https://busca.dentalspeed.com/rolete.html',
    'https://busca.dentalspeed.com/gesso.html',

      
  ]

  const browser = await puppeteer.launch();

  for (URL of URLArray) {
    const res = URL.slice(30,-5);
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
      
      const titleList = document.querySelectorAll('article div.nm-name')
      const titleArray = [...titleList]
      const titleObject = titleArray.map(t => {
        return t.textContent
      })

      const detailsList = document.querySelectorAll('article div.descricao')
      const detailsArray = [...detailsList]
      const detailsObject = detailsArray.map(t => {
        return t.textContent
        
      })

      const priceList = document.querySelectorAll('article strong.preco span')
      const priceArray = [...priceList]
      const priceObject = priceArray.map(h => {
        return h.textContent
      })

      const linkList = document.querySelectorAll('div.prod-resultado a')
      const linkArray = [...linkList]
      const linkObject = linkArray.map(t => {
        return t.href
      })

      const imgList = document.querySelectorAll('div.prod-resultado img')
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
    // console.log(productList)
    fs.writeFile(`listsSp/${timestamp}/sp-${res}.json`, JSON.stringify(productList[0], null, 2), err => {
      if (err) throw new Error('something went wrong')
      console.log('well done!')
    })
  }
  console.log('the end');
  await browser.close();
})();
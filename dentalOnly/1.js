const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
    let timestamp = new Date()
    await fs.promises.mkdir(`listsOn/${timestamp}`, { recursive: true })
    const URLArray = [];

    URLArray.push([
      'https://www.onlydental.com.br/uso-continuo/descartaveis/luvas.html?product_list_order=price_desc', //
    ])

    URLArray.push([

      'https://www.onlydental.com.br/uso-continuo/descartaveis/sugadores.html', //
      'https://www.onlydental.com.br/uso-continuo/descartaveis/gazes.html', //
      'https://www.onlydental.com.br/uso-continuo/descartaveis/agulhas.html', // 
      'https://www.onlydental.com.br/uso-continuo/anestesicos/anestesicos.html', //
      'https://www.onlydental.com.br/uso-continuo/instrumentais/aplicador.html', //
      'https://www.onlydental.com.br/uso-continuo/acessorios/ficha-de-raio-x.html', 
      'https://www.onlydental.com.br/uso-continuo/uso-continuo/agua-p-47-autoclave.html', //
      'https://www.onlydental.com.br/uso-continuo/descartaveis/lencois.html', //
      'https://www.onlydental.com.br/uso-continuo/uso-continuo/fio-de-sutura.html', //
      'https://www.onlydental.com.br/dentistica-e-estetica/restaurador-provisorio.html', //
      'https://www.onlydental.com.br/dentistica-e-estetica/condicionadores-acidos.html',   //   
      'https://www.onlydental.com.br/dentistica-e-estetica/cunha.html', //
      'https://www.onlydental.com.br/uso-continuo/descartaveis/algodoes.html', //
      
    ])

    URLArray.push([
      'https://www.onlydental.com.br/dentistica-e-estetica/restaurador-provisorio.html', //
      'https://www.onlydental.com.br/dentistica-e-estetica/condicionadores-acidos.html', //
      'https://www.onlydental.com.br/dentistica-e-estetica/cunha.html', //
    ])

    const browser = await puppeteer.launch();

    for(let URLArrayIndex = 0; URLArrayIndex < URLArray.length; URLArrayIndex++) {
      for (URL of URLArray[URLArrayIndex]) {
        // format JSON file name.
        function jsonFileName(URLArrayIndex) {
          switch (URLArrayIndex) {
            case 0:
              return `on-${URL.slice(32, -35).split("/")[2]}`;
            case 1:
              return `on-${URL.slice(32, -5).split("/")[2]}`; 
            case 2:
              return `on-${URL.slice(32, -5).split("/")[1]}`;
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
          
          const titleList = document.querySelectorAll('div.products a.product-item-link')
          const titleArray = [...titleList]
          const titleObject = titleArray.map(t => {
            return t.textContent
          })

          const subTitleList = document.querySelectorAll('div.products small.product-brand')
          const subTitleArray = [...subTitleList]
          const subTitleObject = subTitleArray.map(t => {
            return t.textContent
          })
    
          const priceList = document.querySelectorAll('div.products span.price')
          const priceArray = [...priceList]
          const priceObject = priceArray.map(h => {
            return h.textContent
          })
    
          const linkList = document.querySelectorAll('div.products a.product')
          const linkArray = [...linkList]
          const linkObject = linkArray.map(t => {
            return t.href
          })
    
          const imgList = document.querySelectorAll('div.products img.product-image-photo')
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
              price: priceObject[i],
              href: linkObject[i],
              img: imgObject[i], 
              time: timeData,
            })
          }

          return [productObject, timeData]
        })
        // console.log(productList)
        fs.writeFile(`listsOn/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(productList[0], null, 2), err => {
          if (err) throw new Error('something went wrong')
          console.log('well done!')
        })
      }
    }
    console.log('the end')
    await browser.close();
})();




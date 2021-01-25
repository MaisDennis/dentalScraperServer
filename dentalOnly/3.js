const puppeteer = require('puppeteer');
const fs = require('fs');
// const popularList = require('../popular.json');

(async () => {
  let timestamp = new Date()
  // await fs.promises.mkdir(`listsOn/${timestamp}`, { recursive: true })
  const URLArrayA = []; const URLArrayB = []
  
  // links to item page
  // 2020/12/28: o arquivo default para dental Only é o 4. Aqui foi a tentativa de eliminar os preços "Esgotado" e parcelado.
  URLArrayA.push([
    'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-estetico.html?p=1&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-estetico.html?p=2&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-estetico.html?p=3&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=1&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=2&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=3&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=4&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=5&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=6&product_list_order=price_asc',     
  ])

  URLArrayB.push([
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-estetico.html?p=1&product_list_order=price_desc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-estetico.html?p=2&product_list_order=price_desc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-estetico.html?p=3&product_list_order=price_desc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=1&product_list_order=price_desc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=2&product_list_order=price_desc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=3&product_list_order=price_desc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=4&product_list_order=price_desc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=5&product_list_order=price_desc',
    // 'https://www.onlydental.com.br/ortodontia/uso-continuo-orto/braquete-metalico.html?p=6&product_list_order=price_desc',   
  ])

  URLArrayA.push([
    'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=1&product_list_order=price_asc', //
    // 'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=2&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=3&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=4&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=5&product_list_order=price_asc',
    // 'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=6&product_list_order=price_asc', 
  ])

  //   URLArrayB.push([
  //   'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=1&product_list_order=price_desc', //
  //   'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=2&product_list_order=price_desc',
  //   'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=3&product_list_order=price_desc',
  //   'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=4&product_list_order=price_desc',
  //   'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=5&product_list_order=price_desc',
  //   'https://www.onlydental.com.br/dentistica-e-estetica/resina-composta.html?p=6&product_list_order=price_desc', 
  // ])

  // URLArrayA.push([
  //   'https://www.onlydental.com.br/dentistica-e-estetica/tira-p-47-acabamento-e-polimento.html?p=1&product_list_order=price_asc', //
  //   'https://www.onlydental.com.br/dentistica-e-estetica/tira-p-47-acabamento-e-polimento.html?p=2&product_list_order=price_asc',
  // ])

    // URLArrayB.push([
  //   'https://www.onlydental.com.br/dentistica-e-estetica/tira-p-47-acabamento-e-polimento.html?p=1&product_list_order=price_desc', //
  //   'https://www.onlydental.com.br/dentistica-e-estetica/tira-p-47-acabamento-e-polimento.html?p=2&product_list_order=price_desc',
  // ])

  // URLArray.push([
  //   'https://www.onlydental.com.br/dentistica-e-estetica/ionomero-de-vidro.html?p=1', //
  //   'https://www.onlydental.com.br/dentistica-e-estetica/ionomero-de-vidro.html?p=2',
  //   'https://www.onlydental.com.br/dentistica-e-estetica/ionomero-de-vidro.html?p=3',
  // ])

  // URLArray.push([
  //   'https://www.onlydental.com.br/dentistica-e-estetica/matriz.html?p=1', //
  //   'https://www.onlydental.com.br/dentistica-e-estetica/matriz.html?p=2',
  // ])
  
  // URLArray.push([
  //   'https://www.onlydental.com.br/uso-continuo/descartaveis/embalagem-p-47-esterilizac-o.html?p=1',
  //   'https://www.onlydental.com.br/uso-continuo/descartaveis/embalagem-p-47-esterilizac-o.html?p=2',
  //   'https://www.onlydental.com.br/uso-continuo/descartaveis/embalagem-p-47-esterilizac-o.html?p=3',
  // ])

  const browser = await puppeteer.launch();
  let totalObject = []
  let URLArrayIndex = 0
  let jsonFileNameExt = ''
  for(URLArrayIndex = 0; URLArrayIndex < URLArrayA.length; URLArrayIndex++) {
    let totalObjectResetIndex = 0;
  
    for(URL of URLArrayA[URLArrayIndex]) {
      // format JSON file name.
      function jsonFileName(URLArrayIndex) {
        switch (URLArrayIndex) {
          case 0:
            return `on-braquete`; 
          case 1:
            return `on-resina-composta`;
          // case 2:
          //   return `on-${URL.slice(52, -9)}`;
          // case 3:
          //   return `on-${URL.slice(52, -9)}`;
          // case 4:
          //   return `on-${URL.slice(52, -9)}`;
          // case 5:
          //   return `on-${URL.slice(56, -9)}`;
        }
      }
      console.log(jsonFileName(URLArrayIndex))
      jsonFileNameExt = jsonFileName(URLArrayIndex)

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
        const priceList = document.querySelectorAll('div.products div.stock strong')
        const priceArray = [...priceList]
        let priceObject = priceArray.map(h => {
          return h.textContent
        })

        const titleList = document.querySelectorAll('div.products a.product-item-link')
        const titleArray = [...titleList]
        // const antiPriceList = document.querySelectorAll('div.products div.stock strong')
        // const antiPriceArray = [...antiPriceList]
        // let pos = 0
        // for(antiPrice of antiPriceArray) {
        //   pos = antiPriceArray.indexOf(antiPrice)
        //   titleArray.splice(0, 1)
        //   // titleArray.map((t, index) => {
        //   //   if(index === pos) {
        //   //     titleArray.splice(index, 1)
        //   //   }
        //   // })
        // }
        const titleObject = titleArray.map(t => {
          return t.textContent
        })

        const subTitleList = document.querySelectorAll('div.products small.product-brand')
        const subTitleArray = [...subTitleList]
        const subTitleObject = subTitleArray.map(t => {
          return t.textContent
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
        for (testItem of productObject) {
          pos = productObject.indexOf(testItem)
          if (!testItem.price) {
            productObject.splice(pos, productObject.length)
          }
        }
  
        return [productObject, timeData]
      })
      
      for (i = 0; i < productList[0].length; i += 1) {
      totalObject.push(productList[0][i])
      }
      // log for testing
      // console.log(totalObject)

      // fs.writeFile(`listsOn/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(totalObject, null, 2), err => {
      //   if (err) throw new Error('something went wrong')
      //   console.log('well done!')
      // })

      totalObjectResetIndex = URLArrayIndex;
    }
  }
  // for(URLArrayIndex = 0; URLArrayIndex < URLArrayB.length; URLArrayIndex++) {
  //   let totalObjectResetIndex = 0;
  
  //   for(URL of URLArrayB[URLArrayIndex]) {
  //     // format JSON file name.
  //     function jsonFileName(URLArrayIndex) {
  //       switch (URLArrayIndex) {
  //         case 0:
  //           return `on-braquete`; 
  //         // case 1:
  //         //   return `on-resina-composta`;
  //         // case 2:
  //         //   return `on-${URL.slice(52, -9)}`;
  //         // case 3:
  //         //   return `on-${URL.slice(52, -9)}`;
  //         // case 4:
  //         //   return `on-${URL.slice(52, -9)}`;
  //         // case 5:
  //         //   return `on-${URL.slice(56, -9)}`;
  //       }
  //     }
  //     console.log(jsonFileName(URLArrayIndex))
  //     jsonFileNameExt = jsonFileName(URLArrayIndex)

  //     if (totalObjectResetIndex != URLArrayIndex) {
  //       totalObject = [];
  //     }

  //     const page = await browser.newPage();
  //     await page.goto(URL);
  
  //     const productList = await page.evaluate(async () => {
  //       // time object build
  //       const today = new Date()
  //       const stringifiedTimeData = JSON.stringify(today)
  //       const mins = today.getMinutes()
  //       const hours = today.getHours()
  //       const theDate = today.getDate();
  //       const theMonth = today.getMonth() + 1;
  //       const theYear = today.getFullYear();
  //       const theDay = today.getDay(); //day of the week
  //       const timeData = {stringifiedTimeData, mins, hours, theDate, theMonth, theYear, theDay }
        
  //       // scraping part
  //       const titleList = document.querySelectorAll('div.products a.product-item-link')
  //       const titleArray = [...titleList]
  //       const titleObject = titleArray.map(t => {
  //         return t.textContent
  //       })

  //       const subTitleList = document.querySelectorAll('div.products small.product-brand')
  //       const subTitleArray = [...subTitleList]
  //       const subTitleObject = subTitleArray.map(t => {
  //         return t.textContent
  //       })
  
  //       const priceList = document.querySelectorAll('div.products div.product-item-installment')
  //       const priceArray = [...priceList]
  //       const priceObject = priceArray.map(h => {
  //         return h.textContent
  //       })
  
  //       const linkList = document.querySelectorAll('div.products a.product')
  //       const linkArray = [...linkList]
  //       const linkObject = linkArray.map(t => {
  //         return t.href
  //       })
  
  //       const imgList = document.querySelectorAll('div.products img.product-image-photo')
  //       const imgArray = [...imgList]
  //       const imgObject = imgArray.map(t => {
  //         return t.src      
  //       })
        
  //       const productObject = []
  //       let i;
  //       for (i = 0; i < titleObject.length; i += 1) {
  //         productObject.push({
  //           id: i,
  //           title: titleObject[i],
  //           brand: subTitleObject[i],
  //           price: priceObject[i],
  //           href: linkObject[i],
  //           img: imgObject[i], 
  //           time: timeData,
  //           dividedPrice: true,
  //         })
  //       }
  //       for (testItem of productObject) {
  //         pos = productObject.indexOf(testItem)
  //         if (!testItem.price) {
  //           productObject.splice(pos, productObject.length)
  //         }
  //       }
  
  //       return [productObject, timeData]
  //     })
      
  //     for (i = 0; i < productList[0].length; i += 1) {
  //     totalObject.push(productList[0][i])
  //     }



      
  //     // log for testing
  //     // console.log(totalObject)

  //     // fs.writeFile(`listsOn/${timestamp}/${jsonFileName(URLArrayIndex)}.json`, JSON.stringify(totalObject, null, 2), err => {
  //     //   if (err) throw new Error('something went wrong')
  //     //   console.log('well done!')
  //     // })

  //     totalObjectResetIndex = URLArrayIndex;
  //   }
  // }
  fs.writeFile(`dentalOnly/${jsonFileNameExt}.json`, JSON.stringify(totalObject, null, 2), err => {
    if (err) throw new Error('something went wrong')
    console.log('well done!')
  })
  console.log('the end')
  browser.close();
})();
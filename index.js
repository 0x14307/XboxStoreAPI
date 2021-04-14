const puppeteer = require('puppeteer');

async function scrapeAPI(url){
  console.log('Fetching items, this may take a bit...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // Currently WIP (Needs filtering as well as making sure stuff shows up)

  const nameArray = await page.evaluate(
    () => [...document.querySelectorAll("h3.c-subheading-6")].map(partner => partner.innerText) //Gets list of all items for sale (currently only supports up to 90 per page)
  );
  const priceArray = await page.evaluate(
    () => [...document.querySelectorAll("div div span.x-screen-reader")].map(partner => partner.innerText) //Gets prices (currently garbage, needs cleaning)
  );
  let price = priceArray;
  price = priceArray.filter(e => e !== 'Game Pass'); // Filters out unwanted items

  let filterout = price;
  filterout = price.filter(e => e !== 'filtered by'); // Filters out "filtered by"
  let priceShit = filterout.splice(0, 2);
  let nameShit = nameArray.splice(0, 1);
  console.log(nameShit);
  console.log(priceShit); // Logs the fitered API response into the console & displays it 
  console
  browser.close();
}

scrapeAPI('https://www.microsoft.com/en-us/store/deals/games/xbox');
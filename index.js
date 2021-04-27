const puppeteer = require("puppeteer");

async function scrapeAPI(url) {
  console.log("Fetching items, this may take a bit...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // Currently WIP (Needs filtering as well as making sure stuff shows up)

  const nameArray = await page.evaluate(
    () =>
      [...document.querySelectorAll("h3.c-subheading-6")].map(
        (partner) => partner.innerText
      ) //Gets list of all items for sale (currently only supports up to 90 per page)
  );

  const priceArray = await page.evaluate(
    () =>
      [...document.querySelectorAll("div div span.x-screen-reader")].map(
        (partner) => partner.innerText
      ) //Gets prices (currently garbage, needs cleaning)
  );
  /*  console.log(
    `The first game on sale is ${nameArray[0]} - the ${priceArray[1]} and ${priceArray[2]}`
  );
  console.log(
    `The first game on sale is ${nameArray[1]} - the ${priceArray[2]} and ${priceArray[3]}`
  ); */

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");

  let price = priceArray;
  price = priceArray.filter((e) => e !== "Game Pass"); // Filters out unwanted items

  let filterout = price;
  filterout = price.filter((e) => e !== "filtered by"); // Filters out "filtered by"

  let filteroutGold = filterout;
  filteroutGold = filterout.filter((e) => e !== "Gold"); // Filters out "Games with Gold Price"

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");

  // Put price information into a multidimensional array (Full and Now Price)
  function TwoDimensional(arr, size) {
    var res = [];
    for (var i = 0; i < arr.length; i = i + size)
      res.push(arr.slice(i, i + size));
      return res
  }
  let multidimensionalPriceArray = TwoDimensional(filteroutGold, 2);
  // console.log(multidimensionalPriceArray)

  // Output first 10 Deals 
  for (let i = 0; i < 10; i++) {
    console.log(nameArray[i] + " ➡️ " + " " + multidimensionalPriceArray[i][0] + " 🚀 " + multidimensionalPriceArray[i][1]);
  }

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");

  //let priceShit = filterout.splice(0, 2);
  //let nameShit = nameArray.splice(0, 1);
  //console.log(nameShit);
  //console.log(priceShit); // Logs the fitered API response into the console & displays it console;

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");

  // console.log(filterout);
  // console.log(nameArray);
  browser.close();
}

scrapeAPI("https://www.microsoft.com/en-us/store/deals/games/xbox");

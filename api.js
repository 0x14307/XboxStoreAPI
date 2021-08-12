const axios = require('axios');
const cheerio = require('cheerio');

async function getData(){
     try{
          const data = await axios({
               method: "GET",
               url: `https://www.microsoft.com/en-us/store/deals/games/xbox`,
          });

          const $ = cheerio.load(data);
          const itemSelect = `#productPlacementList > div > div.group > div.m-channel-placement-item`

          $(itemSelect).each((indexElement, parentElement) => {
               console.log(indexElement);
          })
     }
     catch(err){
          console.error(err);
     }
}

getData();
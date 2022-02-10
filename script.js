const configuration = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "yh-finance.p.rapidapi.com",
    "x-rapidapi-key": "64c824b8d9msh1c34bd003962c78p171bd7jsn16e14c535f1a",
  },
};
const url =
  "https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=1mo&symbol=AMRN&range=5y&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit";

const name = document.querySelector("#stock-name");
const price = document.querySelector("#stock-price");
const high = document.querySelector("#stock-high");
const currency = document.querySelector("#stock-currency");

fetch(url, configuration)
  .then(function (response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }

    // Examine the text in the response
    response.json().then(function (data) {
      console.log(data);
      displayData(data);
    });
  })
  .catch(function (err) {
    console.log("Fetch Error :-S", err);
  });

//displaying some data from API
function displayData(stockData) {
  let metadata = stockData.chart.result[0].meta;
  let indicators = stockData.chart.result[0].indicators;
  name.innerText = "Stock name:" + metadata.symbol;
  console.log("Stock name:" + metadata.symbol);
  price.innerText = "Stock price:" + metadata.priceHint;
  console.log("Stock price:" + metadata.priceHint);
  high.innerText = "Stock high:" + indicators.quote[0].high[0];
  console.log("Stock high:" + indicators.quote[0].high[0]);
  currency.innerText = "Stock currecy:" + metadata.currency;
  console.log("Stock currecy:" + metadata.currency);
}

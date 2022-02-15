var key = "274f4e06d8eb0e2f1da56e878fdcd83a"; // private API_KEY
document.getElementById("submitButton").addEventListener("click", displayChart); // to display chart on click
var chart = document.querySelector("#chart"); // chart section

// chart customization
var options = {
  chart: {
    type: "candlestick",
    height: 600,
  },
  series: [
    {
      data: [],
    },
  ],
  title: {
    text: "",
    align: "left",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
};

function displayChart() {
  var symbol = document.getElementById("symbol-input").value; // getting the symbol entered by user
  get(symbol); //getting data from API and creating the chart
}

function get(symbol) {
  fetch(
    `http://api.marketstack.com/v1/eod?access_key=` +
      key +
      `&symbols=` +
      symbol +
      `&limit=75`
  )
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      response.json().then(function (data) {
        console.log(data); //displaying data from API in console
        formatData(data, symbol); //formatting data to put in chart
        createChart(); //creating the chart
      });
    })

    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function formatData(stockData, symbol) {
  options.title.text = symbol; //chart's title
  let solution = [];
  var apiData = stockData.data;
  for (var entry of apiData) {
    let obj = {};
    obj.x = new Date(entry.date); // the x axis will be containing the date
    let price = [];
    price.push(entry.open);
    price.push(entry.high);
    price.push(entry.low);
    price.push(entry.close);
    obj.y = price; // the y axis will be containing the prices
    solution.push(obj); //adding object to array
  }
  options.series[0].data = solution; // adding in chart's array the info we got
}

function createChart() {
  chart.innerText = "";
  chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

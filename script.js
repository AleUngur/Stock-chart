var key = "d87172a12149bbe6225de4fd765bf31f";
document.getElementById("submitButton").addEventListener("click", displayChart);
var chart = document.querySelector("#chart");

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
  var symbol = document.getElementById("symbol-input").value;
  //getting data from API and creating the chart
  get(symbol);
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
      // Examine the text in the response
      response.json().then(function (data) {
        console.log(data);
        formatData(data, symbol);
        function createChart() {
          chart.innerText = "";
          chart = new ApexCharts(document.querySelector("#chart"), options);
          chart.render();
        }
        createChart();
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function formatData(stockData, symbol) {
  options.title.text = symbol;
  let solution = [];
  var apiData = stockData.data;
  for (var entry of apiData) {
    let obj = {};
    obj.x = new Date(entry.date); //the x axis will be containing the date
    let price = [];
    price.push(entry.open);
    price.push(entry.high);
    price.push(entry.low);
    price.push(entry.close);
    obj.y = price; //the y axis will be containing the prices
    solution.push(obj);
  }
  options.series[0].data = solution.sort((a, b) => a.x - b.x); //put in series what we obtained
}

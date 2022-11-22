// Variables
var inputform = $("#search-input");
var searchButton = $("#search-btn");
var currentTemp = $(".temp");
var currentHumidity = $(".humidity");
var currentWind = $(".wind");
var currentuvi = $(".uvi");
var apiKey = "8f19e18f6172630844fe7d562649fea0";
var cityWeather = $(".searchedCity");

// functions

// search for lat and long based off city name
function fetchCoordinates() {
  var city = inputform.val();
  //console.log(city);
  var appId =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  // fetch  api call with user search term
  fetch(appId)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      //console.log(data.coord.lat, data.coord.lon);
      fetchForecastWeather(data.coord.lat, data.coord.lon);
    });
}
//pulling in lat and lon seach api for data on that city
function fetchForecastWeather(lat, lon) {
  let date = new Date();
  let month = date.getMonth();
  let day = date.getDate();
  let year = date.getFullYear();
  let fullDate = `${month}/${day}/${year}`;
  // this is concatenaton of all elements needed to make api call
  var searchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  // returning current data to todays weather section
  fetch(searchUrl).then(function (response) {
    return response.json().then(function (data) {
      //console.log(data);
      currentTemp.text("Temp: " + data.current.temp);
      currentWind.text("Wind " + data.current.wind_speed);
      currentHumidity.text("Humidity: " + data.current.humidity);
      cityWeather.text(inputform.val() + "   " + fullDate);
      //displayForecastWeather(data.daily)
      fetch5dayforcast(data.daily, fullDate);
    });
  });
}
// new function brining in daiy data for 5day forcase
function fetch5dayforcast(daily, fullDate) {
  // loop to pull in temp, humidity, and wind for 5 day forcast
  for (var i = 0; i < 5; i++) {
    // console.log(daily[i].temp.day);

    var card = `<div class="card" id="card">
                    <div class="card-body text-center">
                    
                      <p class="temp">${"Temp: " + daily[i].temp.day}</p>
                       <p class="wind">${"Wind: " + daily[i].wind_speed}</p>
                        <p class="humidity">${
                          "Humidity: " + daily[i].humidity
                        }</p>
                    </div>
                  </div>`;
    $(".card-deck").append(card);
  }
}

//eventlistener for search

$("#search-btn").on("click", fetchCoordinates);

// localStorage.setItem('cities, value')
// localStorage.getItem('cities')

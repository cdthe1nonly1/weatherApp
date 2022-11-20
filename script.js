var inputform = $("#search-input");
var searchButton = $("#search-btn");
var currentTemp = $(".temp");
var currentHumidity = $(".humidity");
var currentWind = $(".wind");
var currentuvi = $(".uvi");
var apiKey = "8f19e18f6172630844fe7d562649fea0";
var cityWeather = $(".searchedCity");

// functions

// fetch tis repsonsible for makiking api call with user search term
function fetchCoordinates() {
  var city = inputform.val();
  console.log(city);
  var appId =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  //console.log(appId);
  fetch(appId)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      console.log(data.coord.lat, data.coord.lon);
      fetchForecastWeather(data.coord.lat, data.coord.lon);
    });
}
function fetchForecastWeather(lat, lon) {
  let date = new Date();
  let month = date.getMonth();
  let day = date.getDate();
  let year = date.getFullYear();
  let fullDate = `${month}/${day}/${year}`;
  // this is concatenaton of all elements needed to make api call
  var searchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  // var apiCall = weatherapi + lat + long + "appID=" + apiKey
  //  console.log(apiCall)
  fetch(searchUrl).then(function (response) {
    return response.json().then(function (data) {
      console.log(data);
      currentTemp.text("Temp: " + data.current.temp);
      currentWind.text("Wind " + data.current.wind_speed);
      currentHumidity.text("Humidity: " + data.current.humidity);
      cityWeather.text(inputform.val() + "   " + fullDate);
      //displayForecastWeather(data.daily)
      fetch5dayforcast(data.daily);
    });
  });
}
function fetch5dayforcast(daily) {
  // console.log(daily + "daily in fetch5dayforcast");
  console.log(daily[0].temp.day);
  console.log(daily[0].wind_speed);
  console.log(daily[0].humidity);
  //build out a loop to go through to build cards and populate with.
  // fill with temp, wind, humidity
}

//function displayForecastWeather(5dayForcast) {
//   for (var i = 0; i < data.length; i++) {}
// }

// //form submission capturing user input
// function handleFormSubmit(e){
//     e.preventDefault();
//         var inut = inputform
//     console.log(inputform)

//     //make api call with search term and verif data is sent back
//     fetchWeather(inputform)
// }

// //event listeners

// userForm.addEventListener(handleFormSubmit)

// //create empty array
// //["austin", denver]

// localStorage.setItem('cities, value')
// localStorage.getItem('cities')

$("#search-btn").on("click", fetchCoordinates);

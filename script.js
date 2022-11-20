var inputform = $("#search-input");
var searchButton = $("#search-btn");
var currentTemp = $(".temp");
var currentHumidity = $(".humidity");
var currentWind = $(".wind");
var currentuvi = $(".uvi");
var apiKey = "8f19e18f6172630844fe7d562649fea0";
//var city = ("#search-input");
// var weatherAPI =
//   "https://api.openweathermap.org/data/2.5/weather?lat=" +
//   lat +
//   "&lon=" +
//   long +
//   "&appid=" +
//   apiKey +
//   "&units=imperial";
// console.log(weatherAPI);

// functions

// fetch tis repsonsible for makiking api call with user search term
function fetchCoordinates() {
  var city = inputform.val();
  console.log(city);
  var appId =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";
  console.log(appId);
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
  console.log("inside fetchForecastWeather");
  // this is concatenaton of all elements needed to make api call
  var searchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  // var apiCall = weatherapi + lat + long + "appID=" + apiKey
  //  console.log(apiCall)
  fetch(searchUrl).then(function (response) {
    return response.json().then(function (data) {
      console.log(data);
      currentTemp.text(data.current.temp);
      currentHumidity.text(data.current.humidity);
      currentWind.text(data.current.wind_speed);
      currentuvi.text(data.current.uvi);
      //displayForecastWeather(data.daily)
      console.log(data.daily + "to pass to next");
    });
  });
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

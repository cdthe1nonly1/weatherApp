// Variables
var lastFive = JSON.parse(localStorage.getItem("previousSearches")) || [];
var inputform = $("#search-input");
var searchButton = $("#search-btn");
var currentTemp = $(".temp");
var currentHumidity = $(".humidity");
var currentWind = $(".wind");
var currentuvi = $(".uvi");
var apiKey = "8f19e18f6172630844fe7d562649fea0";
var cityWeather = $(".searchedCity");
var resultsButtons = $("#results-buttons");
// functions

// search for lat and long based off city name 
function fetchCoordinates(value) {
	var city = inputform.val();
	if (city === "") {
		city = value;
	}
	console.log(city);
	if (lastFive.includes(city)) {
	} else {
		lastFive.push(city);
	}
	searchHistory();
	var appId = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
	console.log(appId);
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
	// this is concatenation of all elements needed to make api call
	var searchUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

	// returning current data to todays weather section
	fetch(searchUrl).then(function (response) {
		return response.json().then(function (data) {
			console.log(data);
			currentTemp.text("Temp: " + data.current.temp);
			currentWind.text("Wind " + data.current.wind_speed);
			currentHumidity.text("Humidity: " + data.current.humidity);
			//cityWeather.text(inputform.val() + "   " + fullDate);
			cityWeather.text(data.timezone + " " + " " + " " + fullDate);
			//displayForecastWeather(data.daily)
			fetch5dayforcast(data.daily, fullDate);
		});
	});
}
// new function brining in daiy data for 5day forcase
function fetch5dayforcast(daily, fullDate) {
	// loop to pull in temp, humidity, and wind for 5 day forcast
	$(".card-deck").empty();
	for (let i = 0; i < daily.length && i < 5; i++) {
		// console.log(daily[i].temp.day);

		var card = `<div class="card" id="card">
                    <div class="card-body text-center">
                    
                      <p class="temp">${"Temp: " + daily[i].temp.day}</p>
                       <p class="wind">${"Wind: " + daily[i].wind_speed}</p>
                        <p class="humidity">${"Humidity: " + daily[i].humidity}</p>
                    </div>
                  </div>`;
		$(".card-deck").append(card);
	}
}

//eventlistener for search
searchButton.on("click", function () {
	fetchCoordinates(inputform.val());
	//document.getElementById('search-input').value = " ";
});


function searchHistory() {
	resultsButtons.html("");
// pulls up the last five previous serches
	localStorage.setItem("previousSearches", JSON.stringify(lastFive));
	for (i = 0; i < lastFive.length; i++) {
		if (lastFive.length > 5) {
			lastFive.splice(i, 1);
		}
	}
//loops through to 
	$("#lastSearchButtons").empty();
	for (i = 0; i < lastFive.length; i++) {
		var button = $("<button>");
		button.addClass("btn history-btn");
		button.attr("value", lastFive[i]);
		button.attr("id", lastFive[i]);
		button.html(lastFive[i]);
		button.on("click", function () {
			// this snags varible for valule.  Brings city in and sets it as value
			fetchCoordinates($(this).val());
			//console.log(($(this).val())
			//console.log
		});
		$("#lastSearchButtons").append(button);
	}
}

searchHistory();

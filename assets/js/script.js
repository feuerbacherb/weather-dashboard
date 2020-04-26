// variables
var divWeather = document.querySelector("#weather");
const APPID = "&APPID=5fdccbd9d0af61e0aa359962e7e15555"
var zip = "78608";
var btnSearch = document.querySelector("#btnSearch");
var inputSearch = document.querySelector("#searchinput");
var inputEl = document.querySelector("#previousSearches");
var cities = [];
var currentCity = "";

// functions
var initialize = function() {
   // get locations from localstorage
   cities = JSON.parse(localStorage.getItem("wdcities"));

   // display hyperlink buttons for preavious searches
   if (cities) {
      // get the last city so we can display the weather
      if (cities.length === 0) {
         currentCity = cities[0];
      } else {
      currentCity = cities[cities.length - 1];
      }
      showCities();
      getCurrentWeather(currentCity);
   } else {
      // default to Austin,TX if no information
      getCurrentWeather("Austin,TX");
   }
}

var getCurrentWeather = function(str) {

   // build api to pull based on city and state, though it will pull just on city, as long as it is in the United States
   var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + ",usa&units=imperial" + APPID;
   var lng;
   var lat;

   // fetch the information
   fetch(apiUrl)
      .then(function(response) {
         if (response.ok) {
            response.json().then(function(data) {
               // save the lat and lon to use for forecast
               lng = data.coord.lon;
               lat = data.coord.lat;

               // start building the rows and such
               var rowCurrentWeather = document.createElement("div");
               rowCurrentWeather.classList = "row no-gutter";
               divWeather.append(rowCurrentWeather);

               var divCardCurrent = document.createElement("div");
               divCardCurrent.classList = "card col-12";
               rowCurrentWeather.append(divCardCurrent);

               var divCardBodyCurrent = document.createElement("div");
               divCardBodyCurrent.classList = "card-body";
               divCardCurrent.append(divCardBodyCurrent);

               var titleCurrent = document.createElement("h5");
               titleCurrent.classList = "card-title";
               titleCurrent.innerHTML = data.name + " (" + moment(new Date()).format("MM/DD/YYYY") + ") <img class='card-image' src='https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'>";
               divCardBodyCurrent.append(titleCurrent);

               var divCurrTemp = document.createElement("div");
               divCurrTemp.classList = "card-text";
               divCurrTemp.innerHTML = "Temperature: " + data.main.temp + "&#8457;";
               divCardBodyCurrent.append(divCurrTemp);

               var divCurrHumidity = document.createElement("div");
               divCurrHumidity.classList = "card-text";
               divCurrHumidity.innerHTML = "Humidity: " + data.main.humidity + "%";
               divCardBodyCurrent.append(divCurrHumidity);

               var divCurrWind = document.createElement("div");
               divCurrWind.classList = "card-text";
               divCurrWind.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
               divCardBodyCurrent.append(divCurrWind);
               
               // UV Index information comes from a different place, so make the pull now with data from latitude and longitude
               var apiUVUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + APPID;

               fetch(apiUVUrl)
                  .then(function(response) {
                     if(response.ok) {
                        response.json()
                           .then(function(data) {
                              var backgroundColor;
                              var idxUV = parseFloat(data.value);
                              var divCurrUV = document.createElement("div");
                              divCurrUV.class = "card-text";
                              divCurrUV.innerHTML = "UV Index: ";
                              
                              var spanUV = document.createElement("span");
                              spanUV.class = "card-text";
                              spanUV.innerHTML = data.value;
                              if (idxUV < 3) {
                                 backgroundColor = "green";
                              } else if (idxUV >= 3 && idxUV < 6) {
                                 backgroundColor = "gray";
                              } else if (idxUV >= 6 && idxUV < 8) {
                                 backgroundColor = "orange";
                              } else if (idxUV >= 8 && idxUV < 11) {
                                 backgroundColor = "red";
                              } else {
                                 backgroundColor = "purple";
                              }
                              spanUV.style.backgroundColor = backgroundColor;
                              spanUV.style.color = "white";
                              spanUV.style.padding = "3px";
                              spanUV.style.borderRadius = "5px";
                              spanUV.style.fontFamily = "Arial";
                              spanUV.style.fontSize = "12px";

                              divCurrUV.append(spanUV);
                              divCardBodyCurrent.append(divCurrUV);
                           });
                     }
                  });
               // call the get forecast and create the forcast cards
               getForecast(lat, lng);
            });
         } else {
            //alert("error will robinson, error!");
            var rowCurrentWeather = document.createElement("div");
            rowCurrentWeather.classList = "row no-gutter";
            divWeather.append(rowCurrentWeather);
   
            var divCardCurrent = document.createElement("div");
            divCardCurrent.classList = "card col-12";
            rowCurrentWeather.append(divCardCurrent);
   
            var divCardBodyCurrent = document.createElement("div");
            divCardBodyCurrent.classList = "card-body text-white bg-danger";
            divCardCurrent.append(divCardBodyCurrent);
   
            var titleCurrent = document.createElement("h5");
            titleCurrent.classList = "card-title";
            titleCurrent.innerHTML = "The openweather api was unable to find your city based on the information given.  Please try again.";
            divCardBodyCurrent.append(titleCurrent);

            inputSearch.innerHTML = "";
         }
      })
      .catch(function(error) {
         console.log(error);
   });
}

// pull the 5-day forecast
var getForecast = function(lat, lon) {
   // create api to get forecast
   var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + APPID;

   fetch(apiUrl).then(function(response) {
      if (response.ok) {

         // build the display of 5-day forecast so it shows in horizontal cards
         var rowForecast = document.createElement("div");
         rowForecast.classList = "row-cols-4 no-gutter";
         divWeather.append(rowForecast);

         var divCardColumns = document.createElement("div");
         divCardColumns.classList = "card-deck";
         rowForecast.append(divCardColumns);

         response.json().then(function(data) {
            
            for (var i = 1; i < 6; i++) {
               var divCardFore = document.createElement("div");
               divCardFore.classList = "card text-white bg-primary mb-3 w-auto";
               divCardColumns.append(divCardFore);

               var divForeCardBody = document.createElement("div");
               divForeCardBody.classList = "card-body";
               divCardFore.append(divForeCardBody);

               var hDate = document.createElement("h6");
               hDate.classList = "card-title";
               hDate.innerHTML = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
               divForeCardBody.append(hDate);

               var divImg = document.createElement("div");
               divImg.classList = "card-text";
               divImg.innerHTML = "<img class='card-image' src='https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png'>"
               divForeCardBody.append(divImg);

               var divHigh = document.createElement("div");
               divHigh.classList = "card-text";
               divHigh.innerHTML = "High: " + data.daily[i].temp.max + "&#8457;";
               divForeCardBody.append(divHigh);

               var divLow = document.createElement("div");
               divLow.classList = "card-text";
               divLow.innerHTML = "Low: " + data.daily[i].temp.min + "&#8457;";
               divForeCardBody.append(divLow);

               var divHumidity = document.createElement("div");
               divHumidity.classList = "card-text";
               divHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
               divForeCardBody.append(divHumidity);

               var divUV = document.createElement("div");
               divUV.classList = "card-text";
               var idxUV = parseFloat(data.daily[i].uvi);
               var backgroundColor;
               if (idxUV < 3) {
                  backgroundColor = "green";
               } else if (idxUV >= 3 && idxUV < 6) {
                  backgroundColor = "gray";
               } else if (idxUV >= 6 && idxUV < 8) {
                  backgroundColor = "orange";
               } else if (idxUV >= 8 && idxUV < 11) {
                  backgroundColor = "red";
               } else {
                  backgroundColor = "purple";
               }
               divUV.innerHTML = "UV: ";

               var spanUV = document.createElement("span");
               spanUV.textContent = data.daily[i].uvi;
               spanUV.style.backgroundColor = backgroundColor;
               spanUV.style.color = "white";
               spanUV.style.padding = "3px";
               spanUV.style.borderRadius = "5px";
               spanUV.style.fontFamily = "Arial";
               spanUV.style.fontSize = "12px";
               divUV.append(spanUV);

               divForeCardBody.append(divUV);
            }
            
         });
      }
   });
}

// clear any wather on the screen
var clearCurrent = function() {
  $("#weather").empty();
}


// event handlers
// search button was clicked, so clear previous weather information and pull new
var btnSearchHandler = function(event) {
   event.preventDefault();

   clearCurrent();
   currentCity = inputSearch.value;
   if (currentCity !== "") {
      clearCurrent();
      saveLoc(currentCity);
      inputSearch.value = "";
      getCurrentWeather(currentCity);
   }
}

// build the list of previously searched cities
var showCities = function() {
   if (cities) {
      $(inputEl).empty();
      var btns = document.createElement("div");
      btns.classList = "list-group";
      // loop through cities and add as <a> to the list
      for (var i = 0; i < cities.length; i++) {
         var theBtn = document.createElement("a");
         theBtn.setAttribute("href","#");
         theBtn.setAttribute("id","loc-btn");
         theBtn.textContent = cities[i];
         if (cities[i] === currentCity) {
            theBtn.classList = "list-group-item list-group-item-action active";
         } else {
            theBtn.classList = "list-group-item list-group-item-action";
         }
         btns.prepend(theBtn)
      }
      $("#previousSearches").append(btns);
   }

}

// add the location to the locations array
var saveLoc = function(loc) {
   if (cities === null) {
      cities = [loc];
   } else if (cities.indexOf(loc) === -1) {
      cities.push(loc);
   }

   // save the array to localstorage
   localStorage.setItem("wdcities", JSON.stringify(cities));
   showCities();
}

// event listeners
btnSearch.addEventListener("click", btnSearchHandler);
$(document).on("click", "#loc-btn", function() {
   clearCurrent();
   currentCity = $(this).text();
   showCities();
   getCurrentWeather(currentCity);
})

// fire off functions
initialize();
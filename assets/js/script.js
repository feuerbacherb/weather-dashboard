// variables


// functions
var getCurrentWeather = function(objWeather) {
   var apiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=78608&units=imperial&APPID=5fdccbd9d0af61e0aa359962e7e15555";
   var theCity = "";
   var theLat = "";
   var theLng = "";
   var theDate = "";
   var theTemp = "";
   var theHumidity = "";
   var theWind = "";
   var theUVIdx = "";

   fetch(apiUrl).then(function(response) {
      if (response.ok) {
         response.json().then(function(data) {
            console.log(data);
            objWeather.city = data.name;
            objWeather.date = "(" + moment(new Date()).format("MM/DD/YYYY") + ")";
            objWeather.temp = data.main.temp;
            objWeather.humidity = data.main.humidity;
            objWeather.wind = data.wind.speed;
            objWeather.lat = data.coord.lat;
            objWeather.lng = data.coord.lon;
            console.log(objWeather);
/*
            theCity = data.name;
            theDate = "(" + moment(new Date()).format("MMM/DD/YYYY") + ")";
            theTemp = data.main.temp;
            theHumidity = data.main.humidity;
            theWind = data.wind.speed;
            theLat = data.coord.lat;
            theLng = data.coord.lng;
*/
               var apiUVUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + objWeather.lat + "&lon=" + objWeather.lng + "&APPID=5fdccbd9d0af61e0aa359962e7e15555";

            fetch(apiUVUrl)
               .then(function(response) {
                  if(response.ok) {
                     response.json()
                        .then(function(data) {
                           objWeather.idxUV = data.value;
                        });
                  }
               });
            console.log("objWeather = " + objWeather.idxUV);
         });
      }
   });

   
   
}

var getForecast = function() {
   // create api to get forecast
   var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=78608&units=imperial&APPID=5fdccbd9d0af61e0aa359962e7e15555";
   var tempMin = 0;
   var tempMax = 0;


   fetch(apiUrl).then(function(response) {
      //console.log(response);
      if (response.ok) {
         response.json().then(function(data) {
            //console.log(data);
            for (var i = 6; i < data.list.length; i+=8) {
               //console.log(moment(data.list[i].dt_txt).format("MMM Do YYYY"));
               
            }
         });
      }
   });
}


// event handlers


// event listeners


// fire off functions
getCurrentWeather(objWeather);
getForecast();
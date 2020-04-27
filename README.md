# Weather Dashboard

## Description
* If you type in a city in the search field and click the magnifying glass, the web page will use OpenWeatherMap's API to pull back weather related information
  * Current weather
  * 5 day forecast
  * Color Coded UV Index based on the EPA's standards
    * UVI < 3 - Green
    * UVI >= 3 AND UVI < 6 - Gray
    * UVI >= 6 AND UVI < 8 - Orange
    * UVI >= 8 AND UVI < 11 - Red
    * UVI >= 11 - Purple
* The city searched is stored in local storage and presented when the page is refreshed
  * The list is made so that duplicate entries should not exist
    * CAVEAT - If the user types in New York and NewYork, the system sees this as two separate entities
  * It displays as a hyperlink in its active state
* When closed and revisited, the page will display the cities searched
  * Current weather and 5 day forecast will be displayed for last city searched
  * All other cities are listed underneath as buttons that can be used to pull weather data
    * CAVEAT - If the user's browser is set to clear cache on exit, the list of cities will be lost

## URLs
* [Live Weather Dashboard](https://feuerbacherb.github.io/weather-dashboard/)
* [GitHub Repo](https://github.com/feuerbacher/weather-dashboard/)

## Image
![Image of weather dashboard](https://feuerbacherb.github.io/weather-dashboard/assets/images/weather-dashboard.jpg)
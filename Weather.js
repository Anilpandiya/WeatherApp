var api = "http://openweathermap.org/data/2.5/weather?";
var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }


$("#go").click(function (){
	var a = "q=" + $("#inputcity").val(); 
       getWeatherByCity(a);
});


  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });
  
})

function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon + "&appid=b6907d289e10d714a6e88b30761fae22"; //api id is nothing just Api owner unique key
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
      if ('#desc') {$('#icon').removeClass('abc').addClass('fa fa-cloud');}
    }
  });
}

function getWeatherByCity(a){
	
	var urlString = api + a + "&appid=b6907d289e10d714a6e88b30761fae22";
	$.ajax({
    url: urlString, success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
      if ('#desc') {$('#icon').removeClass('abc').addClass('fa fa-cloud');}
    },
    error: function(){
    alert('City not found');}
});
	}





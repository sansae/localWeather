var temp;
var fahrenheit;
var celcius;

function getLocation() {
  navigator.geolocation.getCurrentPosition(showCoords);

  function showCoords(pos) {
    var lon = pos.coords.longitude;
    var lat = pos.coords.latitude;
    $("#coord").html("Longitude: " + lon + "<br>" + "Latitude: " + lat);

    var api = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;
    $.getJSON(api, function(json){
      var city = json.name;
      var state = json.sys.country;
      temp = json.main.temp;
      fahrenheit = Math.round((((temp * 9) / 5) + 32) * 10) / 10;
      var forecast = json.weather[0].main;
      var icon = json.weather[0].icon;

      $("#title").html("Today's Weather");
      $("#location").html(city + ", " + state);
      $('#temperature').html('<span id="temp"></span><button onclick="switchScale()"><span id="scale">F</span></button>');
      $("#temp").html(fahrenheit);
      $("#forecast").html(forecast);

      var img = new Image();
      img.src = icon;
      $("#icon").html(img);
    });
  };
};

function convertToCelcius() {
  celcius = Math.round((((fahrenheit - 32) * 5) / 9) * 10) / 10;
  $("#temp").html(celcius);
  $("#scale").html("C");
};

function convertToFahrenheit() {
  fahrenheit = Math.round((((temp * 9) / 5) + 32) * 10) / 10;
  $("#temp").html(fahrenheit);
  $("#scale").html("F");
};

function switchScale() {
  if ($("#scale").text() == "F") {
    convertToCelcius();
  } else {
    convertToFahrenheit();
  };
};

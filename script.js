var temp;
var far;

function getLocation() {
  navigator.geolocation.getCurrentPosition(showCoords);

  function showCoords(pos) {
    var lon = pos.coords.longitude;
    var lat = pos.coords.latitude;
    $("#coord").html("Longitude: " + lon + "<br>" + "Latitude: " + lat);

    var api = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;
    $.getJSON(api, function(json){
      console.log(json.coord);
      var city = json.name;
      var state = json.sys.country;
      temp = json.main.temp;
      var forecast = json.weather[0].main;
      var icon = json.weather[0].icon;

      $("#location").html(city + ", " + state);
      $("#temp").html(temp);
      $("#forecast").html(forecast);

      var img = new Image();
      img.src = icon;
      $("#icon").html(img);
    });
  };
};

function convertToCel() {
  far = (((temp * 9) / 5) + 32).toFixed(1);
  $("#temp").html(far);
  $("#scale").html("F");
};

function convertToFah() {
  cel = (((far - 32) * 5) / 9).toFixed(1);
  $("#temp").html(cel);
  $("#scale").html("C");
};

function switchScale() {
  if ($("#scale").text() == "C") {
    convertToCel();
  } else {
    convertToFah();
  };
};

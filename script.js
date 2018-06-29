var temp;
var fahrenheit;
var celcius;

function getLocation() {
  navigator.geolocation.getCurrentPosition(showCoords, error);

  function getWeatherInfo(json) {
    $('#loadingMsg').show();

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
  }

  function showCoords(pos) {
    var lon = pos.coords.longitude;
    var lat = pos.coords.latitude;
    var api = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;

    $.ajax({
      dataType: "jsonp",
      type: "GET",
      url: api,
      success: function(json) {
        getWeatherInfo(json);
      }
    })
    .done(function() {
      $('#loadingMsg').hide();
    })
    .fail(function() {
      $('#loadingMsg').hide();
      $('#content').html("Could not load the weather data :(")
    });
  };

  function error(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
      case error.POSITION_UNAVAILABLE:
      case error.TIMEOUT:
      case error.UNKNOWN_ERROR:
        $.ajax({
          dataType: "jsonp",
          type: "GET",
          url: "https://ipinfo.io",
          success: function(json) {
            var coordinates = json.loc.split(",");
            var lat = coordinates[0];
            var lon = coordinates[1];
            api = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;
            $.ajax({
              dataType: "jsonp",
              type: "GET",
              url: api,
              success: function(json) {
                getWeatherInfo(json);
              }
            })
            .done(function() {
              $('#loadingMsg').hide();
            })
            .fail(function() {
              $('#loadingMsg').hide();
              $('#content').html("Could not load the weather data :(")
            });
          }
        });
        break;
    }
  }
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

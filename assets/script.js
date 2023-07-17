function o(nion) {
  console.log(nion);
}

$(function () {
  let body = $("body");
  let root = body.children().eq(1);

  /* Start search section */
  let searchDiv = $("<div>");
  let searchBarDiv = $("<div>");
  let searchBarLabel = $("<label>");
  let searchBar = $("<input>");
  root.append(searchDiv);
  searchDiv.addClass("searchDiv");
  searchDiv.append(searchBarDiv);
  searchBarDiv.append(searchBarLabel);
  searchBarDiv.addClass("searchBarDiv");
  searchBarLabel.text("Search Cities");
  searchBarDiv.append(searchBar);
  searchBar.addClass("medium-text");
  searchDiv.append("<hr>");

  // search bar label behavior
  searchBar.on("focus", function () {
    searchBarLabel.addClass("labelAct");
    searchBar.on("focusout", function () {
      if (!searchBar.val()) {
        o("test");
        searchBarLabel.removeClass("labelAct");
      }
    });
  });

  let locationsArray = [
    "Sacramento",
    "Los Angels",
    "Mokelumne Hill",
    "Roseville",
  ];

  //   for (let i = 0; i < locationsArray.length; i++) {
  //     let locationTagDiv = $("<div>");
  //     let locationName = $("<h4>");

  //     searchDiv.append(locationTagDiv);
  //     locationTagDiv.append(locationName);
  //     locationName.text(locationsArray[i]);

  //     locationTagDiv.addClass("locationTagDiv");
  //   }

  $.each(locationsArray, function (i) {
    let locationTagDiv = $("<div>");
    let locationName = $("<h4>");

    searchDiv.append(locationTagDiv);
    locationTagDiv.append(locationName);
    locationName.text(locationsArray[i]);

    locationTagDiv.addClass("locationTagDiv");
  });

  // event listener for all location tags
  $("#root").on("click", ".locationTagDiv", function () {
    let thisLocation = $(this).children().text();
    o(thisLocation);
  });
  /* End search section */

  /* Main section */
  let main = $("<main>");
  root.append(main);

  // today's weather
  let todayWeatherDiv = $("<div>");
  main.append(todayWeatherDiv);
  todayWeatherDiv.addClass("todayWeatherDiv");

  let cityName = "Sacramento";
  let date = "7/17/2023";
  let symbol = "☀️";

  let todaysLabel = $("<h1>");

  todayWeatherDiv.append(todaysLabel);
  todaysLabel.text(cityName + " " + date + " " + symbol);

  let getTemp = "98.8º";
  let getWind = "10 mph";
  let getHum = "50%";

  let temperature = $("<h4>");
  let wind = $("<h4>");
  let humidity = $("<h4>");

  todayWeatherDiv.append(temperature).append(wind).append(humidity);
  temperature.css("margin-top", "24px").text("Temperature: " + getTemp);
  wind.css("margin-top", "24px").text("Wind Speed: " + getWind);
  humidity.css("margin-top", "24px").text("Humidity: " + getHum);
});

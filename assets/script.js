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
  let searchButton = $("<button>");
  root.append(searchDiv);
  searchDiv.addClass("searchDiv");
  searchDiv.append(searchBarDiv);
  searchBarDiv.append(searchBarLabel);
  searchBarDiv.addClass("searchBarDiv");
  searchBarLabel.text("Search Cities");
  searchBarDiv.append(searchBar);
  searchBar.addClass("medium-text");
  searchDiv.append(searchButton);
  searchButton.addClass("searchButtonDisabled");
  searchButton.text("Submit");

  searchButton.click(function () {
    let value = searchBar.val();
    if (value) {
      $("main").text("");
      getRecent(value);
      getWeather(value);
      clearBtn(true);
    }
  });

  searchBar.keypress(function (event) {
    o(event);
    if (event.which == 13) {
      searchButton.click();
    }
  });

  // search bar label behavior
  searchBar.on("focus", function () {
    searchBarLabel.addClass("labelAct");
    searchBar.on("focusout", function () {
      if (!searchBar.val()) {
        searchBarLabel.removeClass("labelAct");
      }
    });
  });

  searchBar.on("change paste keydown", function () {
    if (searchBar.val()) {
      searchButton.addClass("searchButton");
    } else {
      searchButton.removeClass("searchButton");
    }
  });

  let recentSection = $("<div>");
  searchDiv.append(recentSection);

  function getRecent(x) {
    recentSection.text("");
    let seachBarVal = x;
    let mostRecent = JSON.parse(localStorage.getItem("mostRecent"));
    if (mostRecent === null) {
      mostRecent = [];
    }

    recentSection.addClass("recentSection");

    if (x) {
      if (mostRecent.includes(x)) {
        // if the parameter passed in is already included this moves the input value to the end of the array so it will appear at the top of the list.
        mostRecent.push(
          mostRecent.splice(
            mostRecent.findIndex((v) => v == x),
            1
          )[0]
        );
        localStorage.setItem("mostRecent", JSON.stringify(mostRecent));
      } else {
        mostRecent.push(seachBarVal);
        localStorage.setItem("mostRecent", JSON.stringify(mostRecent));
      }
    }

    //   for (let i = 0; i < locationsArray.length; i++) {
    //     let locationTagDiv = $("<div>");
    //     let locationName = $("<h4>");

    //     searchDiv.append(locationTagDiv);
    //     locationTagDiv.append(locationName);
    //     locationName.text(locationsArray[i]);

    //     locationTagDiv.addClass("locationTagDiv");
    //   }
    mostRecent.reverse(); // reverses the array so most recent will appear at the top of the list
    $.each(mostRecent, function (i) {
      let locationTagDiv = $("<div>");
      let locationName = $("<h4>");

      recentSection.append(locationTagDiv);
      locationTagDiv.append(locationName);
      locationName.text(mostRecent[i]);

      locationTagDiv.addClass("locationTagDiv");
    });

    return mostRecent[0];
  }
  let clearBtnDiv = $("<div>");
  searchDiv.append(clearBtnDiv);
  function clearBtn(c) {
    clearBtnDiv.text("");
    if (c) {
      let clearStorageBtn = $("<button>");

      clearBtnDiv.append(clearStorageBtn);
      clearStorageBtn.text("Clear History").addClass("clearStorageBtn");
      clearStorageBtn.on("click", function () {
        localStorage.removeItem("mostRecent");
        location.reload();
      });
    }
  }
  // event listener for all location tags
  $("#root").on("click", ".locationTagDiv", function () {
    let thisLocation = $(this).children().text();
    $("main").text("");
    getRecent(thisLocation);
    getWeather(thisLocation);
  });
  /* End search section */

  /* Main section */
  let main = $("<main>");
  root.append(main);

  // empty state
  if (localStorage.getItem("mostRecent") == null) {
    clearBtn(false);
    let emptyStateDiv = $("<div>");
    main.append(emptyStateDiv);
    emptyStateDiv.addClass("emptyStateDiv");

    let emptyStateLabel = $("<h1>");
    let emptyStateP = $("<p>");

    emptyStateDiv.append(emptyStateLabel);
    emptyStateLabel.text("No Search History Present");
    emptyStateDiv.append(emptyStateP);
    emptyStateP.text("Search cities for weather");
  } else {
    let city = getRecent();
    clearBtn(true);
    getWeather(city);
  }

  // today's weather
  function getWeather(city) {
    let currentWeather =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=04312f12b831bdd890e2b94c161c6483";

    fetch(currentWeather)
      .then(function (response) {
        return response.json();
      })
      .then(function (current) {
        let todayWeatherDiv = $("<div>");
        main.append(todayWeatherDiv);
        todayWeatherDiv.addClass("todayWeatherDiv");

        function getDate() {
          let getDate = new Date(current.dt * 1000);
          var options = { year: "numeric", month: "short", day: "numeric" };
          getDate = getDate.toLocaleString("en-US", options);
          return getDate;
        }

        // o(dayjs.unix(today.dt).format("MMM D, YYYY"));
        let cityName = city;
        let date = getDate();

        let todaysLabel = $("<h1>");

        todayWeatherDiv.append(todaysLabel);
        todaysLabel.text(cityName + ", " + date);

        let getTemp = current.main.temp + "ºF";
        let getWind = current.wind.speed + " MPH";
        let getHum = current.main.humidity + "%";
        let getIcon = current.weather[0].icon;
        let getDescription = current.weather[0].description;

        let temperature = $("<h4>");
        let wind = $("<h4>");
        let humidity = $("<h4>");
        let icon = $("<img>");
        let description = $("<p>");

        todayWeatherDiv
          .append(icon)
          .append(description)
          .append(temperature)
          .append(wind)
          .append(humidity);
        icon.attr("src", "./assets/images/weather-icons/" + getIcon + ".png");
        description.addClass("todaysDescription").text(getDescription);
        temperature.css("margin-top", "24px").text("Temperature: " + getTemp);
        wind.css("margin-top", "24px").text("Wind Speed: " + getWind);
        humidity.css("margin-top", "24px").text("Humidity: " + getHum);
      });

    // five day forcast
    let fetchFiveDayWeather =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=04312f12b831bdd890e2b94c161c6483";

    fetch(fetchFiveDayWeather)
      .then(function (response) {
        return response.json();
      })
      .then(function (weather) {
        // common function for get date and converting.
        function getDate(data) {
          let getDate = new Date(weather.list[data].dt_txt);
          var options = { year: "numeric", month: "short", day: "numeric" };
          getDate = getDate.toLocaleString("en-US", options);
          return getDate;
        }

        function getIcon(data) {
          let icon = weather.list[data].weather[0].icon;
          let srcIcon = "./assets/images/weather-icons/" + icon + ".png";
          return srcIcon;
        }

        let getFiveDay = [
          {
            date: getDate(7),
            symbol: getIcon(7),
            description: weather.list[7].weather[0].description,
            temperature: weather.list[7].main.temp,
            wind: weather.list[7].wind.speed,
            humid: weather.list[7].main.humidity,
          },
          {
            date: getDate(9),
            symbol: getIcon(9),
            description: weather.list[9].weather[0].description,
            temperature: weather.list[15].main.temp,
            wind: weather.list[15].wind.speed,
            humid: weather.list[15].main.humidity,
          },
          {
            date: getDate(17),
            symbol: getIcon(17),
            description: weather.list[23].weather[0].description,
            temperature: weather.list[23].main.temp,
            wind: weather.list[17].wind.speed,
            humid: weather.list[17].main.humidity,
          },
          {
            date: getDate(25),
            symbol: getIcon(25),
            description: weather.list[31].weather[0].description,
            temperature: weather.list[31].main.temp,
            wind: weather.list[25].wind.speed,
            humid: weather.list[25].main.humidity,
          },
          {
            date: getDate(33),
            symbol: getIcon(33),
            description: weather.list[33].weather[0].description,
            temperature: weather.list[39].main.temp,
            wind: weather.list[33].wind.speed,
            humid: weather.list[33].main.humidity,
          },
        ];

        let fiveDayDiv = $("<div>");
        main.append(fiveDayDiv);
        fiveDayDiv.addClass("fiveDayDiv");

        for (let i = 0; i < 5; i++) {
          //   $.each(getFiveDay, function (i) {
          let card = $("<card>");
          let fdDate = $("<h2>");
          let fdSymbol = $("<img>");
          let fdDesc = $("<p>");
          let fdTemp = $("<h4>");
          let fdWind = $("<h4>");
          let fdHum = $("<h4>");

          fiveDayDiv.append(card);
          card.addClass("fiveDayCard");
          card.append(fdDate);
          card.append(fdSymbol);
          card.append(fdDesc);
          card.append(fdTemp);
          card.append(fdWind);
          card.append(fdHum);
          fdDate.text(getFiveDay[i].date);
          fdSymbol.attr("src", getFiveDay[i].symbol);
          fdDesc.text(getFiveDay[i].description);
          fdTemp.text("Temperature: " + getFiveDay[i].temperature + "ºF");
          fdWind.text("Wind Speed: " + getFiveDay[i].wind + "MPH");
          fdHum.text("Humidity: " + getFiveDay[i].humid + "%");
          //   });
        }
      });
  }
});

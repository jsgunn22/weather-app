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
});

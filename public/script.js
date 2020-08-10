fetch('/arenas', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((res) => res.json())
  .then((data) => {
    displayAPI(data);
  });

function displayAPI(data) {
  _.each(data, (entry) => {
    image = entry.Image;
    capacity = entry.Capacity;
    firstSeason = entry['First Season'];

    team = entry.Team;
    arena = entry.Arena;
    long = entry['Coordinates'][1].toFixed(4);
    lat = entry['Coordinates'][0].toFixed(4);

    var marker = new mapboxgl.Marker()
      .setLngLat([long, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div>
          <img src="${image}" alt="${arena}" width="200" height="100" class="arenaImg">
          <div>The ${team}</div>
          <div>Play in the ${arena}</div>
          <div>Located at ${long} long and ${lat} lat</div>
          <div> ${arena} has been around since <strong>${firstSeason}</strong> and hold ${capacity} seats.</div>
        </div>`
        )
      )
      .addTo(map);
  });
}

window.onload = function () {
  setTimeout(function () {
    displayAPI();
  }, 10000);
};

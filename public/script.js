$('#NHL_Toggle').click(function (e) {
  $('.NHL_Marker').toggleClass('hidden', !this.checked);
});

$('#NBA_Toggle').click(function (e) {
  $('.NBA_Marker').toggleClass('hidden', !this.checked);
});

fetch('/NHL', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((res) => res.json())
  .then((data) => {
    NHL_API(data);
  });

function NHL_API(data) {
  _.each(data, (entry) => {
    image = entry.Image;
    capacity = entry.Capacity;
    firstSeason = entry['First Season'];

    team = entry.Team;
    arena = entry.Arena;
    long = entry['Coordinates'][1].toFixed(4);
    lat = entry['Coordinates'][0].toFixed(4);

    var el = document.createElement('div');
    el.className = 'NHL_Marker';
    el.innerHTML =
      '<svg viewBox="0 0 20 20" transform="rotate(-90)" fill="currentColor" class="location-marker w-6 h-6"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>';

    new mapboxgl.Marker(el, { offset: [-20, 0] })
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

fetch('/NBA', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((res) => res.json())
  .then((data) => {
    NBA_API(data);
  });

function NBA_API(data) {
  _.each(data, (entry) => {
    image = entry.Image;
    capacity = entry.Capacity;
    firstSeason = entry['opened'];

    team = entry.Team;
    arena = entry.Arena;
    long = entry['Coordinates'][1].toFixed(4);
    lat = entry['Coordinates'][0].toFixed(4);

    var el = document.createElement('div');
    el.className = 'NBA_Marker hidden';
    el.innerHTML =
      '<svg viewBox="0 0 20 20" transform="rotate(90)" fill="currentColor" class="location-marker w-6 h-6"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>';

    new mapboxgl.Marker(el, { offset: [15, 0] })
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

$('#NHL_Toggle').click(function (e) {
  $('.NHL_Marker').toggleClass('hidden', !this.checked);
});

$('#NBA_Toggle').click(function (e) {
  $('.NBA_Marker').toggleClass('hidden', !this.checked);
});

$('#NFL_Toggle').click(function (e) {
  $('.NFL_Marker').toggleClass('hidden', !this.checked);
});

$('#MLB_Toggle').click(function (e) {
  $('.MLB_Marker').toggleClass('hidden', !this.checked);
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
    let image = entry.Image;
    let capacity = entry.Capacity;
    let firstSeason = entry['First Season'];

    let team = entry.Team;
    let arena = entry.Arena;
    let long = entry['Coordinates'][1].toFixed(4);
    let lat = entry['Coordinates'][0].toFixed(4);
    let location = entry['Location'];

    let url = arena.split(' ').join('_');

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
          <div>The <strong>${team}</strong></div>
          <div>Play in the <strong>${arena}</strong> located in <strong>${location}</strong></div>
          <div>Located at <strong>[${lat}, ${long}]</strong></div>
          <div> ${arena} has been around since <strong>${firstSeason}</strong> and holds <strong>${capacity}</strong> seats.</div>
          <div><a href="https://en.wikipedia.org/wiki/${url}">More Info on Wiki</a></div>
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
    let image = entry.Image;
    let capacity = entry.Capacity;
    let firstSeason = entry['opened'];

    let team = entry.Team;
    let arena = entry.Arena;
    let long = entry['Coordinates'][1].toFixed(4);
    let lat = entry['Coordinates'][0].toFixed(4);
    let location = entry['Location'];

    let url = arena.split(' ').join('_');

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
          <div>The <strong>${team}</strong></div>
          <div>Play in the <strong>${arena}</strong> located in <strong>${location}</strong></div>
          <div>Located at <strong>[${lat}, ${long}]</strong></div>
          <div> ${arena} has been around since <strong>${firstSeason}</strong> and holds <strong>${capacity}</strong> seats.</div>
          <div><a href="https://en.wikipedia.org/wiki/${url}">More Info on Wiki</a></div>
        </div>`
        )
      )
      .addTo(map);
  });
}

fetch('/NFL', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((res) => res.json())
  .then((data) => {
    NFL_API(data);
  });

function NFL_API(data) {
  _.each(data, (entry) => {
    let image = entry.Image;
    let capacity = entry.Capacity;
    let firstSeason = entry['opened'];

    let team = entry.Team;
    let arena = entry.Arena;
    let long = entry['Coordinates'][1].toFixed(4);
    let lat = entry['Coordinates'][0].toFixed(4);
    let location = entry['Location'];
    let surface = entry['Surface'];
    let roof = entry['Roof Type']; //TYPO ON THIS LINE, FIXED IN SCRIPT NEEDS TO BE RERUN

    let url = arena.split(' ').join('_');

    var el = document.createElement('div');
    el.className = 'NFL_Marker hidden';
    el.innerHTML =
      '<svg viewBox="0 0 20 20" fill="currentColor" class="location-marker w-6 h-6"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>';

    new mapboxgl.Marker(el, { offset: [0, -15] })
      .setLngLat([long, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div>
          <img src="${image}" alt="${arena}" width="200" height="100" class="arenaImg">
          <div>The <strong>${team}</strong></div>
          <div>Play in the <strong>${arena}</strong> located in <strong>${location}</strong></div>
          <div>Located at <strong>[${lat}, ${long}]</strong></div>
          <div> ${arena} has been around since <strong>${firstSeason}</strong> and holds <strong>${capacity}</strong> seats.</div>
          <div>games are played on a <strong>${surface}</strong> field and has a <strong>${roof}</strong> Roof.</div>
          <div><a href="https://en.wikipedia.org/wiki/${url}">More Info on Wiki</a></div>
        </div>`
        )
      )
      .addTo(map);
  });
}

fetch('/MLB', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((res) => res.json())
  .then((data) => {
    MLB_API(data);
  });

function MLB_API(data) {
  _.each(data, (entry) => {
    let image = entry.Image;
    let capacity = entry.Capacity;
    let firstSeason = entry['opened'];

    let team = entry.Team;
    let arena = entry.Arena;
    let long = entry['Coordinates'][1].toFixed(4);
    let lat = entry['Coordinates'][0].toFixed(4);
    let location = entry['Location'];
    let surface = entry['Surface'];
    let roof = entry['Roof Type'];

    let url = arena.split(' ').join('_');

    var el = document.createElement('div');
    el.className = 'MLB_Marker hidden';
    el.innerHTML =
      '<svg viewBox="0 0 20 20" transform="rotate(180)" fill="currentColor" class="location-marker w-6 h-6"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>';

    new mapboxgl.Marker(el, { offset: [0, 15] })
      .setLngLat([long, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div>
          <img src="${image}" alt="${arena}" width="200" height="100" class="arenaImg">
          <div>The <strong>${team}</strong></div>
          <div>Play in the <strong>${arena}</strong> located in <strong>${location}</strong></div>
          <div>Located at <strong>[${lat}, ${long}]</strong></div>
          <div> <strong>${arena}</strong> has been around since <strong>${firstSeason}</strong> and holds <strong>${capacity}</strong> seats.</div>
          <div>games are played on a <strong>${surface}</strong> field and has a <strong>${roof}</strong> Roof.</div>
          <div><a href="https://en.wikipedia.org/wiki/${url}">More Info on Wiki</a></div>
        </div>`
        )
      )
      .addTo(map);
  });
}

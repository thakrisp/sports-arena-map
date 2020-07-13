fetch('/arenas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res => res.json()).then(data => {
          displayAPI(data);
      })

  function displayAPI(data) {

    _.each(data, entry =>{
      //console.log("Here is your entry ", entry);
      team = entry.team;
      arena = entry.arena;
      long = entry.long;
      lat = entry.lat;

      var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div>
          <div>The ${team}</div>
          <div>Play in the ${arena}</div>
          <div>Located at ${long} long and ${lat} lat</div>
        </div>`
      );

      var marker = new mapboxgl.Marker()
      .setLngLat([long, lat])
      .addTo(map)
      .setPopup(popup);

      //console.log('The ' + team + ' Play in the ' + arena + ' located at ' + lat + ' lat and ' + long + ' long');
    })
  };

  window.onload = function(){
    setInterval(function(){
        displayAPI();
    }, 10000);
 };
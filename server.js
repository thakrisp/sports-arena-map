if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express();
const axios = require('axios');
const _ = require('lodash');

app.use(express.json());
app.use(express.static('public'));

app.get('/arenas', (req, res) => {
    const url = `https://raw.github.com/nhlscorebot/arenas/master/teams.json`

    axios({
        url: url,
        responseType: 'json'
    })
    .then(massageData)
    .then(array => res.json(array))
})

function massageData (payload) {
    let a = payload.data;

    //below is what map is doing to create a list of _.keys(a);
/*     var properties = _.keys(a)
    var ar = [];
    for (var i = 0; i < properties.length; i++) {
        var key = properties[i];
        var value = a[key];
        value.name = key;
        ar.push(value);
    }
    return ar; */

    return _.map(_.keys(a), k => _.merge({team: k}, a[k]))
/*     let propertyKeys = _.keys(a)
    return _.map(propertyKeys, propertyKey => {
        let newObject = {team: propertyKey};
        let propertyValue = a[propertyKey]; // a['Carolina Hurricanes']
        return _.merge(newObject, propertyValue);
    }) */
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
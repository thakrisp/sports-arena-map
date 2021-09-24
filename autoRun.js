let { PythonShell } = require('python-shell');

PythonShell.run('./Scripts/NHL_scrapping.py', null, function (err) {
  if (err) throw err;
  console.log('NHL finished');
});

PythonShell.run('./Scripts/NBA_scrapping.py', null, function (err) {
  if (err) throw err;
  console.log('NBA finished');
});

PythonShell.run('./Scripts/NFL_scrapping.py', null, function (err) {
  if (err) throw err;
  console.log('NFL finished');
});

PythonShell.run('./Scripts/MLB_scrapping.py', null, function (err) {
  if (err) throw err;
  console.log('MLB finished');
});

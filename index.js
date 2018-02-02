var SheetFetcher = require("./GoogleSheetsFetch");
var defaults = require('./test_defaults.js') || {};
var _ = require('lodash');

function example()
{
  let d = SheetFetcher("https://docs.google.com/spreadsheets/d/e/2PACX-1vRIUJAFGBMWCnlJeOLkkoVt15zl1x5jwz8hNBTyzCWwcUGCYNBnDG5cdlZfFu5RlIwyEkY8-D4Irb3V/pub?gid=0&single=true&output=csv","~");
  
  d.getData()
  .then((data) => {
    _.forEach(data, (d) => console.log(JSON.stringify(d),"\n"));
  })
  .catch((err) => {
    console.log(err);
  });
}

example();

module.exports = SheetFetcher;
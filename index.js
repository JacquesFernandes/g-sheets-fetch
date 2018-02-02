var SheetFetcher = require("./GoogleSheetsFetch");
var defaults = require('./test_defaults.js') || {};

function example()
{
  let d = SheetFetcher(defaults.sheets_link);
  
  d.getData()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = SheetFetcher;
var SheetFetcher = require("./GoogleSheetsFetch");
var defaults = require('./test_defaults.js') || {};

let d = SheetFetcher(defaults.sheets_link);

d.getData()
.then((data) => {
  console.log(data);
})
.catch((err) => {
  console.log(err);
})
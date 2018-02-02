# g-sheets-fetch
 - Fetch data from a public Google Sheets file and convert to JSON
 - Check the index.js for usage example

# In case your sheet content has commas (,):
  - Find and replace (there's a functionality built into Sheets to do this) all the commas (,) with a "special replacement symbol"
  - Ideally, the "special replacement symbol" should be a symbol like "~" which is never used in the content
  - Pass this "special replacement symbol" as the second argument when creating an instance of GoogleSheetsFetch

# Setting up your Sheets document
https://help.aftership.com/hc/en-us/articles/115008490908-CSV-Auto-Fetch-using-Google-Drive-Spreadsheet

# Usage
 - Import the `GoogleSheetsFetch.js` file
 - "Create" and "instance" of it, for example;
  ```javascript
    var SheetFetch = require('./GoogleSheetsFetch.js');
    var url = [your url here]
    var sheet_fetcher = SheetFetch(url) // it'll be (url, special_replacement_symbol) if your sheet content contains commas (,)
    
    sheet_fetcher.getData()
    .then((list_of_json_data) => {
      // handle json data list
    })
    .catch((err) => {
      // handle error
    })
  ```
 - Check `index.js` for an example
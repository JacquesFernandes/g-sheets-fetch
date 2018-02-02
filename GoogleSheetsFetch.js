var axios = require('axios');
var _ = require('lodash');
var chalk = require('chalk');

let old_log = console.log;

var generateMethodLog = function(function_name) {

  let methodLog = (...text) => {
    let ret = chalk.blue("["+function_name+"] ")+_.join(text," ");
    old_log(ret);
    return(ret);
  }

  return(methodLog);
}

module.exports = (published_sheet_url) => {

  console.log = generateMethodLog("GoogleSheetsFetch");

  var getURL = function() {
    return(this.url)
  }

  var setURL = function(url) {
    this.url = url;
  }

  var getData = function() {
    return new Promise((resolve, reject) => {
      axios.get(this.url)
      .then((response) => {
        let csv = response.data || "";
        csv = _.split(csv, "\n"); // convert to lines
        let keys = csv.shift().split(",");
        keys = _.map(keys, (key) => (_.trim(key)));
  
        let json_data = _.map(csv, (entry) => {
          let data = {};
          
          entry = _.map(_.split(entry, ","), (e) => (_.trim(e)) );
          
          _.forEach(keys, (key, index) => {
            data[key] = entry[index]
          });
          
          return(data);
        });
        
        //console.log(JSON.stringify(json_data));
        resolve(json_data);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  return({
    
    url: published_sheet_url,

    getURL,
    setURL,
    getData,
  });
}
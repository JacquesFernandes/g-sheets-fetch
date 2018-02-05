var axios = require('axios');
var _ = require('lodash');
var chalk = require('chalk');

var generateMethodLog = function(function_name) {

  let methodLog = (...text) => {
    let ret = chalk.blue("["+function_name+"] ")+_.join(text," ");
    console.log(ret);
    return(ret);
  }

  return(methodLog);
}

module.exports = (published_sheet_url, comma_replacement_char) => {

  methodLog = generateMethodLog("GoogleSheetsFetch");

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
            if(!_.isEmpty(this.comma_replacement) && _.includes(entry[index], this.comma_replacement)){
              let sample = entry[index];
              while(_.includes(sample, this.comma_replacement)){
                sample = _.replace(sample, this.comma_replacement, ",");
              }
              data[key] = sample;
            }
            else{
              data[key] = entry[index];
            }
          });
          
          return(data);
        });
        
        //methodLog(JSON.stringify(json_data));
        resolve(json_data);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  return({
    url: published_sheet_url,
    comma_replacement: comma_replacement_char,
    getURL,
    setURL,
    getData,
  });
}
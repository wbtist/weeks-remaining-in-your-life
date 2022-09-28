'use strict'

// let parsedData = JSON.parse(data);
// console.log(parsedData);


fetch("./data/male_data.json")
  .then(response => response.json())
  .then(json => a = json[1][0]);
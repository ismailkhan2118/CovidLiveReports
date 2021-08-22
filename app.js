const express = require("express"); // package to use express framework
const app = express(); //creating an express object
const fetch = require("node-fetch");
let request = require("request"); //package to make http calls i.e to get data from an api
app.use(express.static("decor")); //to use custom style sheets
let data;
let states;
let last;
let total;
let raw_world_data;
let raw_world_tab_data;

// request("https://api.covid19india.org/data.json", function (err, res, body) {
//   if (!err && res.statusCode == 200) {
//     var raw_data = JSON.parse(body);
//     raw = raw_data.statewise;
//     raw.splice(31, 1);
//   } else {
//     console.log(err);
//   }
// });

// request("https://corona-api.com/countries", function (err, res, body) {
//   if (!err && res.statusCode == 200) {
//     raw_world_data = JSON.parse(body);
//     raw_world_tab_data = raw_world_data.data;
//     console.log("successfully fetched raw_world_data");
//   } else {
//     console.log(err);
//   }
// });
fetch("https://api.covid19india.org/data.json")
  .then((res) => {
    return res.json();
  })
  .then((d) => {
    if (d) {
      data = d.statewise;
      data.splice(31, 1);
    }
  })
  .catch((err) => {
    console.log(err);
  });
fetch("https://corona-api.com/countries")
  .then((res) => {
    return res.json();
  })
  .then((d) => {
    if (d) {
      raw_world_tab_data = d.data;
      console.log("successfully fetched raw_world_data");
    }
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", function (req, res) {
  if (data) res.render("home.ejs", { raw: data });
  else res.send("Unable to fetch data please Refresh :(");
});

app.get("/world", function (req, res) {
  if (raw_world_tab_data) res.render("world.ejs", { data: raw_world_tab_data });
  else res.send("Unable to fetch data please Refresh :(");
});

app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("SERVER STARTED!!!");
});

var express = require("express"); // package to use express framework
var app = express(); //creating an express object
var request = require("request"); //package to make http calls i.e to get data from an api
app.use(express.static("decor")); //to use custom style sheets

var states;
var last;
var total;
var raw_world_data;
var raw_world_tab_data;

request("https://api.covid19india.org/data.json",function(err,res,body){
	if(!err && res.statusCode == 200)
		{
		var raw_data = JSON.parse(body);
	    raw = raw_data.statewise;
		raw.splice(31,1);		
		}
	else
	{
		console.log(err);
	}
});


request("https://corona-api.com/countries",function(err,res,body){
	if(!err && res.statusCode == 200)
		{
		raw_world_data = JSON.parse(body);
		raw_world_tab_data = raw_world_data.data;
		console.log("successfully fetched raw_world_data")
		
		}
	else
	{
		console.log(err);
	}
});


app.get("/",function(req,res){
	if(raw)
		res.render("home.ejs",{raw:raw});
	else
		res.send("Unable to fetch data please Refresh :(");
});

app.get("/world",function(req,res){
	if(raw_world_tab_data)
		res.render("world.ejs",{data:raw_world_tab_data});
	else
		res.send("Unable to fetch data please Refresh :(");
});

app.listen(process.env.PORT||3000,process.env.IP,function(){
		   console.log("SERVER STARTED!!!");
});
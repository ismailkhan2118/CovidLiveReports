var express = require("express");
var app = express();
var request = require("request");
app.use(express.static("decor"));

//var d = new Date();
//var dd = d.getDate()-2;
//var mm = d.getMonth()+1;
//var yy = d.getFullYear();
//var utc = dd+"/0"+mm+"/"+yy+" 21:00:00"; //after month 9, change this line!!

 //function isLast(fruit) { 
 // return fruit.updatetimestamp === utc;
// };

function sortOn(arr,prop){
    arr.sort(
        function(a,b){
           if(a[prop] < b[prop]){
               return -1;
           } else if(a[prop]>b[prop]){
               return 1;
           } else{
               return 0;
           }
        });
};

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
		//last = raw_data.tested;
		//total = last.find(isLast).totalpositivecases;
		console.log("successfully fetched raw_data")
		
		}
	else
	{
		console.log(err);
	}
});

request("https://api.covid19india.org/data.json",function(err,res,body){
	if(!err && res.statusCode == 200)
		{
		var data = JSON.parse(body);
		//last = data.tested;
	//	total = last.find(isLast);
	    states = data.statewise;
		//var total = data.tested.find(function(details){
			//	return details.updatetimestamp === utc;
		//});
		sortOn(states,"state");
		console.log("fetched and sorted data successfully");
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
	res.render("home.ejs",{data:states,raw:raw});
});

app.get("/world",function(req,res){
	res.render("world.ejs",{data:raw_world_data,tab_data:raw_world_tab_data});
});

app.listen(process.env.PORT||3000,process.env.IP,function(){
		   console.log("SERVER STARTED!!!");
});
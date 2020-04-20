var express = require("express");
var app = express();
var request = require("request");
app.use(express.static("decor"));

var d = new Date();
var dd = d.getDate()-1;
var mm = d.getMonth()+1;
var yy = d.getFullYear();
var utc = dd+"/0"+mm+"/"+yy+" 21:00:00"; //after month 9, change this line!!

function isLast(fruit) { 
  return fruit.updatetimestamp === utc;
};

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

request("https://api.covid19india.org/data.json",function(err,res,body){
	if(!err && res.statusCode == 200)
		{
		var data = JSON.parse(body);
		last = data.tested.find(isLast);
		total = last.totalpositivecases;
		
	    states = data.statewise;
		//var total = data.tested.find(function(details){
			//	return details.updatetimestamp === utc;
		//});
		sortOn(states,"state");
		console.log("Successfully fetched data!")
		}
	else
	{
		console.log(err);
	}
});

app.get("/",function(req,res){
	res.render("home.ejs",{data:states,total:total});
});

app.listen(process.env.PORT||3000,process.env.IP,function(){
		   console.log("SERVER STARTED!!!");
});
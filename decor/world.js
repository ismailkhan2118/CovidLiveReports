var report = document.getElementById("report");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var ejs_d = document.getElementById("info");
var d = ejs_d.dataset.info;
var array = JSON.parse(d);

span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
var s;
function getCountry(evt) {
  return evt.name === s;
}

var countries = document.getElementsByTagName("path");
for (var i = 0; i < 211; i++) {
  countries[i].addEventListener("click", function () {
    s = this.getAttribute("id");
    var c = array.find(getCountry);
    if (c) {
      modal.style.display = "block";
      report.innerHTML = `<h1> DATA </h1> Country : ${c.name} <br> Confirmed : ${c.latest_data.confirmed} <br> Deaths :  ${c.latest_data.deaths} <br> Recovered : ${c.latest_data.recovered} <br> Last updated : ${c.updated_at}`;
    }
  });
}
let coll = document.getElementsByClassName("collapsible");

coll[0].addEventListener("click", function () {
  this.classList.toggle("active");
  let content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
});

var report = document.getElementById("report");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let states = document.getElementsByTagName("path");
for (let i = 0; i < 36; i++) {
  states[i].addEventListener("click", function (event) {
    let c = JSON.parse(event.target.dataset.info);
    if (c) {
      modal.style.display = "block";
      report.innerHTML = `<h1> DATA </h1> State : ${c.state} <br> Confirmed : ${c.confirmed} <br> Deaths :  ${c.deaths} <br> Recovered : ${c.recovered} <br> Last updated : ${c.lastupdatedtime}`;
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

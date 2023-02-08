import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GetBikes from './api.js';

// Business Logic
function bikes(zip, distance) {
  GetBikes.bikes()
    .then(function (response) {
      if (response) {
        printResult(response, zip, distance);
      } else {
        printError(response, zip, distance);
      }
    });
}


// UI Logic

function printError(request, search) {
  document.querySelector('#showResult').innerText = `There was an error accessing bikes ${search}: ${request.status} ${request.statusText}`;
}

function printResult(response) {
  let title = "";
  let year = "";
  let dateStolen = "";
  let frameModel = "";
  let img = "";
  let brand = "";
  let serial = "";
  let stolenLoc = "";
  let url = "";
  let text = "Information is displayed in the following order: title, year, date stolen, frame model, brand, serial number, stolen location, link and picture.";
  addP(text);
  const element = document.getElementById("div1");
  for (let x in response.bikes) {
    title = response.bikes[x].title;
    const para = document.createElement("p");
    const node = document.createTextNode(x + ") " + title);
    para.appendChild(node);
    element.appendChild(para);
    year = response.bikes[x].year;
    addP(year);
    dateStolen = new Date(response.bikes[x].date_stolen);
    addP(dateStolen);
    frameModel = response.bikes[x].frame_model;
    addP(frameModel);
    brand = response.bikes[x].manufacturer_name;
    addP(brand);
    serial = response.bikes[x].serial;
    addP(serial);
    stolenLoc = response.bikes[x].stolen_location;
    addP(stolenLoc);
    img = response.bikes[x].thumb;
    let img1 = document.createElement("img");
    img1.src = img;
    element.appendChild(img1);
    url = response.bikes[x].url;
    const a = document.createElement("a");
    const link = document.createTextNode(url);
    a.appendChild(link);
    a.href = url;
    element.appendChild(a);

  }
}

function addP(text) {
  const element = document.getElementById("div1");
  const para = document.createElement("p");
  const node = document.createTextNode(text);
  para.appendChild(node);
  element.appendChild(para);
}

function handleFormSubmission(event) {
  event.preventDefault();
  let zip = document.querySelector('#location').value;
  let distance = document.querySelector('#distance').value;
  bikes(zip, distance);
}


window.addEventListener("load", function () {
  document.querySelector('form#input').addEventListener("submit", handleFormSubmission);
});


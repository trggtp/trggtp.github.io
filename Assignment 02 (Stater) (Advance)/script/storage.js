"use strict";
"use strict";
//
const navBar = document.getElementById("sidebar");
const petArr = getFromStorage("petArr") ?? [];
const breedArr = getFromStorage("breedArr") ?? [];

//event click show navbar off navbar
navBar.addEventListener("click", function () {
  this.classList.toggle("active");
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~localStorage~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//get data petArr
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", petArr);
}
//get data breedArr
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", breedArr);
}
//save data(pettAr,breedArr) to Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//get data
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

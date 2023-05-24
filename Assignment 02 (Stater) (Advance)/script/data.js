"use strict";
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const fileImput = document.getElementById("input-file");
//
// start event export data
exportBtn.addEventListener("click", function () {
  const isExport = confirm("you will definitely show up");
  if (isExport) {
    saveDataToFile();
  }
});
//save data
function saveDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "petData.json");
}
//start evnet import data
importBtn.addEventListener("click", function () {
  if (!fileImput.value) {
    alert("please select the file you want to imput");
  } else {
    const isImport = confirm("are you sure?");
    if (isImport) {
      const file = fileImput.files[0];
      const reader = new FileReader();
      //start event load file
      reader.addEventListener("load", function () {
        saveToStorage("petArr", JSON.parse(reader.result));
        alert("successful imput !");
        //
      });
      //read file
      if (file) {
        reader.readAsText(file);
      }
      //reset
      fileImput.value = "";
    }
  }
});

"use strict";

"use strict";
//
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
//

//
renderTablebreed(breedArr);
function renderTablebreed(breedArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    tableBodyEl.appendChild(row);
    row.innerHTML = `<td scope="row">${i + 1}</td> 
    <td>${breedArr[i].breed}</td> 
    <td>${breedArr[i].type}</td>
    <td> <button class="btn btn-danger" onclick="deleteBreed('${
      breedArr[i].breed
    }')">Delete</button>
    </td> `;
  }
}
//clear InPut
const clearInput = () => {
  typeInput.value = "select Type";
  breedInput.value = "";
};

//submit-Event
submitBtn.addEventListener("click", function (e) {
  let data = {
    type: typeInput.value,
    breed: breedInput.value,
  };
  //checked validate
  let validateData = function (data) {
    let checkedData = true;
    if (data.breed.trim() === "") {
      alert("cannot be left blank ID");
      checkedData = false;
    }
    if (data.type === "Select Type") {
      alert("Please select Type!");
      checkedData = false;
    }
    return checkedData;
  };
  //validateData is ok => add data in breedArr
  const validate = validateData(data);
  if (validate) {
    //add data in arr
    breedArr.push(data);
    //save
    saveToStorage("breedArr", breedArr);
    //clear input
    clearInput();
    //show array breed
    renderTablebreed(breedArr);
  }
});
//confirm delete breed
function deleteBreed(breed) {
  const isDelete = confirm("Are you sure");
  if (isDelete) {
    for (let i = 0; i < breedArr.length; i++)
      if (breed === breedArr[i].breed) {
        //delete
        breedArr.splice(i, 1);
        //save as
        saveToStorage("breedArr", breedArr);
        //show breedArr
        renderTablebreed(breedArr);
        break;
      }
  }
}

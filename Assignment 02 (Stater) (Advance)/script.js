"use strict";

"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const test = document.getElementById("sidebar");
const btnHealthy = document.getElementById("healthy-btn");
const btnCalculate = document.getElementById("Calculate-btn");
// let petArr = [];
let data;
renderTableData(petArr);
//show list petArr
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    tableBodyEl.appendChild(row);
    row.innerHTML = `<th scope="row">${petArr[i].id}</th> 
  <td>${petArr[i].name}</td> 
  <td>${petArr[i].age}</td> 
  <td>${petArr[i].type}</td> 
  <td>${petArr[i].weight} kg</td>
   <td>${petArr[i].legnths} cm</td>
   <td>${petArr[i].breed} <td>
  <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
</td>
<td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    } " ></i></td>
<td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    } " ></i></td>
<td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    } " ></i></td>
    <td>${petArr[i].bmi}</td>
<td>${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}</td>
    <td>
    <button class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
  </td> `;
  }
}
//clear InPut
const clearInput = () => {
  idInput.value = "";
  typeInput.value = "select Type";
  vaccinatedInput.checked = false;
  lengthInput.value = "";
  weightInput.value = "";
  sterilizedInput.checked = false;
  dewormedInput.checked = false;
  breedInput.value = "select Breed";
  colorInput.value = "";
  ageInput.value = "";
  nameInput.value = "";
  colorInput.vale = "#000000";
};

//submit-Event
submitBtn.addEventListener("click", function (e) {
  data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    legnths: lengthInput.value,
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    bmi: "?",
  };
  //checked validate
  let validateData = function (data) {
    let checkedData = true;
    if (data.id.trim() === "") {
      alert("cannot be left blank ID");
      checkedData = false;
    }
    if (isNaN(data.age) || data.age > 15 || data.age < 1) {
      alert("Age must be between 1 and 15!");
      checkedData = false;
    }
    if (data.weight.trim() === "" || data.weight > 15 || data.weight < 1) {
      alert("Weight must be between 1 and 15!");
      checkedData = false;
    }
    if (data.legnths.trim() === "" || data.legnths > 100 || data.legnths < 1) {
      alert("Legnth must be between 1 and 100!");
      checkedData = false;
    }
    if (data.type === "Select Type") {
      alert("Please select Type!");
      checkedData = false;
    }
    if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      checkedData = false;
    }
    //checked ID in arr
    for (let x = 0; x < petArr.length; x++) {
      if (data.id === petArr[x].id) {
        alert("ID must be unique");
        checkedData = false;
        break;
      }
    }
    return checkedData;
  };
  //validateData is ok => add data in petArr
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", petArr);
    clearInput();
    renderTableData(petArr);
  }
});
// confirm delete pet
function deletePet(petId) {
  const isDelete = confirm("Are you sure");
  if (isDelete) {
    for (let i = 0; i < petArr.length; i++)
      if (petId === petArr[i].id) {
        //delete
        petArr.splice(i, 1);
        //save pet to storage
        saveToStorage("petArr", petArr);
        //show petArr
        renderTableData(petArr);
        break;
      }
  }
}
// show healthy pet
let checkHealthy = true;
btnHealthy.addEventListener("click", function () {
  //
  if (checkHealthy === true) {
    const healthypetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthypetArr.push(petArr[i]);
      }
    }
    renderTableData(healthypetArr);
    btnHealthy.textContent = "Show All Pet";
    checkHealthy = false;
  } else {
    renderTableData(petArr);
    btnHealthy.textContent = "Show Healthy Pet";
    checkHealthy = true;
  }
});
//Calculate BMI
btnCalculate.addEventListener("click", function () {
  //check petArr
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi =
      petArr[i].type === "Dog"
        ? ((petArr[i].weight * 703) / petArr[i].legnths ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i].legnths ** 2).toFixed(2);
  }
  renderTableData(petArr);
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~event typeinput~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
typeInput.addEventListener("click", renderBreed);
//show breed in typeinput
function renderBreed() {
  //clear input
  breedInput.innerHTML = "<option>Select Breed</option>";
  // breed classification
  if (typeInput.value === "Dog") {
    const breedDog = breedArr.filter((breedArr) => breedArr.type === "Dog");
    breedDog.forEach(function (breedArr) {
      const option = document.createElement("option");
      option.innerHTML = `${breedArr.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    const breedCat = breedArr.filter((breedArr) => breedArr.type === "Cat");
    breedCat.forEach(function (breedArr) {
      const option = document.createElement("option");
      option.innerHTML = `${breedArr.breed}`;
      breedInput.appendChild(option);
    });
  }
}

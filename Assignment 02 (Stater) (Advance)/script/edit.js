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
//
const formEl = document.getElementById("container-form");
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
    <button style="background-color:#ffc107;color:#000;" class="btn btn-danger" onclick="editPet('${
      petArr[i].id
    }')">Edit</button>
  </td> `;
  }
}
//
function editPet(id) {
  //show table
  formEl.classList.remove("hide");
  //seach pet
  const pet = petArr.find((petArr) => petArr.id === id);
  //show info
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = parseInt(pet.age);
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.legnths;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.chcked = pet.sterilized;
  renderBreed();
  breedInput.value = `${pet.breed}`;
}
//
typeInput.addEventListener("click", renderBreed);
//
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
//event click submit
submitBtn.addEventListener("click", function (e) {
  let data = {
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
    return checkedData;
  };
  //validateData is ok => add data in localStorage
  const validate = validateData(data);
  if (validate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});

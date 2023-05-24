"use strict";

"use strict";
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");
const findBtn = document.getElementById("find-btn");
//show info pet
renderTableData(petArr);

//start event find btn
findBtn.addEventListener("click", function () {
  //
  let findPetArr = petArr;
  //search id
  if (idInput.value) {
    findPetArr = findPetArr.filter((findPetArr) =>
      findPetArr.id.includes(idInput.value)
    );
  }
  //search name
  if (nameInput.value) {
    findPetArr = findPetArr.filter((findPetArr) =>
      findPetArr.name.includes(nameInput.value)
    );
  }
  //search type
  if (typeInput.value !== "Select Type") {
    findPetArr = findPetArr.filter(
      (findPetArr) => findPetArr.type === typeInput.value
    );
  }
  //search breed
  if (breedInput.value !== "Select Breed") {
    findPetArr = findPetArr.filter(
      (findPetArr) => findPetArr.breed === breedInput.value
    );
  }
  //search vaccinated
  if (vaccinatedInput.checked === true) {
    findPetArr = findPetArr.filter(
      (findPetArr) => findPetArr.vaccinated === true
    );
  }
  //search dewormed
  if (dewormedInput.checked === true) {
    findPetArr = findPetArr.filter(
      (findPetArr) => findPetArr.dewormed === true
    );
  }
  // search sterilized
  if (sterilizedInput.checked === true) {
    findPetArr = findPetArr.filter(
      (findPetArr) => findPetArr.sterilized === true
    );
  }
  //show data after searching
  renderTableData(findPetArr);
});

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th> 
      <td>${pet.name}</td> 
      <td>${pet.age}</td> 
      <td>${pet.type}</td> 
      <td>${pet.weight} kg</td>
      <td>${pet.legnths} cm</td>
      <td>${pet.breed} <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
      </td>
      <td><i class="bi ${
        pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      } " ></i></td>
  <td><i class="bi ${
    pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
  } " ></i></td>
  <td><i class="bi ${
    pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
  } " ></i></td>
  <td>${new Date(pet.date).getDate()}/${
      new Date(pet.date).getMonth() + 1
    }/${new Date(pet.date).getFullYear()}</td>
  `;
    tableBodyEl.appendChild(row);
  });
}
renderBreed();
function renderBreed() {
  breedArr.forEach(function (breedArr) {
    const option = document.createElement("option");
    option.innerHTML = `${breedArr.breed}`;
    breedInput.appendChild(option);
  });
}

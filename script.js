"use strict";

const ownername = document.querySelector("#ownerName");
const vehicleTypeRadios = document.querySelectorAll('input[name="vehicle"]');
const vehicleNumber = document.querySelector("#vehicleNumber");
const submitButton = document.querySelector("button");
const listTable = document.querySelector("table > tbody");
const searchInput = document.querySelector("#search");

// Function to handle delete button click
function handleDeleteClick(newRow) {
  return function () {
    listTable.deleteRow(newRow.rowIndex);
  };
}

// Function to determine the amount based on the selected vehicle type
function getAmount(vehicleType) {
  switch (vehicleType) {
    case "Car":
      return 50;
    case "Bike":
      return 20;
    case "Bus":
      return 80;
    case "Auto":
      return 15;
    default:
      return 0; // Default amount for an unknown vehicle type
  }
}

// Function to filter the rows based on the search input
function filterRows(searchText) {
  const rows = listTable.rows;
  for (let i = 0; i < rows.length; i++) {
    const ownerCell = rows[i].cells[0];
    const vehicleTypeCell = rows[i].cells[1];
    const licensePlateCell = rows[i].cells[2];

    const ownerText = ownerCell.textContent.toLowerCase();
    const vehicleTypeText = vehicleTypeCell.textContent.toLowerCase();
    const licensePlateText = licensePlateCell.textContent.toLowerCase();

    if (
      ownerText.includes(searchText) ||
      vehicleTypeText.includes(searchText) ||
      licensePlateText.includes(searchText)
    ) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

// Add an event listener to the submit button
submitButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the selected vehicle type
  let vehicleTypeValue = "";
  for (const radio of vehicleTypeRadios) {
    if (radio.checked) {
      vehicleTypeValue = radio.value;
      break; // Exit the loop once we find the checked radio button
    }
  }

  // Get the values from the form
  const ownerNameValue = ownername.value;
  const vehicleNumberValue = vehicleNumber.value;
  const phoneValue = document.querySelector("#phone").value;
  const emailValue = document.querySelector("#email").value;
  const identificationValue = document.querySelector("#identification").value;

  // Determine the amount based on the selected vehicle type
  const amount = getAmount(vehicleTypeValue);

  // Create a new row in the list table
  const newRow = listTable.insertRow();

  // Create table cells for the new row
  const cellOwner = newRow.insertCell(0);
  const cellVehicleType = newRow.insertCell(1);
  const cellLicensePlate = newRow.insertCell(2);
  const cellPhone = newRow.insertCell(3);
  const cellEmail = newRow.insertCell(4);
  const cellIdentification = newRow.insertCell(5);
  const cellAmount = newRow.insertCell(6);
  const cellAction = newRow.insertCell(7);

  // Set the content of the cells
  cellOwner.textContent = ownerNameValue;
  cellVehicleType.textContent = vehicleTypeValue;
  cellLicensePlate.textContent = vehicleNumberValue;
  cellPhone.textContent = phoneValue;
  cellEmail.textContent = emailValue;
  cellIdentification.textContent = identificationValue;
  cellAmount.textContent = amount;
  cellAction.innerHTML =
    '<a href="bill.html"><button class="delete-button">Park Out</button></a>';

  // Add a click event listener to delete the row
  cellAction
    .querySelector("button")
    .addEventListener("click", handleDeleteClick(newRow - 1));

  // Clear the form fields after submission
  ownername.value = "";
  vehicleNumber.value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#identification").value = "";

  // Reset the radio buttons
  for (const radio of vehicleTypeRadios) {
    radio.checked = false;
  }
  cellAction.addEventListener("onclick", () => {});
});

// Add an event listener to the search input field
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  filterRows(searchText);
});

// Program name: Medical_Form.js
// Author: Maryann Tran
// Date created: 10/2
// Date last edited: 10/2
// Version: 1.0

// this function outputs user inputted data
function getData() {
  var formContents = document.getElementById("medicalForm");
  var formOutput =
    "<table class='output'><th>Data Name</th><th>Type</th><th>Value</th>";
  var dataType;

  for (var i = 0; i < formContents.length; i++) {
    dataType = formContents.elements[i].type;
    console.log(dataType);
    // switch case for different types of data
    if (formContents.elements[i].name == "email") {
      formOutput += "<tr><td>" + formContents.elements[i].name + "</td>";
      formOutput += "<td>" + dataType + "</td>";
      formOutput +=
        "<td class='outputdata'>" +
        formContents.elements[i].value.toLowerCase() +
        "</td></tr>";
    }
    if (formContents.elements[i].name == "username") {
      formOutput += "<tr><td>" + formContents.elements[i].name + "</td>";
      formOutput += "<td>" + dataType + "</td>";
      formOutput +=
        "<td class='outputdata'>" +
        formContents.elements[i].value.toLowerCase() +
        "</td></tr>";
    }
    switch (dataType) {
      case "checkbox":
        if (formContents.elements[i].checked) {
          formOutput += "<tr><td>" + formContents.elements[i].name + "</td>";
          formOutput += "<td>" + dataType + "</td>";
          formOutput += "<td class='outputdata'>Checked</td></tr>";
        }
        break;
      case "radio":
        if (formContents.elements[i].checked) {
          formOutput += "<tr><td>" + formContents.elements[i].name + "</td>";
          formOutput += "<td>" + dataType + "</td>";
          formOutput +=
            "<td class='outputdata'>" +
            formContents.elements[i].value +
            "</td></tr>";
        }
        break;
      case "select-one":
        if (formContents.elements[i].selectedIndex !== -1) {
          formOutput += "<tr><td>" + formContents.elements[i].name + "</td>";
          formOutput += "<td>" + dataType + "</td>";
          formOutput +=
            "<td class='outputdata'>" +
            formContents.elements[i].options[
              formContents.elements[i].selectedIndex
            ].value +
            "</td></tr>";
        }
        break;
      case "button":
      case "submit":
      case "reset":
        break;
      default:
        formOutput += "<tr><td>" + formContents.elements[i].name + "</td>";
        formOutput += "<td>" + dataType + "</td>";
        formOutput +=
          "<td class='outputdata'>" +
          formContents.elements[i].value +
          "</td></tr>";
    }
  }

  formOutput += "</table>";

  // Set the form output to the div with id 'outputFormData'
  document.getElementById("outputFormData").innerHTML = formOutput;
}

function inputValidator() {
  const checkboxes = document.querySelectorAll(
    'input[name="measles"], input[name="covid"], input[name="smallpox"], input[name="tetanus"], input[name="chickenPox"]'
  );
  let isChecked = false;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  if (!isChecked) {
    alert("Please select at least one illness.");
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const birthdayInput = document.getElementById("birthdate");
  const birthdayErrorMessage = document.getElementById("birthdayErrorMessage");

  // Listen to changes and dynamically display something.
  birthdayInput.addEventListener("input", function () {
    const birthdayValue = birthdayInput.value;

    // Check if there was an input, if not display a message
    if (!birthdayValue) {
      //what textContent does is: all child nodes are removed and replaced by only one new text node.
      birthdayErrorMessage.textContent = "Please select a date of birth.";
      return;
    }

    const userBirthday = new Date(birthdayValue);
    const today = new Date();

    // Calculate 120 years ago from the current date
    const maxAgeRange = new Date();
    maxAgeRange.setFullYear(today.getFullYear() - 120);

    // Check if the birthdate is in the future
    if (userBirthday > today) {
      birthdayErrorMessage.textContent = "Birthdate cannot be in the future.";
    }
    // Check if the birthdate is more than 120 years ago
    else if (userBirthday < maxAgeRange) {
      birthdayErrorMessage.textContent =
        "Birthdate cannot be more than 120 years in the past.";
    } else {
      birthdayErrorMessage.textContent = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const usernameField = document.getElementById("username");
  const passwordField = document.getElementById("password");
  const retypePasswordField = document.getElementById("retypePassword");

  const passwordErrorMessage = document.getElementById("passwordErrorMessage");
  const retypePasswordErrorMessage = document.getElementById(
    "retypePasswordErrorMessage"
  );

  // Function to validate if passwords match and don't contain username
  function validatePassword() {
    if (passwordField.value !== retypePasswordField.value) {
      retypePasswordErrorMessage.textContent = "Passwords do not match!";
    } else {
      retypePasswordErrorMessage.textContent = "";
    }

    if (passwordField.value.includes(usernameField.value)) {
      passwordErrorMessage.textContent =
        "Password should not contain username!";
    } else {
      passwordErrorMessage.textContent = "";
    }
  }
  // this will listen to user input, and call the function validatePassword
  usernameField.addEventListener("input", validatePassword);
  passwordField.addEventListener("input", validatePassword);
  retypePasswordField.addEventListener("input", validatePassword);
});

document.addEventListener("DOMContentLoaded", function () {
  const userHealth = document.getElementById("healthRange");
  const userHealthValueDisplay = document.getElementById("healthValue");

  function updateHealthValue() {
    userHealthValueDisplay.textContent = "I'm feeling: " + userHealth.value;
  }

  userHealth.addEventListener("input", updateHealthValue);
  updateHealthValue();
});

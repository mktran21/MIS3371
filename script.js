// Program name: Medical_Form.js
// Author: Maryann Tran
// Date created: 10/2
// Date last edited: 12/4
// Version: 1.0

//this function checks the entire form and will display submit button if form is valid
function validateForm() {
  // get the first name and if the user checked "Remember Me"
  const firstName = document.getElementById("fname").value;
  const rememberMe = document.getElementById("rememberMe")?.checked || false;
  // if they checked the box, then save cookie with expiry date of 48 hours or 2 days else don't save
  if (rememberMe) {
    setCookie("fname", firstName, 2);
  } else {
    deleteCookie("fname");
  }

  let form = document.forms["medicalForm"];
  let valid = true;
  let errorMessage = "";

  // required field validations
  let fname = form["fname"].value.trim();
  let lname = form["lname"].value.trim();
  let birthdate = form["birthdate"].value.trim();
  let ssn = form["ssn"].value.trim();
  let phoneNumber = form["phoneNumber"].value.trim();
  let email = form["email"].value.trim();
  let address1 = form["address1"].value.trim();
  let city = form["city"].value.trim();
  let zipcode = form["zipcode"].value.trim();
  let username = form["username"].value.trim();
  let password = form["password"].value.trim();
  let retypePassword = form["retypePassword"].value.trim();

  // validate first name
  if (!/^[a-zA-Z](?:[ '.\-a-zA-Z]*[a-zA-Z]){0,29}?$/.test(fname)) {
    errorMessage +=
      "First Name must be 1-30 characters long and contain only letters!\n";
    valid = false;
  }

  // validate last name
  if (!/^[A-Za-z2-5\-_]{1,30}$/.test(lname)) {
    errorMessage +=
      "Last Name must be 1-30 characters long and contain only letters, apostrophes and dashes only!\n";
    valid = false;
  }

  // validate birthdate
  if (!birthdate) {
    errorMessage += "Birthdate is required. \n";
    valid = false;
  } else {
    let birthdateObj = new Date(birthdate);
    let today = new Date();
    if (birthdateObj >= today) {
      errorMessage += "Birthdate must be a past date.\n";
      valid = false;
    }
  }

  //validate snn
  if (
    !/^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$|^(?!(000|666|9))\d{3}(?!00)\d{2}(?!0000)\d{4}$/.test(
      ssn
    )
  ) {
    errorMessage += "Please Provide a valid SSN\n";
    valid = false;
  }
  //validate phone number
  if (!/[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phoneNumber)) {
    errorMessage += "Please provide valid phone number";
    valid = false;
  }
  //validate email
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    errorMessage += "Please provide valid email";
    valid = false;
  }
  //validate address line 1
  if (address1.length < 2 || address1.length > 30) {
    errorMessage += "Please provide address line within 2 to 30 characters";
    valid = false;
  }
  //validate city
  if (city.length < 2 || city.length > 30) {
    errorMessage += "Please provide city within 2 to 30 characters";
    valid = false;
  }
  //validate zipcode
  if (zipcode.length != 5) {
    errorMessage += "Please provide zipcode 5 digits only";
    valid = false;
  }
  //validate username
  if (!/^[a-zA-Z][a-zA-Z0-9_-]{4,18}$/.test(username)) {
    errorMessage += "Please provide valid username";
    valid = false;
  }
  //validate password
  if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#%^&*()-_+=\/><.,`~])[A-Za-z\d!@#%^&*()-_+=\/><.,`~]{8,30}$/.test(
      password
    )
  ) {
    errorMessage +=
      "Please provide password that doesn't contain username, at least 1 upper case, 1 lower case, and 1 digit";
    valid = false;
  }
  //check if password includes username
  if (password.includes(username)) {
    errorMessage += "Password should not include username";
    valid = false;
  }
  //check if retyped password equals password
  if (retypePassword != password) {
    errorMessage += "Please make sure your passwords are matching!";
    valid = false;
  }

  //if everything is correct
  if (valid) {
    // if there's no submit button
    if (!form.querySelector("input[type='submit']")) {
      // creating new submit button
      let submitButton = document.createElement("input");
      submitButton.type = "submit";
      submitButton.value = "Submit";
      submitButton.style.color = "white";
      submitButton.style.backgroundColor = "#1c2f5a";
      form.querySelector(".buttons").appendChild(submitButton);
    }
  } else {
    alert(errorMessage);
  }
}

//validate first name
function validateFname() {
  let fname = document.getElementById("fname").value;
  let error = document.getElementById("fnameError");

  let fnamePattern = /^[a-zA-Z](?:[ '.\-a-zA-Z]{0,28}[a-zA-Z])?$/;

  // check if there's any input and if it matches pattern
  if (fname.length < 1 || fname.length > 30) {
    error.textContent = "First name should be 1 to 30 characters.";
  } else if (!fnamePattern.test(fname.value)) {
    error.textContent =
      "First name must only contain letters, apostrophes, and dashes only!";
  } else {
    error.textContent = "";
  }
}

//validate last name
function validateLname() {
  let lname = document.getElementById("lname").value;
  let error = document.getElementById("lnameError");

  let lnamePattern = /^[A-Za-z2-5\-_]{1,30}$/;

  // check if there's any input and if it matches pattern
  if (lname.length < 1 || lname.length > 30) {
    error.textContent = "Last name should be 1 to 30 characters.";
  } else if (!lnamePattern.test(lname.value)) {
    error.textContent =
      "Last name must only contain letters, apostrophes, and dashes only!";
  } else {
    error.textContent = "";
  }
}

//preformatting ssn
document.getElementById("ssn").addEventListener("input", function (event) {
  let ssnInput = event.target;
  let ssnValue = ssnInput.value.replace(/\D/g, "");
  let formattedSSN = "";

  // Format the SSN as XXX-XX-XXXX
  if (ssnValue.length <= 3) {
    formattedSSN = ssnValue;
  } else if (ssnValue.length <= 5) {
    formattedSSN = `${ssnValue.slice(0, 3)}-${ssnValue.slice(3)}`;
  } else {
    formattedSSN = `${ssnValue.slice(0, 3)}-${ssnValue.slice(
      3,
      5
    )}-${ssnValue.slice(5, 9)}`;
  }

  ssnInput.value = formattedSSN;
});

function validateSSN() {
  let ssn = document.getElementById("ssn").value;
  let error = document.getElementById("ssnError");

  // Check if SSN matches the 9-digit format with dashes
  let ssnPattern =
    /^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$|^(?!(000|666|9))\d{3}(?!00)\d{2}(?!0000)\d{4}$/;

  if (!ssnPattern.test(ssn)) {
    error.textContent = "SSN must be 9 digits in the format XXX-XX-XXXX.";
  } else {
    error.textContent = "";
  }
}

//validate email
function validateEmail() {
  let email = document.getElementById("email");
  email.value = email.value.toLowerCase();
  let error = document.getElementById("emailError");

  let emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

  // check if there's any input and if it matches pattern
  if (!email.value) {
    error.textContent = "Email is required.";
  } else if (!emailPattern.test(email.value)) {
    error.textContent = "Must be a valid email";
  } else {
    error.textContent = "";
  }
}

//preformat phone and validate phone #

document
  .getElementById("phoneNumber")
  .addEventListener("input", function (event) {
    let phoneInput = event.target;
    let phoneValue = phoneInput.value.replace(/\D/g, ""); // Remove all non-digit characters
    let formattedPhone = "";

    // Format phone number as (XXX) XXX-XXXX
    if (phoneValue.length <= 3) {
      formattedPhone = phoneValue;
    } else if (phoneValue.length <= 6) {
      formattedPhone = `${phoneValue.slice(0, 3)}-${phoneValue.slice(3)}`;
    } else {
      formattedPhone = `${phoneValue.slice(0, 3)}-${phoneValue.slice(
        3,
        6
      )}-${phoneValue.slice(6, 10)}`;
    }

    phoneInput.value = formattedPhone;
  });

function validatePhone() {
  let phone = document.getElementById("phoneNumber").value;
  let error = document.getElementById("phoneError");

  let phonePattern = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

  if (!phonePattern.test(phone)) {
    error.textContent =
      "Phone number must be in the format XXX-XXX-XXXX and contain exactly 10 digits.";
  } else {
    error.textContent = ""; // Clear the error if phone number is valid
  }
}

//validate address line 1
function validateAddressLine1() {
  let address1 = document.getElementById("address1").value;
  let error = document.getElementById("addressError");

  if (address1.length < 2 || address1.length > 30) {
    error.textContent = "Address must be between 2 and 30 characters";
  } else {
    error.textContent = "";
  }
}

//validate city
function validateCity() {
  let city = document.getElementById("city").value;
  let error = document.getElementById("cityError");

  if (city.length < 2 || city.length > 30) {
    error.textContent = "City must be between 2 and 30 characters";
  } else {
    error.textContent = "";
  }
}

//validate zipcode
function validateZipcode() {
  let zipcode = document.getElementById("zipcode").value;
  let error = document.getElementById("cityError");

  if (zipcode.length != 5) {
    error.textContent = "Zipcode must be 5 digits only";
  } else {
    error.textContent = "";
  }
}

//validate username
function validateUsername() {
  let username = document.getElementById("username").value;
  let error = document.getElementById("usernameErrorMessage");
  let usernamePattern = /^([a-zA-Z]+)([0-9_-]*){3,15}$/;
  if (username.length < 5 || username.length > 20) {
    error.textContent =
      "User ID must be at least 5 characters but no more than 20 characters.";
  } else if (!usernamePattern.test(username)) {
    error.textContent =
      "User can't have spaces or any special characters in it, just letters, numbers, the dash and underscore";
  } else {
    error.textContent = "";
  }
}
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
        if (formContents.elements[i].name == "email") {
          formOutput += "<tr><td>" + formContents.elements[i].name + "</td>";
          formOutput += "<td>" + dataType + "</td>";
          formOutput +=
            "<td class='outputdata'>" +
            formContents.elements[i].value.toLowerCase() +
            "</td></tr>";
        } else if (formContents.elements[i].name == "username") {
          formOutput += "<tr><td>" + formContents.elements[i].name + "</td>";
          formOutput += "<td>" + dataType + "</td>";
          formOutput +=
            "<td class='outputdata'>" +
            formContents.elements[i].value.toLowerCase() +
            "</td></tr>";
        } else {
          formOutput += "<tr><td>" + formContents.elements[i].name + "</td>";
          formOutput += "<td>" + dataType + "</td>";
          formOutput +=
            "<td class='outputdata'>" +
            formContents.elements[i].value +
            "</td></tr>";
        }
    }
  }

  formOutput += "</table>";

  // Set the form output to the div with id 'outputFormData'
  document.getElementById("outputFormData").innerHTML = formOutput;
}

function inputValidator() {
  const checkboxes = document.querySelectorAll(
    'input[name="measles"], input[name="covid"], input[name="smallpox"], input[name="tetanus"], input[name="chickenPox"], input[name="noIllness"]'
  );
  let isChecked = false;
  const firstName = document.getElementById("firstName").value;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  if (!isChecked) {
    alert("Please select at least one illness.");
    return false;
  }

  var selectedState = document.getElementById("selectState").value;

  // Check if the user has selected the placeholder option
  if (selectedState === "XX") {
    alert("Please select a valid state.");
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
  const passwordFieldPattern =
    "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#%^&*()-_=+/><.,`~])[A-Za-zd!@#%^&*()-_=+/><.,`~]{8,30}$";
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

    if (passwordField.value.length < 8) {
      passwordErrorMessage.textContent =
        "Password should be at least 8 characters long";
    } else if (!passwordFieldPattern.test(passwordField)) {
      passwordErrorMessage.textContent =
        "Password sohould contain at least 1 upper case, 1 lower case and 1 digit";
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

// set the cookie expire time = 48 hours or 2 days
function setCookie(name, value, days) {
  const expiry = new Date();
  expiry.setTime(expiry.getTime() + days * 24 * 60 * 60 * 1000); // Calculate expiry in milliseconds
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${expiry.toUTCString()};path=/`;
}

// Delete a cookie
function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// Display dynamic welcome message and dynamic checkbox
function displayWelcomeMessage() {
  const firstName = getCookie("fname");
  const header = document.getElementById("headerMessage");
  const checkboxContainer = document.getElementById("dynamicCheckbox");

  if (firstName) {
    header.innerHTML = `<h2>Welcome back, ${firstName}!</h2>`;
    checkboxContainer.innerHTML = `
        <label>
          <input type="checkbox" id="newUserCheckbox" onclick="resetAsNewUser()">
          Not ${firstName}? Click HERE to start as a NEW USER.
        </label>
      `;
  } else {
    header.innerHTML = "<h2>Welcome New User!</h2>";
  }
}

// Handle resetting the user
function resetAsNewUser() {
  deleteCookie("fname");
  document.getElementById("medicalForm").reset();
  location.reload();
}

// Function to get a cookie value
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=").map((s) => s.trim());
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

// Initialize on page load
window.onload = displayWelcomeMessage;

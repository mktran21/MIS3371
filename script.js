// Program name: Medical_Form.js
// Author: Maryann Tran
// Date created: 10/2
// Date last edited: 10/2
// Version: 1.0

// this function outputs user inputted data
function getData() {
  var formContents = document.getElementById("medicalForm");
  var formOutput =
    "<table class='output'><th>Dataname</th><th>Type</th><th>Value</th>";
  var dataType;

  for (var i = 0; i < formContents.length; i++) {
    dataType = formContents.elements[i].type;
    // switch case for different types of data
    switch (dataType) {
      case "checkbox":
        if (formContents.elements[i].checked) {
          formOutput +=
            "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
          formOutput += "<td align='right'>" + dataType + "</td>";
          formOutput += "<td class='outputdata'>Checked</td></tr>";
        }
        break;
      case "radio":
        if (formContents.elements[i].checked) {
          formOutput +=
            "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
          formOutput += "<td align='right'>" + dataType + "</td>";
          formOutput +=
            "<td class='outputdata'>" +
            formContents.elements[i].value +
            "</td></tr>";
        }
        break;
      case "button":
      case "submit":
      case "reset":
        break;
      default:
        formOutput +=
          "<tr><td align='right'>" + formContents.elements[i].name + "</td>";
        formOutput += "<td align='right'>" + dataType + "</td>";
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

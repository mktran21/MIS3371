// Program name: Medical_Form.js
// Author: Maryann Tran
// Date created: 10/2
// Date last edited: 10/2
// Version: 1.0

// this function outputs user inputted data
function getData() {
  var formContents = document.getElementById("medicalForm");
  var formOutput;
  var dataType;

  formOutput =
    "<table class='output'><th>Dataname</th><th>Type</th><th>Value</th>";

  for (var i = 0; i < formContents.length; i++) {
    console.log(
      "item: " +
        i +
        " " +
        formContents.elements[i].name +
        " = " +
        formContents.elements[i].value
    );
  }
}

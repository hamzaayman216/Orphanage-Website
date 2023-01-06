var FawryError=document.getElementById("FawryError");
var CreditError=document.getElementById("CreditError");
var NameErr=document.getElementById("msgFN");
var NIDErr=document.getElementById("msgN");
var CardErr=document.getElementById("msgCC");
var CVVErr=document.getElementById("msg");
var AmountErr=document.getElementById("Amsg");
let myform=document.getElementById("donnform");
let mysubmit=document.querySelector('#donatenow');




// Add event listener for form submit event
myform.addEventListener("submit", function(e) {
    // Check if "bc1" is checked
    if (document.getElementById('bc1').checked) {
      // If all validation checks pass, do nothing
      // Otherwise, prevent the default submit action
      if (validateFName() && validateNID() && validateAmount() && validateCreditCard() && validateCVV) {
      } else {
        e.preventDefault();
      }
    }
    // Check if "bc2" is checked
    if (document.getElementById('bc2').checked) {
      // If all validation checks pass, do nothing
      // Otherwise, prevent the default submit action
      if (validateFName() && validateNID() && validateAmount()) {
      } else {
        e.preventDefault();
      } 
    }
  });
  




  // Function to show or hide form elements depending on whether "bc1" is checked
  function ShowhideCredit() {
    // Perform validation checks
    validateCreditCard();
    validateCVV();
    // If "bc1" is checked, show form elements and check the amount value
    if (document.getElementById('bc1').checked) {
      document.getElementById('VisaSection').style.display = 'block';
      document.getElementById('CVsection').style.display = 'block';
      document.getElementById('ExpDate').style.display = 'block';
      // If amount value is 0, set the innerHTML of an element with the id "AmountErr"
      if (document.getElementById("AmountE").value == 0) {
        AmountErr.innerHTML = "Please enter amount of donation";
      }
    }
  }




// Function to hide form elements when "bc2" is checked
function ShowhidePay() {
  // If "bc2" is checked, hide form elements and check the amount value
  if (document.getElementById('bc2').checked) {
    document.getElementById('VisaSection').style.display = 'none';
    document.getElementById('CVsection').style.display = 'none';
    document.getElementById('ExpDate').style.display = 'none';
    // If amount value is 0, set the innerHTML of an element with the id "AmountErr"
    if (document.getElementById("AmountE").value == 0) {
      AmountErr.innerHTML = "Please enter amount of donation";
    }
  }
}



// Function to validate the value of an input field with the id "FName"
function validateFName() {
  // Get the value of the "FName" input field
  var FName = document.getElementById("FName").value;
  // If the length of the input value is 0
  if (FName.length == 0) {
    // Set the innerHTML of the "NameErr" element to a message about the name being required
    NameErr.innerHTML = "Name is required";
    // Return false
    return false;
  }
  // If the input value is not a number
  if (!isNaN(FName)) {
    // Set the innerHTML of the "NameErr" element to a message about only letters being allowed
    NameErr.innerHTML = "Only letters please.";
    // Return false
    return false;
  }
  // If the input value does not match the regular expression
  if (!FName.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    // Set the innerHTML of the "NameErr" element to a message about writing the full name with no digits
    NameErr.innerHTML = "Write full name with no digits";
    // Return false
    return false;
  }
  // If all checks pass
  // Set the innerHTML of the "NameErr" element to a message about the name being valid
  NameErr.innerHTML = "valid Name";
  // Return true
  return true;
}




// Function to validate the value of an input field with the id "NatID"
function validateNID() {
    // Get the value of the "NatID" input field
    var NatID = document.getElementById("NatID").value;
    // If the length of the input value is 0
    if (NatID.length == 0) {
      // Set the innerHTML of the "NIDErr" element to a message about the National ID being required
      NIDErr.innerHTML = "       National ID required";
      // Return false
      return false;
    }
    // If the input value is not a number
    if (isNaN(NatID)) {
      // Set the innerHTML of the "NIDErr" element to a message about only digits being allowed
      NIDErr.innerHTML = "       Only digits please.";
      // Return false
      return false;
    }
    // If the input value does not have a length of 14 digits
    if (NatID.length !== 14) {
      // Set the innerHTML of the "NIDErr" element to a message about the National ID being 14 digits
      NIDErr.innerHTML = "       National ID should be 14 digits";
      // Return false
      return false;
    }
    // If all checks pass
    // Set the innerHTML of the "NIDErr" element to a message about the National ID being valid
    NIDErr.innerHTML = "valid ID";
    // Return true
    return true;
  }
  


  // Function to validate the value of an input field with the id "CreditC"
  function validateCreditCard() {
    // Get the value of the "CreditC" input field
    var CreditC = document.getElementById("CreditC").value;
    // If the length of the input value is 0
    if (CreditC.length == 0) {
      // Set the innerHTML of the "CardErr" element to a message about the card number being required
      CardErr.innerHTML = "       Card Number required";
      // Return false
      return false;
    }
    // If the input value is not a number
    if (isNaN(CreditC)) {
      // Set the innerHTML of the "CardErr" element to a message about only digits being allowed
      CardErr.innerHTML = "       Only digits please.";
      // Return false
      return false;
    }
    // If the input value does not have a length of 14 digits
    if (CreditC.length !== 14) {
      // Set the innerHTML of the "CardErr" element to a message about the card number being 14 digits
      CardErr.innerHTML = "       Card Number should be 14 digits";
      // Return false
      return false;
    }
    // If all checks pass
    // Set the innerHTML of the "CardErr" element to a message about the card number being valid
    CardErr.innerHTML = "       valid card number";
    // Return true
    return true;
  }



// Function to validate the value of an input field with the id "CVV"
function validateCVV() {
    // Get the value of the "CVV" input field
    var CVV = document.getElementById("CVV").value;
    // If the length of the input value is 0
    if (CVV.length == 0) {
      // Set the innerHTML of the "CVVErr" element to a message about the CVV being required
      CVVErr.innerHTML = "       CVV required";
      // Return false
      return false;
    }
    // If the length of the input value is less than 3 digits
    if (CVV.length < 3) {
      // Set the innerHTML of the "CVVErr" element to a message about the CVV being 3-4 digits
      CVVErr.innerHTML = "        Card Number should be 3-4 digits";
      // Return false
      return false;
    }
    // If the input value is not a number
    if (isNaN(CVV)) {
      // Set the innerHTML of the "CVVErr" element to a message about only digits being allowed
      CVVErr.innerHTML = "       Only digits please.";
      // Return false
      return false;
    }
    // If all checks pass
    // Set the innerHTML of the "CVVErr" element to a message about the CVV being valid
    CVVErr.innerHTML = "valid CVV";
    // Return true
    return true;
  }




// Function to validate the value of an input field with the id "AmountE"
function validateAmount() {
  // Get the value of the "AmountE" input field
  var AmountE = document.getElementById("AmountE").value;
  // If the length of the input value is 0
  if (AmountE.length == 0) {
    // Set the innerHTML of the "AmountErr" element to a message about the amount being required
    AmountErr.innerHTML = "       Amount required";
    // Return false
    return false;
  }
  // If the length of the input value is less than 3 digits
  if (AmountE.length < 3) {
    // Set the innerHTML of the "AmountErr" element to a message about the donation amount being 100 or more
    AmountErr.innerHTML = "       donation amount must be 100 or more :)";
    // Return false
    return false;
  }
  // If the input value is equal to 000
  if (AmountE == 000) {
    // Set the innerHTML of the "AmountErr" element to a message about the amount being invalid
    AmountErr.innerHTML = "       invalid Amount entered";
    // Return false
    return false;
  }
  // If the input value is not a number
  if (isNaN(AmountE)) {
    // Set the innerHTML of the "AmountErr" element to a message about only digits being allowed
    AmountErr.innerHTML = "       Only digits please.";
    // Return false
    return false;
  }
  // If all checks pass
  // Set the innerHTML of the "AmountErr" element to a message about the amount being valid
  AmountErr.innerHTML = "valid Amount entered";
  // Return true
  return true;
}


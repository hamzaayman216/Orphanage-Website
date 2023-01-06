let first=document.getElementById("first");
let last=document.getElementById("last");
let submit=document.getElementById("submitButton");
let password=document.getElementById("passwordInput");
let confirmPassword=document.getElementById("confirmPasswordInput");
let errorMessage=document.querySelector("h2");
let errorMessage2=document.querySelector("h3");
let errorMessage3=document.querySelector("h4");
let form =document.getElementById("signupform");
let dob=document.getElementById("dob");



// This function listens for a form submission event and checks if the password and confirm password fields match. If they do not match, it prevents the form from being submitted. It also checks if the first and last name fields only contain letters and spaces, and if not, it prevents the form from being submitted.
form.addEventListener("submit", function(e) {
    if (checkConfirmPassword() === 1 && checkNames(first.value, last.value) === 1) {
    // Form can be submitted
    } else {
    // Prevent form from being submitted
    e.preventDefault();
    }
    });
    



    // This function returns 1 if the password and confirm password fields match, and 0 if they do not.
    function checkConfirmPassword() {
    if (password.value !== confirmPassword.value) {
    errorMessage.innerText = "Passwords Don't Match!!!";
    return 0;
    } else {
    errorMessage.innerText = "";
    return 1;
    }
    }
    



    // This function returns 1 if the first and last name fields only contain letters and spaces, and 0 if they do not.
    function checkNames(str1, str2) {
    if (onlyLettersAndSpaces(str1) && onlyLettersAndSpaces(str2)) {
    errorMessage2.innerText = "";
    return 1;
    } else {
    errorMessage2.innerText = "Names Must Contain Letters Only!!!";
    return 0;
    }
    }
    


    
    // This function returns true if the input string only contains letters and spaces, and false if it contains any other characters.
    function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
    }

var selectDate = document.getElementById("selectDate");

for(var i = 0; i < 31; i++) {    
    var el = document.createElement("option");
    el.textContent = i+1;
    el.value = i+1;
    selectDate.appendChild(el);
}

var year = new Date().getFullYear();
var selectYear = document.getElementById("selectYear");

for(var i = 100; i >= 0; i--) {    
    var el = document.createElement("option");
    el.textContent = year-i;
    el.value = year-i;
    selectYear.appendChild(el);
}

function validateForm() {
    registerUser();
    openLoginPopup();  
}

const form = document.querySelector('form');
const nameInput = document.getElementById('phonenumber');

nameInput.addEventListener('input', () => {
if (nameInput.validity.patternMismatch) {
    nameInput.setCustomValidity('Please enter valid Indonesian phone number.');
} else {
    nameInput.setCustomValidity('');
}
});

form.addEventListener('submit', (e) => {
// e.preventDefault();
// Perform form submission or further validation
});

function openLoginPopup() {
    var loginPopup = document.getElementById("loginPopup");    
    var form = document.querySelector(".form");    
    
    document.getElementById("registrationHeader").classList.add("gray-out");
    document.getElementById("footerSection").classList.add("hide-text");  
    document.getElementById("footerSection").classList.add("gray-footer");    

    loginPopup.style.display = "flex";
    form.classList.add("gray-out");

    // Set the width of the login button equal to the register button
    var registerButton = document.getElementById("registerBtn");
    var loginButton = document.querySelector(".footerButton");
    loginButton.style.width = registerButton.offsetWidth + "px";
}

function closeLoginPopup() {
    var loginPopup = document.getElementById("loginPopup");
    var form = document.querySelector(".form");    

    document.getElementById("registrationHeader").classList.remove("gray-out");
    document.getElementById("footerSection").classList.remove("hide-text"); 
    document.getElementById("footerSection").classList.remove("gray-footer"); 

    loginPopup.style.display = "none";
    form.classList.remove("gray-out");   
}

function registerUser() {
    // Get form values
    var phoneNumber = document.getElementById("phonenumber").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var selectDate = document.getElementById("selectDate").value;
    var selectMonth = document.getElementById("selectMonth").selectedIndex;
    var selectYear = document.getElementById("selectYear").value;
    var checkMale = document.getElementById("check-male").value;
    var checkFemale = document.getElementById("check-female").value;
    var birthDate = true
    if (selectDate == "Date" || selectMonth == "Month" || selectYear == "Year"){
        birthDate = false
    }

    var month = "0".concat(selectMonth).slice(0, 2);
    var day = "0".concat(selectDate).slice(0, 2);
    if (birthDate){
        var birth_date = selectYear.concat("-",month,"-",day," 00:00:00")
    }
    
    
    var gender = document.querySelector('input[name = gender]:checked').value;

    // Create user object
    var user = {
      mobile_phone_number: phoneNumber,
      firts_name: firstName,
      last_name: lastName,
      email: email
    };

    if (birthDate){
        user['birth_date'] = birth_date
    }

    if (gender){
        user['gender'] = gender
    }
  
    // Make HTTP POST request to the API endpoint
    fetch("http://127.0.0.1:8000/register-user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify(user),
    })
      .then(function (response) {
        if (response.ok) {
          // Registration successful
          alert("Registration successful!");
          // Reset form
          document.getElementById("registrationForm").reset();
        } else {
          // Registration failed
          alert("Registration failed. Please try again.");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  }
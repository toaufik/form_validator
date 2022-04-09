const form = document.querySelector('#form');
const username = form.querySelector('#username');
const email = form.querySelector('#email');
const password = form.querySelector('#password');
const password2 = form.querySelector('#password2');

// Show Error Message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'input-group error mb-2';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show Success Message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-group success mb-2';
}

// Email RegEx
function checlEmeil(input) {
    const re=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(re.test(input.value.trim())) {
        showSuccess(input, `${getFieldName(input)}`);
    } else {
    showError(input, `${getFieldName(input)} must be valid`)
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim()==='') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  })
}

// Get Field Name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} is must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} is must be maximum ${max} characters`);
    } 
}

// Match Password
function matchPassword(input, input2) {
    if(input.value !== input2.value) {
        showError(input2, `Check Password must match`);
    }
}

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 4, 8);
    checkLength(email, 4, 8);
    checkLength(password, 8, 16);
    checkLength(password2, 8, 16);
    checlEmeil(email);
    matchPassword(password, password2);
})
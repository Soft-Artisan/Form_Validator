// Fetching form and input fields from the DOM based on their IDs
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Display error message and red border for the input field
function showError(input, message) {
  const formControl = input.parentElement; // Getting the parent of the input element
  formControl.className = 'form-control error'; // Setting class to 'error' to change the visual feedback
  const small = formControl.querySelector('small'); // Fetching the small tag within the form control for displaying error message
  small.innerText = message; // Displaying the error message
}

// Display green border for the input field to indicate successful validation
function showSuccess(input) {
  const formControl = input.parentElement; // Getting the parent of the input element
  formControl.className = 'form-control success'; // Setting class to 'success' to change the visual feedback
}

// Validate the format of the email input field
function checkEmail(input) {
  // Regular expression pattern for a typical email address
  const re = /^...[omitted for brevity]...$/;
  if (re.test(input.value.trim())) { // If the email input matches the pattern
    showSuccess(input);
  } else { // If the email input doesn't match the pattern
    showError(input, 'Email is not valid');
  }
}

// Ensure all fields in the provided array have values
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Validate the length of the input field value
function checkLength(input, min, max) {
  if (input.value.length < min) { // If the input value length is less than minimum allowed
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) { // If the input value length is more than maximum allowed
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else { 
    showSuccess(input);
  }
}

// Ensure the two password fields match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) { // If passwords don't match
    showError(input2, 'Passwords do not match');
  }
}

// Get a formatted version of the field name (capitalize the first letter)
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Setting up event listener for form submission
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the form from submitting to allow validation

  checkRequired([username, email, password, password2]); // Check if fields are filled
  checkLength(username, 3, 15); // Check username length constraints
  checkLength(password, 6, 25); // Check password length constraints
  checkEmail(email); // Validate email format
  checkPasswordsMatch(password, password2); // Ensure both passwords match
});

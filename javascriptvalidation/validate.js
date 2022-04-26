const form = document.forms[0];
const email = document.getElementById("mail");
const emailError = document.querySelector(".error");

email.addEventListener("input", function (e) {
	if (email.validity.valid) {
		emailError.textContent = "";
		emailError.className = "error";
	} else {
		showError();
	}
});

form.addEventListener("submit", function (e) {
	e.preventDefault();
	if (!email.validity.valid) {
		showError();
		return;
	} else {
		emailError.textContent = "";
		emailError.className = "error";
	}

	this.submit();
});

function showError() {
	if (email.validity.valueMissing) {
		// If the field is empty,
		// display the following error message.
		emailError.textContent = "You need to enter an e-mail address.";
	} else if (email.validity.typeMismatch) {
		// If the field doesn't contain an email address,
		// display the following error message.
		emailError.textContent = "Entered value needs to be an e-mail address.";
	} else if (email.validity.tooShort) {
		// If the data is too short,
		// display the following error message.
		emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
	}

	// Set the styling appropriately
	emailError.className = "error active";
}

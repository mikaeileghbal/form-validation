const formValidate = (function () {
  let currentTab = 0;
  showTab(currentTab);

  function showTab(tabIndex) {
    const tabs = document.querySelectorAll(".tab");
    console.log(tabIndex);
    tabs[tabIndex].style.display = "block";

    if (tabIndex === 0) {
      document.querySelector("#previous").style.display = "none";
    } else {
      document.querySelector("#previous").style.display = "inline-block";
    }
    if (tabIndex === tabs.length - 1) {
      document.querySelector("#next").textContent = "Submit";
    } else {
      document.querySelector("#next").textContent = "Next";
    }
    setStepsIndicator(tabIndex);
  }

  function previousNext(stepIndex) {
    const tabs = document.querySelectorAll(".tab");

    if (stepIndex === 1 && !validateFormTab()) {
      return;
    }

    tabs[currentTab].style.display = "none";

    currentTab = currentTab + stepIndex;

    if (currentTab >= tabs.length) {
      submitForm();
      return;
    }

    showTab(currentTab);
  }

  function setStepsIndicator(stepIndex) {
    const steps = document.querySelectorAll(".step");

    steps.forEach((step) => {
      step.classList.remove("active");
    });

    steps[stepIndex].classList.add("active");
  }

  function validateFormTab() {
    let valid = true;
    const tab = document.querySelectorAll(".tab")[currentTab];
    const inputs = tab.querySelectorAll("input");

    inputs.forEach((input) => {
      if (!input.validity.valid) {
        valid = false;
        input.nextElementSibling.textContent = getErrorMessage(input);
      }
    });

    if (valid) {
      document.querySelectorAll(".step")[currentTab].classList.add("finish");
    }

    return valid;
  }

  function getErrorMessage(input) {
    const errorMessages = {
      required: "This field is required.",
      email: "You need to fill in a valid email address.",
      password: "Your password must containt at least 8 characters",
      tel: "You must fill in a phone number",
      number: "You must fill in only numbers",
      tooShort: "You need to enter at least",
    };
    console.log("type", input.type);

    if (input.validity.valueMissing) {
      return errorMessages["required"];
    } else if (input.validity.typeMismatch) {
      return errorMessages[input.type];
    } else if (input.validity.patterMismatch) {
      return errorMessages[input.type];
    } else if (input.validity.tooShort) {
      return `${errorMessages["tooShort"]} ${input.minLength} characters`;
    }
  }

  function submitForm() {
    document.querySelector("#multiPageForm").submitForm();
  }

  document.querySelector("#previous").addEventListener("click", (e) => {
    previousNext(-1);
  });

  document.querySelector("#next").addEventListener("click", (e) => {
    previousNext(1);
  });

  document.querySelectorAll("input:not([type='button'])").forEach((input) => {
    input.addEventListener("input", (e) => {
      validateFormTab(e);
    });
  });
})();

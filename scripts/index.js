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
      const errorCode = validator.validate(input, input.type);
      if (errorCode !== -1) {
        valid = false;
        console.log("empty");
        input.classList.add("invalid");
        input.nextElementSibling.textContent = `This field ${errorCode}.`;
      }
    });

    if (valid) {
      document.querySelectorAll(".step")[currentTab].classList.add("finish");
    }

    return valid;
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
      e.target.classList.remove("invalid");
      validateFormTab(e);
    });
  });
})();

const validator = (function () {
  const types = {
    TEXT: "text",
    PASSWORD: "password",
    EMAIL: "email",
    TELL: "tell",
    NUMBER: "number",
  };
  const errorCodes = {
    IS_REQUIRED: "is required",
    IS_TEXT: "must be text",
    IS_PASS: "must be password",
    IS_TELL: "must be numbers",
    IS_NUMBER: "must be number",
    IS_EMAIL: "must be a valid email",
  };
  function validate(input, type) {
    let errorCode = -1;
    if (input.value === "" || input.value === "null") {
      return errorCodes.IS_REQUIRED;
    }

    switch (type) {
      case types.TEXT:
        if (input.value === "") {
          valid = false;
        }
        break;
      case types.EMAIL:
        break;
      case types.PASSWORD:
        break;
    }
    return errorCode;
  }
  return {
    validate,
  };
})();

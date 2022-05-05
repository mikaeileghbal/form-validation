const Validator = (function () {
  const inputTypes = {
    text: {
      patterns: [".+", "[a-zA-Z]"],
      messages: ["is required", "must be text characters only"],
    },
    email: {
      patterns: [".+", "([a-zA-Z]|[0-9])+@([a-zA-Z]|[0-9])+\\.([a-zA-Z]){3}"],
      messages: ["is required", "must be a valid email address"],
    },
    tel: {
      patterns: [".+", "\\+?([0-9]){8}"],
      messages: ["is required", "must be a valid phone number"],
    },
    number: {
      patterns: [".+", "([0-9])"],
      messages: ["is required", "must be a numbers only"],
    },
    password: {
      patterns: [".+", "[A-Z]", "[0-9]", ".{8}"],
      messages: [
        "is required",
        "must have an uppercase letter",
        "must have a number",
        "must be at least 8 characters",
      ],
    },
  };

  function validate(input, type) {
    let errorCode = -1;
    if (input.value === "" || input.value === null) {
      return inputTypes[type].messages[0];
    }
    for (let i = 0; i < inputTypes[type].patterns.length; i++) {
      const pattern = new RegExp(inputTypes[type].patterns[i]);
      if (!pattern.test(input.value)) {
        return inputTypes[type].messages[i];
      }
    }
    return errorCode;
  }

  return {
    validate,
  };
})();

const FormValidate = (function (document) {
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
      const errorCode = Validator.validate(input, input.type);
      if (errorCode !== -1) {
        valid = false;
        input.classList.add("invalid");
        input.nextElementSibling.textContent = `This field ${errorCode}.`;
      } else {
        input.classList.remove("invalid");
      }
    });
    if (valid) {
      document.querySelectorAll(".step")[currentTab].classList.add("finish");
    }
    return valid;
  }

  function submitForm() {
    document.querySelector("#multiPageForm").submit();
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
})(document);

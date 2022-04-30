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
    if (input.value === "") {
      valid = false;
      console.log("empty");
      input.classList.add("invalid");
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
  });
});

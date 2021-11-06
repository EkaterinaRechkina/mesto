enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
});

function enableValidation(options) {
    const popupForms = [...document.querySelectorAll(options.formSelector)];
    popupForms.forEach(function(popupForms) {
        addListenerToForm(options, popupForms);
    });
}

function addListenerToForm(options, popupForms) {
    const popupInputs = [...popupForms.querySelectorAll(options.inputSelector)];
    popupInputs.forEach(function(popupInput) {
        addListenerToInputs(options, popupInput);
    });
    popupForms.addEventListener("input", function(event) {
        heandelFormInput(options, event);
    });
    setSubmitButtonState(options, popupForms);
}

function addListenerToInputs(options, popupInput) {
    popupInput.addEventListener("input", function(event) {
        const elementTarget = event.target;
        handleFieldValidation(options, elementTarget);
    });
}

function handleFieldValidation(options, elementTarget) {
    const errorContainer = document.querySelector(`#${elementTarget.id}-error`);
    if (elementTarget.validity.valid) {
        clearTextError(options, errorContainer, elementTarget);
    } else {
        addTextError(options, errorContainer, elementTarget);
    }
}

function clearTextError(options, errorContainer, elementTarget) {
    errorContainer.textContent = "";
    elementTarget.classList.remove(options.inputErrorClass);
    errorContainer.classList.remove(options.errorClass);
}

function addTextError(options, errorContainer, elementTarget) {
    errorContainer.textContent = elementTarget.validationMessage;
    elementTarget.classList.add(options.inputErrorClass);
    errorContainer.classList.add(options.errorClass);
}

function heandelFormInput(options, event) {
    const popupForm = event.currentTarget;
    setSubmitButtonState(options, popupForm);
}

function setSubmitButtonState(options, popupForm) {
    const button = popupForm.querySelector(options.submitButtonSelector);
    const isValid = popupForm.checkValidity();
    button.disabled = !isValid;
    if (!isValid) {
        button.classList.add(options.inactiveButtonClass);
    } else {
        button.classList.remove(options.inactiveButtonClass);
    }
}
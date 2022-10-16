const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationObj.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationObj.inputErrorClass);
  errorElement.classList.remove(validationObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
  const buttonElement = formElement.querySelector(validationObj.submitButtonSelector)
  toggleButtonState(inputList, buttonElement)
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement)
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObj.inactiveButtonClass)
  } else {
    buttonElement.classList.remove(validationObj.inactiveButtonClass)
  }
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form-set'));

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    }); 
  });
};

const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

enableValidation(validationObj);
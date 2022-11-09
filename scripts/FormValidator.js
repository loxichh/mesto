export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement
    this._buttonElement = this._form.querySelector(settings.submitButtonSelector)
    this._inputList = Array.from(this._form.querySelectorAll(settings.inputSelector))
    this._formList = Array.from(document.querySelectorAll(settings.formSelector))
    this._inputErrorClass = settings.inputErrorClass
    this._errorClass = settings.errorClass
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this.toggleButtonState()
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState()
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled', true)
    }
  }

  enableValidation(settings) {
      this._form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(settings)
  };

}
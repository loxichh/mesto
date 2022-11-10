// Variables
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"

const editButton = document.querySelector('.profile__info-edit-button')
const buttonAdd = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__info-title')
const profileDescription = document.querySelector('.profile__info-subtitle')

const popupList = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('#edit')
const popupAdd = document.querySelector('#add')
const popupFormEdit = document.querySelector('#form-edit')
const popupFormAdd = document.querySelector('#form-add')
const popupView = document.querySelector ('#view')
const buttonCloseEdit = document.querySelector('#edit-close-btn')
const buttonCloseAdd = document.querySelector('#add-close-btn')
const buttonCloseView = document.querySelector('#view-close-btn')
const name = document.querySelector('[name="name"]')
const description = document.querySelector('[name="description"]')
const place = document.querySelector('[name="place"]')
const link = document.querySelector('[name="link"]')

const image = popupView.querySelector('.popup__image')
const subtitle = popupView.querySelector('.popup__subtitle')

const elementsPlace = document.querySelector('.elements')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

//To create a card

const profileVolidation = new FormValidator(validationObj, popupEdit)
profileVolidation.enableValidation()

const addCardVolidation = new FormValidator(validationObj, popupAdd)
addCardVolidation.enableValidation()

function createACard(data) {
    const element = new Card(data, '#element', openAPopupView)
    const elementChild = element.generateACard()
    return elementChild
  }

function addCard(evt) {
  evt.preventDefault()
  const newCard = createACard({
    name: place.value,
    link: link.value})
  addCardToContainer(elementsPlace, newCard)
  closeAPopupAdd()
  place.value = ''
  link.value = ''
  addCardVolidation.blockSubmitButton()
  addCardVolidation.toggleButtonState();
}

function addCardToContainer(place, card) {
  place.prepend(card);
}

initialCards.forEach((card) =>{
  const startACard = createACard(card)
  addCardToContainer(elementsPlace, startACard)
})

popupFormAdd.addEventListener('submit', addCard)

// To open a popup
function openAPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeAPopupESC);
}

function openAPopupEdit() {
  openAPopup(popupEdit)
  name.value = profileName.textContent
  description.value = profileDescription.textContent
}

editButton.addEventListener('click', openAPopupEdit)

function redactProfile(evt) {
  evt.preventDefault()
  profileName.textContent = name.value
  profileDescription.textContent = description.value
  closeAPopupEdit()
}

popupFormEdit.addEventListener('submit', redactProfile)

function openAPopupAdd() {
  openAPopup(popupAdd)
}

buttonAdd.addEventListener('click', openAPopupAdd)

function openAPopupView(name, link) {
  image.src = link
  image.alt = name
  subtitle.textContent = image.alt
  openAPopup(popupView)
}

// To close a popup
function closeAPopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeAPopupESC)
}

function closeAPopupESC (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closeAPopup(openedPopup)
  }
}

function closeAPopupEdit() {
  closeAPopup(popupEdit)
}

buttonCloseEdit.addEventListener('click', closeAPopupEdit)

function closeAPopupAdd() {
  closeAPopup(popupAdd)
}

buttonCloseAdd.addEventListener('click', closeAPopupAdd)

function closeAPopupView() {
  closeAPopup(popupView)
}

buttonCloseView.addEventListener('click', closeAPopupView)

popupList.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAPopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closeAPopup(popup)
    } 
  })
})
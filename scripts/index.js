// Variables
let profile = document.querySelector('.profile')
let profileWrapper = profile.querySelector('.profile__wrapper')
let profileInfo = profileWrapper.querySelector('.profile__info')
let editButton = profileInfo.querySelector('.profile__info-edit-button')
let profileName = profileInfo.querySelector('.profile__info-title')
let profileDescription = profileInfo.querySelector('.profile__info-subtitle')

let popup = document.querySelector('.popup')
let popupOverlay = popup.querySelector('.popup__overlay')
let closeButton = popupOverlay.querySelector('.popup__close-button')
let popupForm = popupOverlay.querySelector('.popup__form')
let saveButton = popupForm.querySelector('.popup__save-button')
let name = popupForm.querySelector('[name="name"]')
let description = popupForm.querySelector('[name="description"]')

// To open a popup
function openPopup() {
  popup.classList.add('popup_opened')



  let data = {
    name: profileName.innerHTML,
    description: profileDescription.innerHTML
  }

  name.value = data['name']
  description.value = data['description']
}

editButton.addEventListener('click', openPopup)

// To close a popup
function closePopup() {
  popup.classList.remove('popup_opened')
}

closeButton.addEventListener('click', closePopup)

// To save information
popupForm.addEventListener('submit', formSubmit)

// To submit form
function formSubmit (evt) {
  evt.preventDefault()

  let data = {
    name: name.value,
    description: description.value
  }

  profileName.textContent = data['name']
  profileDescription.textContent = data['description']
  closePopup()
}











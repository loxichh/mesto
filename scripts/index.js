// Variables
const profile = document.querySelector('.profile')
const profileWrapper = document.querySelector('.profile__wrapper')
const profileInfo = document.querySelector('.profile__info')
const editButton = document.querySelector('.profile__info-edit-button')
const addButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__info-title')
const profileDescription = document.querySelector('.profile__info-subtitle')

const popup = document.querySelector('.popup')
const popupEdit = document.querySelector('#edit')
const popupAdd = document.querySelector('#add')
const popupView = document.querySelector ('#view')
const editCloseButton = document.querySelector('#edit-close-btn')
const addCloseButton = document.querySelector('#add-close-btn')
const viewCloseButton = document.querySelector('#view-close-btn')
const closeButton = document.querySelector('.popup__close-button')
const saveButton = document.querySelector('.popup__save-button')
const name = document.querySelector('[name="name"]')
const description = document.querySelector('[name="description"]')
const place = document.querySelector('[name="place"]')
const link = document.querySelector('[name="link"]')

const deleteButton = document.querySelector('.element__trash')
const cardImage = document.querySelector('.element__image')
const cardTitle = document.querySelector('.element__title')

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

let elementTemplate = document.querySelector('#element').content
const elementsPlace = document.querySelector('.elements')

function newCard(card) {
  let elementChild = elementTemplate.querySelector('.element').cloneNode(true)
  elementChild.querySelector('.element__title').textContent = card.name
  elementChild.querySelector('.element__image').src = card.link
  elementChild.querySelector('.element__image').alt = card.name
  assignListeners(elementChild)
  elementsPlace.prepend(elementChild)
}



// To open a popup
function selectedPopup(popup) {
  popup.classList.toggle('popup_opened')
}

function openAPopupEdit() {
  selectedPopup(popupEdit)
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
popupEdit.addEventListener('submit', redactProfile)


function openAPopupAdd() {
  selectedPopup(popupAdd)
}
addButton.addEventListener('click', openAPopupAdd)

function openAPopupView(evt) {
  selectedPopup(popupView)
  let image = popupView.querySelector('.popup__image')
  let subtitle = popupView.querySelector('.popup__subtitle')
  let popupImage = evt.target
  image.src = popupImage.src
  image.alt = popupImage.alt
  subtitle.textContent = image.alt
}

// To close a popup
function closeAPopupEdit() {
  selectedPopup(popupEdit)
}
editCloseButton.addEventListener('click', closeAPopupEdit)

function closeAPopupAdd() {
  selectedPopup(popupAdd)
}
addCloseButton.addEventListener('click', closeAPopupAdd)

function closeAPopupView() {
  selectedPopup(popupView)
}
viewCloseButton.addEventListener('click', closeAPopupView)

//To create a card
function startImages() {
  initialCards.reverse().forEach(newCard)
}

startImages()

function addCard(evt) {
  evt.preventDefault()
  newCard({
    name: place.value,
    link: link.value})
  
  closeAPopupAdd()
}
popupAdd.addEventListener('submit', addCard)

// To delete a card
function deleteACard(evt) {
  evt.target.closest('.element').remove()
}

// To estimate a card
function estimateACard(evt) {
  evt.target.classList.toggle('element__like_active') 
}

//Assign listeners to new cards
function assignListeners(item) {
  item.querySelector('.element__like').addEventListener('click', estimateACard)
  item.querySelector('.element__trash').addEventListener('click', deleteACard)
  item.querySelector('.element__image').addEventListener('click', openAPopupView)
}


















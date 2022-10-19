// Variables
const profile = document.querySelector('.profile')
const profileWrapper = document.querySelector('.profile__wrapper')
const profileInfo = document.querySelector('.profile__info')
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

const cardTitle = document.querySelector('.element__title')
const image = popupView.querySelector('.popup__image')
const subtitle = popupView.querySelector('.popup__subtitle')

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

const elementTemplate = document.querySelector('#element').content
const elementsPlace = document.querySelector('.elements')

function createACard(card) {
  const elementChild = elementTemplate.querySelector('.element').cloneNode(true)
  const imageElement = elementChild.querySelector('.element__image')
  elementChild.querySelector('.element__title').textContent = card.name
  imageElement.src = card.link
  imageElement.alt = card.name
  assignListeners(elementChild)
  return elementChild
}

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

function openAPopupView(evt) {
  openAPopup(popupView)
  const popupImage = evt.target
  image.src = popupImage.src
  image.alt = popupImage.alt
  subtitle.textContent = image.alt
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

//To create a card
function addCardToContainer(place, card) {
  place.prepend(card);
}

function startImages() {
  initialCards.forEach((card) =>{
    const startACard = createACard(card)
    addCardToContainer(elementsPlace, startACard)
  }
)}

startImages()

function addCard(evt) {
  evt.preventDefault()
  const newCard = createACard({
    name: place.value,
    link: link.value})
  addCardToContainer(elementsPlace, newCard)
  closeAPopupAdd()
  place.value = ''
  link.value = ''
}

popupFormAdd.addEventListener('submit', addCard)

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
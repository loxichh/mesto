
export default class Card {
  constructor(data, template, openAPopupView) {
    this._template = template
    this._link = data.link
    this._name = data.name
    this._alt = data.alt
    this._openAPopupView = openAPopupView
    this._element = this._getTemplate()
    this._likeButton = this._element.querySelector('.element__like')
    this._trashButton = this._element.querySelector('.element__trash')
    this._image = this._element.querySelector('.element__image')
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._template)  
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  _estimateACard() {
    this._likeButton.classList.toggle('element__like_active')
  }

  _deleteACard() {
    this._element.remove()
  }

  _assignListeners() {
    this._likeButton.addEventListener('click', () => this._estimateACard())
    this._trashButton.addEventListener('click', () => this._deleteACard())
    this._image.addEventListener('click', () => this._openAPopupView(this._name, this._link))
  }
  
  generateACard() {
    this._element.querySelector('.element__title').textContent = this._name
    this._image.src = this._link
    this._image.alt = this._name
    this._assignListeners()
    return this._element
  }
}
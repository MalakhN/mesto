export default class Card {
  constructor(
    item,
    templateSelector,
    popupImage,
    popupImagePreview,
    popupImagePreviewText,
    openPopup
  ) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._popupImage = popupImage;
    this._popupImagePreview = popupImagePreview;
    this._popupImagePreviewText = popupImagePreviewText;
    this._openPopup = openPopup;
  }

  // Приватный метод для получения копии шаблона карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  // Приватный метод для наполнения карточки данными
  _setData() {
    const imageElement = this._newCard.querySelector(".element__image");
    imageElement.src = this._link;
    const titleElement = this._newCard.querySelector(".element__text");
    titleElement.textContent = this._name;
  }

  // Приватный метод лайка карточки
  _handleLikeCard() {
    this._newCard
      .querySelector(".element__icon")
      .classList.toggle("element__icon_active");
  }

  // Приватный метод удаления карточки
  _handleRemoveCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  // Приватный метод для открытия попапа
  _handleOpenPopupView() {
    this._popupImagePreview.src = this._link;
    this._popupImagePreviewText.textContent = this._name;
    this._popupImagePreview.alt = this._name;
    this._openPopup(this._popupImage);
  }

  // Приватный метод для всех слушателей карточки
  _setEventListeners() {
    this._newCard
      .querySelector(".element__text")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });
    this._newCard
      .querySelector(".element__delete-icon")
      .addEventListener("click", () => {
        this._handleRemoveCard();
      });
    this._newCard
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenPopupView();
      });
  }

  // Публичный метод, который возвращает наполненный данными элемент карточки
  generateCard() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._newCard;
  }
}

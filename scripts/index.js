// Импорт
import { FormValidator as FormValidator } from "./FormValidator.js";
import { settingsData } from "./FormValidator.js";
import Card from "./Card.js";

// Переменные
const editForm = document.querySelector("#edit-form");
const addCardForm = document.querySelector("#cards-form");
const cards = document.querySelector(".elements");
const addCardPopup = document.querySelector("#add-card");
const addButton = document.querySelector(".profile__add-button");
const cardNameInput = document.querySelector("#card-name");
const cardLinkInput = document.querySelector("#card-link");
const editProfilePopup = document.querySelector("#edit-profile");
const editButton = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const closeButtons = document.querySelectorAll(".popup__close-button");
const cardsSubmitButton = document.querySelector("#cards-submit-button");
const popupImage = document.querySelector("#popup-image");
const popupImagePreview = popupImage.querySelector(".popup__image-image");
const popupImagePreviewText = popupImage.querySelector(".popup__image-text");

// Создание экземпляра валидатора для каждой из форм
const editFormValidator = new FormValidator(settingsData, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(settingsData, addCardForm);
addFormValidator.enableValidation();

// Массив карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция открытия попапов
function openPopup(popupItem) {
  popupItem.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popupItem.addEventListener("click", closePopupOverlay);
}

// Функция закрытия попапов
function closePopup(popupItem) {
  popupItem.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popupItem.removeEventListener("click", closePopupOverlay);
}

// Функция закрытия попапов при нажатии Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// Функция закрытия попапов при клике на оверлей
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Функция отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

// Cоздание экземпляра карточки
const createCard = (
  item,
  templateSelector,
  popupImage,
  popupImagePreview,
  popupImagePreviewText,
  openPopup
) => {
  const card = new Card(
    item,
    templateSelector,
    popupImage,
    popupImagePreview,
    popupImagePreviewText,
    openPopup
  );
  const cardElement = card.generateCard();
  cards.prepend(cardElement);
};

// Перебор массива с карточками
initialCards.forEach((item) => {
  createCard(
    item,
    "#cards-template",
    popupImage,
    popupImagePreview,
    popupImagePreviewText,
    openPopup
  );
});

// Функция отправки формы добавления карточек
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  createCard(
    { name: cardNameInput.value, link: cardLinkInput.value },
    "#cards-template",
    popupImage,
    popupImagePreview,
    popupImagePreviewText,
    openPopup
  );
  addCardForm.reset();
  cardsSubmitButton.classList.add(settingsData.inactiveButtonClass);
  cardsSubmitButton.setAttribute("disabled", "true");
  closePopup(addCardPopup);
}

// Открываем попап редактирования профиля
editButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

// Слушаем отправку формы редактирования профиля
editForm.addEventListener("submit", handleProfileFormSubmit);

// Открываем попап добавления карточек
addButton.addEventListener("click", function () {
  openPopup(addCardPopup);
});

// Слушаем отправку формы добавления карточек
addCardForm.addEventListener("submit", handleCardFormSubmit);

// Закрываем попапы при нажатии на крестик
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

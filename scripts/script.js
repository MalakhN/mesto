// Массив карточек
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

const cardsTemplate = document.querySelector('#cards-template').content;
const popupImage = document.querySelector('#popup-image');
const cards = document.querySelector('.elements');
const addCardPopup = document.querySelector('#add-card');
const addButton = document.querySelector('.profile__add-button');
const addCardForm = document.querySelector('#cards-form');
const cardNameInput = document.querySelector('#card-name');
const cardLinkInput = document.querySelector('#card-link');
const editProfilePopup = document.querySelector('#edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('#edit-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupImagePreview = document.querySelector('.popup__image-image');
const popupImagePreviewText = document.querySelector('.popup__image-text');

// Функция открытия попапов
function openPopup (popupItem) {
  popupItem.classList.add('popup_opened');
}

// Функция закрытия попапов
function closePopup(popupItem) {
  popupItem.classList.remove('popup_opened');
}

// Функция отправки формы редактирования профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
};

// Создаем шаблон карточек
function createCard(element) {
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardsElement.querySelector('.element__image');
  elementImage.src = element.link;
  elementImage.alt = element.name;
  cardsElement.querySelector('.element__title').textContent = element.name;
  cardsElement.querySelector('.element__icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__icon_active');
  });
  cardsElement.querySelector('.element__delete-icon').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  elementImage.addEventListener('click', function () {
    popupImage.classList.add('popup_opened');
    popupImagePreview.src = element.link;
    popupImagePreview.alt = element.name;
    popupImagePreviewText.textContent = element.name;
  });
  return cardsElement;
}

// Добавляем шаблон в вёрстку
const prependCard = function (element) {
  const cardsElement = createCard(element)
  cards.prepend(cardsElement);
}

// Функция добавления элементов из массива в текущий шаблон
const renderCards = () => initialCards.reverse().map(prependCard);

// Вызываем функцию публикации карточек
renderCards();

// Функция отправки формы добавления карточек
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const newPlace = {};
  const namePlace = cardNameInput.value;
  const linkPlace = cardLinkInput.value;
  newPlace.name = namePlace;
  newPlace.link = linkPlace;
  prependCard(newPlace);
  closePopup(addCardPopup);
  addCardForm.reset();
};

// Открываем попап редактирования профиля
editButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

// Слушаем отправку формы редактирования профиля
editForm.addEventListener('submit', handleProfileFormSubmit);

// Открываем попап добавления карточек
addButton.addEventListener('click', () => openPopup(addCardPopup));

// Слушаем отправку формы добавления карточек
addCardForm.addEventListener('submit', handleCardFormSubmit);

// Закрываем попапы
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

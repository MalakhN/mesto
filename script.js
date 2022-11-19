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
const cards = document.querySelector('.elements');
const popup = document.querySelectorAll('.popup');
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

// Функция открытия попапа добавления карточек
function openAddCardPopup () {
  addCardPopup.classList.add('popup_opened');
}

// Функция открытия попапа редактирования профиля
function openEditPopup () {
  editProfilePopup.classList.add('popup_opened');
}

// Функция закрытия попапов
function closePopup(popupItem) {
  popupItem.classList.remove('popup_opened');
}

// Функция отправки формы редактирования профиля
function editFormSubmit (evt) {
  evt.preventDefault();
  nameInput.getAttribute('value');
  jobInput.getAttribute('value');
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editProfilePopup);
  editForm.reset();
};

// Создаем шаблон карточек
const templateCard = function (element) {
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode(true);
  const popupImage = document.querySelector('#popup-image');
  cardsElement.querySelector('.element__image').src = element.link;
  cardsElement.querySelector('.element__title').textContent = element.name;
  cardsElement.querySelector('.element__icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__icon_active');
  });
  cardsElement.querySelector('.element__delete-icon').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  cardsElement.querySelector('.element__image').addEventListener('click', function () {
    popupImage.classList.add('popup_opened');
    document.querySelector('.popup__image-image').src = element.link;
    document.querySelector('.popup__image-text').textContent = element.name;
  });
  cards.prepend(cardsElement);
}

// Добавляем элементы из массива в текущий шаблон
const renderCards = () => initialCards.reverse().map((item) => templateCard(item));

// Вызываем функцию публикации
renderCards();

// Функция отправки формы добавления карточек
function addCardFormSubmit (evt) {
  evt.preventDefault();
  const newPlace = {};
  const namePlace = cardNameInput.value;
  const linkPlace = cardLinkInput.value;
  newPlace.name = namePlace;
  newPlace.link = linkPlace;
  initialCards.push(newPlace);
  templateCard(newPlace);
  addCardPopup.classList.remove('popup_opened');
  addCardForm.reset();
};

// Открываем попап редактирования профиля
editButton.addEventListener('click', openEditPopup);

// Слушаем отправку формы редактирования профиля
editForm.addEventListener('submit', editFormSubmit);

// Открываем попап добавления карточек
addButton.addEventListener('click', openAddCardPopup);

// Слушаем отправку формы добавления карточек
addCardForm.addEventListener('submit', addCardFormSubmit);

// Закрываем попапы
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});



/*

*/

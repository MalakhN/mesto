let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#description');
let closeButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let noLike = document.querySelector('.element__icon-image');
let Like = document.querySelector('.element__icon-image_like');

// Функция переключения попапа
function togglePopup () {
  popup.classList.toggle('popup_opened');
  formElement.reset();
}

// Функция отправки
function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    togglePopup();
};

// Слушаем отправку формы
formElement.addEventListener('submit', formSubmitHandler);

// Открываем попап
editButton.addEventListener('click', togglePopup);

// Закрываем попап
closeButton.addEventListener('click', togglePopup);





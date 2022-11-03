let popup = document.querySelector('.popup');
let editButton = document.querySelector('.edit-button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#description');
let closeButton = document.querySelector('.close-button');

// Функция переключения попапа
function togglePopup () {
  popup.classList.toggle('popup_opened');
}

// Функция отправки
function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    let profileName = document.querySelector('.profile__name');
    let profileDescription = document.querySelector('.profile__description');
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





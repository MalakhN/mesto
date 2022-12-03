// Функция валидации форм
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция показа сообщения об ошибке заполнения формы
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Функция скрытия сообщения об ошибке заполнения формы
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Функция обработчиков всех полей формы и кнопок сохранения
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__item'));
  const buttonElement = formElement.querySelector('.form__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

// Функция, которая находит все формы на странице и добавляет им обработчики
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
 formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListeners(formElement);
});
};

// Вызываем функцию поиска всех форм на странице
enableValidation();

// Функция, которая находит есть ли в форме хотя бы одно невалидное поле
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

// Функция, которая отвечает за блокировку кнопок "Отправить"
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('form__save-button_inactive');
  buttonElement.setAttribute('disabled', true);
} else {
  buttonElement.classList.remove('form__save-button_inactive');
  buttonElement.removeAttribute('disabled');
}
}

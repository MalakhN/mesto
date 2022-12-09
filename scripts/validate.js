// Нужные для валидации классы и селекторы элементов
const settingsData = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
};

// Функция валидации форм
let checkInputValidity = (formElement, inputElement, settingsData) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsData);
  } else {
    hideInputError(formElement, inputElement, settingsData);
  }
};

// Функция показа сообщения об ошибке заполнения формы
const showInputError = (formElement, inputElement, errorMessage, settingsData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsData.errorClass);
};

// Функция скрытия сообщения об ошибке заполнения формы
const hideInputError = (formElement, inputElement, settingsData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsData.inputErrorClass);
  errorElement.classList.remove(settingsData.errorClass);
  errorElement.textContent = '';
};

// Функция обработчиков всех полей формы и кнопок сохранения
const setEventListeners = (formElement, settingsData) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsData.inputSelector));
  const buttonElement = formElement.querySelector(settingsData.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settingsData);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, settingsData);
      checkInputValidity(formElement, inputElement, settingsData);
    });
  });
};

// Функция, которая находит есть ли в форме хотя бы одно невалидное поле
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

// Функция, которая отвечает за блокировку кнопок "Отправить"
const toggleButtonState = (inputList, buttonElement, settingsData) => {
  if (hasInvalidInput(inputList, settingsData)) {
  disableButton(buttonElement, settingsData);
} else {
  buttonElement.classList.remove(settingsData.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}
}

// Функция блокировки кнопок "Отправить"
const disableButton = (buttonElement, settingsData) => {
  buttonElement.classList.add(settingsData.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

// Функция, которая находит все формы на странице и добавляет им обработчики
const enableValidation = (settingsData) => {
  const formList = Array.from(document.querySelectorAll(settingsData.formSelector));
 formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListeners(formElement, settingsData);
});
};

// Вызываем функцию поиска всех форм на странице
enableValidation(settingsData);

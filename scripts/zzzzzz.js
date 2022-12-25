const handleSubmitAddForm = (evt) => {
  //функция-обработчик формы add
  evt.preventDefault();

  createCard(
    { name: titleInput.value, link: linkInput.value },
    "#element-template",
    popupPhoto,
    photoElemOpen,
    titleElemOpen,
    openPopup
  );

  formPopupAdd.reset();

  const submitterBtn = evt.submitter;
  submitterBtn.classList.add(validationConf.inactiveButtonClass);
  submitterBtn.setAttribute("disabled", "true");

  closePopup(popupAdd);
};

//переменные попапФото для конструктора класса
const popupImage = document.querySelector("#popup-image");
const popupImagePreview = popupPhoto.querySelector(".popup__image-image");
const popupImagePreviewText = popupPhoto.querySelector(".popup__image-text");

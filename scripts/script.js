"use strict";

//userPopup
const popup = [...document.querySelectorAll(".popup")];
const profilePopupEdit = document.querySelector(".profile__button-edit");
const popupProfile = document.querySelector("#profile");
const popupCloseBtns = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__job");
const formElementProfile = document.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__input_edit_name");
const jobInput = document.querySelector(".popup__input_edit_job");
//cardPopup
const popupCard = document.querySelector("#card");
const cardAdd = document.querySelector(".profile__button-add");
const popupPreview = document.querySelector("#popup_preview");
const cards = document.querySelector(".cards");
const addCardNameInput = document.querySelector(".popup__input_card-name");
const addCardLinkInput = document.querySelector(".popup__input_card-img");
const cardAddForm = document.querySelector(".popup__form_add-card");
const previewDescription = document.querySelector(".popup__description");
const previewImage = document.querySelector(".popup__image");
const initialCards = [{
        title: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        title: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        title: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        title: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        title: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        title: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

//popup

function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
    document.addEventListener("keyup", handleEscUp);
    popup.forEach((btn) => {
        btn.addEventListener("click", overlayClose);
    });
}

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfile);
}

function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", handleEscUp);
}

function formSubmitHandlerProfilePopup(evt) {
    evt.preventDefault();
    const nameUser = nameInput.value;
    const aboutUser = jobInput.value;
    profileName.textContent = nameUser;
    profileDescription.textContent = aboutUser;
    closePopup(popupProfile);
}
//закрытие через Esc
const handleEscUp = (event) => {
    event.preventDefault();
    const activePopup = document.querySelector(".popup_opened");
    if (event.key === "Escape") {
        closePopup(activePopup);
    }
};
//Закрытие через оверлей
function overlayClose(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    }
    popup.forEach((btn) => {
        btn.addEventListener("click", overlayClose);
    });
}
//удаление карточки
function deleteCard(evt) {
    evt.stopPropagation();
    const card = evt.target.closest(".card");
    card.remove();
}

//Превью картинки

function previewCard(evt) {
    // const card = evt.target.closest(".card");
    const titleCard = evt.target.alt;
    const imgCard = evt.target.src;
    previewDescription.textContent = titleCard;
    previewImage.alt = titleCard;
    previewImage.src = imgCard;
    openPopup(popupPreview);
}

//добавить карточки на страницу

function createCard(item) {
    const elementTemplate = document.querySelector("#card-template").content;
    const card = elementTemplate.querySelector(".card").cloneNode(true);
    const imgCard = card.querySelector(".card__image");
    card.querySelector(".card__title").textContent = item.title;
    imgCard.src = item.link;
    imgCard.alt = item.title;
    card.querySelector(".card__trash").addEventListener("click", deleteCard);
    card.querySelector(".card__button-like").addEventListener("click", (evt) => {
        evt.stopPropagation();
        evt.target.classList.toggle("card__button-like_active");
    });
    imgCard.addEventListener("click", previewCard);
    return card;
}

//Добавление карточки в разметку
function renderCard(item) {
    const newCard = createCard(item);
    cards.prepend(newCard);
}

//Отчистить инпуты

function clearCard(item) {
    addCardNameInput.value = "";
    addCardLinkInput.value = "";
}

//Загрузка карточек
initialCards.forEach(renderCard);

function addCardFromPopup(evt) {
    evt.preventDefault();
    const cardData = {
        title: addCardNameInput.value,
        link: addCardLinkInput.value,
    };
    renderCard(cardData);
    closePopup(popupCard);
    clearCard(popupCard);
}

cardAdd.addEventListener("click", (evt) => openPopup(popupCard));

profilePopupEdit.addEventListener("click", (evt) =>
    openProfilePopup(popupProfile)
);

//общее закрытие.

popupCloseBtns.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
        const popup = evt.target.closest(".popup");
        closePopup(popup);
    });
});
formElementProfile.addEventListener("submit", formSubmitHandlerProfilePopup);
cardAddForm.addEventListener("submit", addCardFromPopup);
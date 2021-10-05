"use strict";
//userPopup
const profilePopupEdit = document.querySelector(".profile__button-edit");
const popupProfile = document.querySelector("#profile");
const userPopupClose = document.querySelector(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__job");
const formElementProfile = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_edit_name");
const jobInput = document.querySelector(".popup__input_edit_job");
//cardPopup
const popupCard = document.querySelector("#card");
const cardAdd = document.querySelector(".profile__button-add");
const closeCardPopupButton = document.querySelector("#close-card");
const popupPreview = document.querySelector("#popup_preview");
const closePrevievPopup = document.querySelector(".popup__close-button");
const cards = document.querySelector(".cards");
const addCardNameInput = document.querySelector(".popup__input_card-name");
const addCardLinkInput = document.querySelector(".popup__input_card-img");
const cardAddForm = document.querySelector(".popup__form_add-card");
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
}

function openProfilePopup(element) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfile);
}

function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
}

function formSubmitHandlerProfilePopup(evt) {
    evt.preventDefault();
    const nameUser = nameInput.value;
    const aboutUser = jobInput.value;
    profileName.textContent = nameUser;
    profileDescription.textContent = aboutUser;
    closePopup(popupProfile);
}

//удаление карточки
function deleteCard(evt) {
    evt.stopPropagation();
    const card = evt.target.closest(".card");
    card.remove(card);
}

//Превью картинки

function previewCard(evt) {
    // const card = evt.currentTarget;
    const card = evt.target.closest(".card");
    const titleCard = card.querySelector(".card__description").textContent;
    const imgCard = card.querySelector(".card__image").src;
    popupPreview.querySelector(".popup__description").textContent = titleCard;
    popupPreview.querySelector(".popup__image").alt = titleCard;
    popupPreview.querySelector(".popup__image").src = imgCard;
    openPopup(popupPreview);
}

//добавить карточки на страницу

function createCard(item) {
    const elementTemplate = document.querySelector("#card-template").content;
    const card = elementTemplate.querySelector(".card").cloneNode(true);
    const imgCard = card.querySelector(".card__image");
    card.querySelector(".card__title").textContent = item.title;
    card.querySelector(".card__image").src = item.link;
    card.querySelector(".card__image").alt = item.alt;

    card.querySelector(".card__trash").addEventListener("click", deleteCard);
    card.querySelector(".card__button-like").addEventListener("click", (evt) => {
        evt.stopPropagation();
        evt.target.classList.toggle("card__button-like_active");
    });
    imgCard.addEventListener("click", previewCard);
    // cards.prepend(card);
}
//Добавление карточки в разметку
function renderCard(item) {
    const test = createCard(item);
    cards.prepend(test);
}

initialCards.forEach(renderCard);
//Загрузка карточек

function addCardFromPopup(evt) {
    evt.preventDefault();
    const cardData = {
        title: addCardNameInput.value,
        link: addCardLinkInput.value,
    };
    renderCard(cardData);
    closePopup(popupCard);
}
cardAdd.addEventListener("click", (evt) => openPopup(popupCard));
closeCardPopupButton.addEventListener("click", (evt) => closePopup(popupCard));
profilePopupEdit.addEventListener("click", (evt) =>
    openProfilePopup(popupProfile)
);
userPopupClose.addEventListener("click", (evt) => closePopup(popupProfile));
formElementProfile.addEventListener("submit", formSubmitHandlerProfilePopup);
cardAddForm.addEventListener("submit", addCardFromPopup);
closePrevievPopup.addEventListener("click", (evt) => closePopup(popupPreview));
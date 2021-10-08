"use strict";
//userPopup
const profilePopupEdit = document.querySelector(".profile__button-edit");
const popupProfile = document.querySelector("#profile");
const generalPopupClose = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__job");
const formElementProfile = document.querySelector(".popup__form");
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
const popupDescription = document.querySelector(".popup__description");
const popupImage = document.querySelector(".popup__image");
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
    const card = evt.target.closest(".card");
    const titleCard = evt.target.alt;
    const imgCard = evt.target.src;
    popupDescription.textContent = titleCard;
    popupImage.alt = titleCard;
    popupImage.src = imgCard;
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

function clearProfile(item) {
    nameInput.value = "";
    jobInput.value = "";
}

function clearCard(item) {
    addCardNameInput.value = "";
    addCardLinkInput.value = "";
}
profilePopupEdit.addEventListener("click", (evt) => clearProfile(popupProfile));
cardAdd.addEventListener("click", (evt) => clearCard(popupCard));

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
}

cardAdd.addEventListener("click", (evt) => openPopup(popupCard));
// closeCardPopupButton.addEventListener("click", (evt) => closePopup(popupCard));
profilePopupEdit.addEventListener("click", (evt) => openPopup(popupProfile));

//общее закрытие. info на будущее, если нужно найти несколько элементов, например с одним классом, вернется коллекция элементов и для этого используем перебор

[].forEach.call(generalPopupClose, function(el) {
    el.addEventListener("click", (evt) => closePopup(popupCard));
    el.addEventListener("click", (evt) => closePopup(popupProfile));
    el.addEventListener("click", (evt) => closePopup(popupPreview));
});

formElementProfile.addEventListener("submit", formSubmitHandlerProfilePopup);
cardAddForm.addEventListener("submit", addCardFromPopup);
'use strict'
//userPopup
let userPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let userPopupClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_edit_name');
let jobInput = document.querySelector('.popup__input_edit_job');
//cardPopup
const popupCard = document.querySelector('#card');
const cardAdd = document.querySelector('.profile__button-add');
const closeCardPopup = document.querySelector('#close-card');
const cardName = document.querySelector('.popup__input_card-name');
const cardImg = document.querySelector('.popup__input_card-img');
const popupImg = document.querySelector('#popup_img');
const closePrevievPopup = document.querySelector('.popup__close-button');


//popup

function openPopup(popupElement, options) {
  if (options) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
  }
  popupElement.classList.add('popup_opened');
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let NameUser = nameInput.value;
    let AboutUser = jobInput.value;
    profileName.textContent = NameUser;
    profileDescription.textContent = AboutUser;
   closePopup(popup)
}



cardAdd.addEventListener('click', evt => openPopup(popupCard));
closeCardPopup.addEventListener('click', evt => closePopup(popupCard));

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameUser = nameInput.value;
    let aboutUser = jobInput.value;
    profileName.textContent = nameUser;
    profileDescription.textContent = aboutUser;
    closePopup(popup)
}




const initialCards = [
    {
      title: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      title: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      title: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      title: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      title: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      title: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const cards = document.querySelector('.cards');

//удаление карточки
function deleteCard(evt) {
    evt.stopPropagation();
    const card = evt.target.closest('.card');
    cards.removeChild(card)
  }


//Превью картинки

  function previewCard(evt){
    evt.stopPropagation();
    openPopup(popupImg);
    const card = evt.currentTarget;

    const titleCard = card.querySelector('.card__description').textContent;
    const imgCard = card.querySelector('.card__image').src;
    popupImg.querySelector('.popup__description').textContent = titleCard;
    popupImg.querySelector('.popup__image').alt = titleCard;
    popupImg.querySelector('.popup__image').src = imgCard;
  }

   //добавить карточки на страницу

function getCardInfo(card){
    const title = card.querySelector('.card__title').textContent;
    const link = card.querySelector('.card__image').src;
    return {
      title: title, 
      link: link
    }
}
function addCard(item) {
    const elementTemplate = document.querySelector('#card-template').content;
    const card = elementTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = item.title;
    card.querySelector('.card__image').src =item.link;
  
    card.querySelector('.card__trash').addEventListener('click', deleteCard)
    card.querySelector('.card__button-like').addEventListener('click', evt => {
      evt.stopPropagation();
      evt.target.classList.toggle('card__button-like_active')
    })
    card.addEventListener('click', previewCard)
    cards.prepend(card)
  }

  initialCards.forEach(addCard);


  //Загрузка карточек

  
    const addCardNameInput = document.querySelector('.popup__input_card-name');
    const addCardLinkInput = document.querySelector('.popup__input_card-img');
    const cardAddForm = document.querySelector('.popup__form_add-card');

function addCardFromPopup(evt) {
    evt.preventDefault()
    const cardData = {
      title: addCardNameInput.value,
      link: addCardLinkInput.value
    };
    addCard(cardData);  
    closePopup(popupCard);

  }
  
  userPopup.addEventListener('click', evt => openPopup(popup, true)); 
  userPopupClose.addEventListener('click', evt => closePopup(popup));
  formElement.addEventListener('submit', formSubmitHandler);

  formElement.addEventListener('submit', formSubmitHandler);
  cardAddForm.addEventListener('submit', addCardFromPopup)
  closePrevievPopup.addEventListener('click', evt => closePopup(popupImg));
'use strict'
//userPopup
let openPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
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


//popup
function open() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
}
function close() {
    popup.classList.remove('popup_opened'); 
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let NameUser = nameInput.value;
    let AboutUser = jobInput.value;
    profileName.textContent = NameUser;
    profileDescription.textContent = AboutUser;
   close()
}

openPopup.addEventListener('click', open); 
closePopup.addEventListener('click', close);
formElement.addEventListener('submit', formSubmitHandler);

function openCard() {
    popupCard.classList.add('popup_opened');
}
function closeCard() {
    popupCard.classList.remove('popup_opened'); 
}

cardAdd.addEventListener('click', openCard);
closeCardPopup.addEventListener('click', closeCard);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let NameUser = nameInput.value;
    let AboutUser = jobInput.value;
    profileName.textContent = NameUser;
    profileDescription.textContent = AboutUser;
   close()
}
formElement.addEventListener('submit', formSubmitHandler);



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
    const card = evt.target.closest('.card');
    cards.removeChild(card)
  }

  //добавить карточки на страницу

function addCard(item) {
    const elementTemplate = document.querySelector('#card-template').content;
    const card = elementTemplate.querySelector('.card').cloneNode(true);
    
    card.querySelector('.card__title').textContent = item.title;
    card.querySelector('.card__image').src =item.link;

    card.querySelector('.card__trash').addEventListener('click', deleteCard)
    card.querySelector('.card__button-like').addEventListener('click', evt => {
      evt.target.classList.toggle('card__button-like_active')
    })
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
    cards.prepend(addCard(cardData));  
    closeCard();

  }
  
  cardAddForm.addEventListener('submit', addCardFromPopup)

//Превью картинки

  const popupImg = document.querySelector('.popup_img');

  function handlePreviewPicture(title, img) {
    open(popupImg);
    popupImg.querySelector('.popup__description').textContent = title.textContent;
    popupImg.querySelector('.popup__image').alt = img.alt;
    popupImg.querySelector('.popup__image').src = img.src;
  }

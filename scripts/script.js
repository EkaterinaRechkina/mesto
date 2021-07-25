'use strict'
let openPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__job');


function open() {
    popup.classList.add('popup_opened');
}
function close() {
    popup.classList.remove('popup_opened'); 
}
openPopup.addEventListener('click', open); 

closePopup.addEventListener('click', close);

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_edit_name');
let jobInput = document.querySelector('.popup__input_edit_job');

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value
    let NameUser = nameInput.value;
    let AboutUser = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    profileName.textContent = NameUser;
    profileDescription.textContent = AboutUser;
   close()
}

formElement.addEventListener('submit', formSubmitHandler);


let openPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');

openPopup.addEventListener('click', function() {
    popup.classList.add('popup_opened');
}) 

closePopup.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})


let formElement = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__user');
let jobInput = document.querySelector('.popup__job');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__job');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

// ---------------Burger Menu Start--------------------------
const button = document.querySelector(".menu__burger");
const buttonWrap = document.querySelector(".burger__wrapper");
const fonOpac = document.querySelector(".fon__garknes");
const links = document.querySelectorAll(".burger__link");

button.addEventListener("click", (event) => {
  buttonWrap.classList.toggle("burger__active");
  button.classList.toggle("menu__burger-change");

  if (buttonWrap.classList.contains("burger__active")) {
    document.body.classList.add("burger__hidden");
    fonOpac.classList.remove("hidden");
  } else {
    document.body.classList.remove("burger__hidden");
    fonOpac.classList.add("hidden");
  }
});

document.addEventListener("click", (event) => {
  if (!buttonWrap.classList.contains("burger__active")) {
    return;
  }
  if (!event.target.closest(".menu__burger")) {
    buttonWrap.classList.remove("burger__active");
    button.classList.remove("menu__burger-change");
    fonOpac.classList.add("hidden");
    document.body.classList.remove("burger__hidden");
  }
});

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.classList.add("burger__interactive");
  });

  link.addEventListener("mouseleave", () => {
    link.classList.remove("burger__interactive");
  });
});

// ---------------Slider Start-------------------------------

const newCardData = [
  { id: "1", imageURL: "/images/pets-sofia.png", title: "Sophia", button: "Learn more" },
  { id: "2", imageURL: "/images/pets-timmy.png", title: "Timmy", button: "Learn more" },
  { id: "3", imageURL: "/images/pets-charly.png", title: "Charly", button: "Learn more" },
  { id: "4", imageURL: "/images/pets-katrine.png", title: "Katrine", button: "Learn more" },
  { id: "5", imageURL: "/images/pets-jennifer.png", title: "Jennifer", button: "Learn more" },
  { id: "6", imageURL: "/images/pets-woody.png", title: "Woody", button: "Learn more" },
  { id: "7", imageURL: "/images/pets-scarlet.png", title: "Scarlett", button: "Learn more" },
  { id: "8", imageURL: "/images/pets-freddie.png", title: "Freddie", button: "Learn more" },
];

const butLeft = document.querySelector(".button__left");
const butRight = document.querySelector(".button__right");
const SLIDER_LEFT = document.querySelector(".slider__items-left");
const SLIDER_ACTIVE = document.querySelector(".slider__items-active");
const SLIDER_RIGHT = document.querySelector(".slider__items-right");
const slider = document.querySelector(".slider");

// для распределении объектов в массиве в случайном порядке
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// создание активного блока
function createActiveElement() {
  let newArr = shuffleArray([...newCardData]);
  let numberCard=showCountCard();
  for (let i = 0; i < numberCard; i++) {
    let currentElem = newArr[i];
    createElement(SLIDER_ACTIVE, currentElem);
  }
}
createActiveElement();

const moveLeft=()=>{
  let activeArr = showElements();
  console.log(activeArr);
  let numberCard=showCountCard();
  for (let i = 0; i < numberCard; i++) {
    let currentElem = activeArr[i];
    createElement(SLIDER_LEFT, currentElem);
  }
  slider.classList.add("transform__left");
  // делаем кнопки неактивными
  butLeft.removeEventListener('click',moveLeft);
  butRight.removeEventListener('click',moveRight);
}

const moveRight=()=>{
  let activeArr = showElements();
  console.log(activeArr);
  let numberCard=showCountCard();
  for (let i = 0; i < numberCard; i++) {
    let currentElem = activeArr[i];
    createElement(SLIDER_RIGHT, currentElem);
  }
  slider.classList.add("transform__right");
  butLeft.removeEventListener('click',moveLeft);
  butRight.removeEventListener('click',moveRight);
}

butLeft.addEventListener("click", moveLeft);
butRight.addEventListener("click", moveRight);

slider.addEventListener("animationend", (animation) => {
  if (animation.animationName === "anim__left") {
    slider.classList.remove("transform__left");
    let leftItem = SLIDER_LEFT.innerHTML;
    SLIDER_ACTIVE.innerHTML = leftItem;
    SLIDER_LEFT.innerHTML = "";
  } else {
    slider.classList.remove("transform__right");
    let rightItem = SLIDER_RIGHT.innerHTML;
    SLIDER_ACTIVE.innerHTML = rightItem;
    SLIDER_RIGHT.innerHTML = "";
  }
  butLeft.addEventListener('click',moveLeft);
  butRight.addEventListener('click',moveRight);
});

// возвращает массив всех объектов, кроме тех, которые обладают активными ID
function showElements() {
  let arrNewCard = shuffleArray([...newCardData]);
  console.log(arrNewCard);
  let activeElementsID = Array.from(SLIDER_ACTIVE.children).map((value) => value.id);
  console.log(`Массив неподходящих id  ${activeElementsID}`);
  let activeElementsValue = arrNewCard.filter((value) => {
    return !activeElementsID.includes(value.id);
  });
  return activeElementsValue;
}

// функция которая создает карточки
function createElement(direction, newCard) {
  let div = document.createElement("div");
  div.classList.add("slider__body");
  div.id = newCard.id;

  let imgWrap = document.createElement("div");
  imgWrap.classList.add("slider__img");

  let img = document.createElement("img");
  img.src = newCard.imageURL;
  img.classList.add("slider__images");

  let title = document.createElement("div");
  title.innerText = newCard.title;
  title.classList.add("slider__title");

  let button = document.createElement("button");
  button.innerText = newCard.button;
  button.classList.add("slider__button");

  imgWrap.appendChild(img);
  div.appendChild(imgWrap);
  div.appendChild(title);
  div.appendChild(button);

  return direction.appendChild(div);
}

// showCountCard возвращает количество карточек, которые должны быть на экране
function showCountCard() {
  const screenWidth = window.innerWidth;
  let visibleCards;
  if (screenWidth > 1200) {
    visibleCards = 3;
  } else if (screenWidth > 766) {
    visibleCards = 2;
  } else {
    visibleCards = 1;
  }
  return visibleCards;
}

// checkCountCard - проверяет количество карточек в зависимости от ширины экрана
function checkCountCard(){
  let cardNumber=showCountCard();
  let childSlider=Array.from(document.querySelector('.slider__items-active').children);
  if(cardNumber!==childSlider.length){
    document.querySelector('.slider__items-active').innerHTML='';
    createActiveElement();
  }else{
    return ;
  }
}
// при изменении ширины окна браузера, срабатывается функция checkCountCard
window.addEventListener("resize", checkCountCard);


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
  let numberCard = showCountCard();
  for (let i = 0; i < numberCard; i++) {
    let currentElem = newArr[i];
    createElement(SLIDER_ACTIVE, currentElem);
  }
}
createActiveElement();

const moveLeft = () => {
  let activeArr = showElements();
  // console.log(activeArr);
  let numberCard = showCountCard();
  for (let i = 0; i < numberCard; i++) {
    let currentElem = activeArr[i];
    createElement(SLIDER_LEFT, currentElem);
  }
  slider.classList.add("transform__left");
  // делаем кнопки неактивными
  butLeft.removeEventListener("click", moveLeft);
  butRight.removeEventListener("click", moveRight);
};

const moveRight = () => {
  let activeArr = showElements();
  // console.log(activeArr);
  let numberCard = showCountCard();
  for (let i = 0; i < numberCard; i++) {
    let currentElem = activeArr[i];
    createElement(SLIDER_RIGHT, currentElem);
  }
  slider.classList.add("transform__right");
  butLeft.removeEventListener("click", moveLeft);
  butRight.removeEventListener("click", moveRight);
};

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
  butLeft.addEventListener("click", moveLeft);
  butRight.addEventListener("click", moveRight);
});

// возвращает массив всех объектов, кроме тех, которые обладают активными ID
function showElements() {
  let arrNewCard = shuffleArray([...newCardData]);
  // console.log(arrNewCard);
  let activeElementsID = Array.from(SLIDER_ACTIVE.children).map((value) => value.id);
  // console.log(`Массив неподходящих id  ${activeElementsID}`);
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
function checkCountCard() {
  let cardNumber = showCountCard();
  let childSlider = Array.from(document.querySelector(".slider__items-active").children);
  if (cardNumber !== childSlider.length) {
    document.querySelector(".slider__items-active").innerHTML = "";
    createActiveElement();
  } else {
    return;
  }
}
// при изменении ширины окна браузера, срабатывается функция checkCountCard
window.addEventListener("resize", checkCountCard);

// ----------------Pop Up Start-----------------------------------------------

// создаем массив объектов, где каждый объект - информационная карточка питомца
const popUpCard = [
  {
    id: "1",
    imageURL: "/images/pets-sofia.png",
    title: "Sophia",
    subtitle: "Dog - Sophia",
    text: "Sophia is an adorable little dog with a big personality. This tiny sweetheart loves cuddling and enjoys short walks around the neighborhood. She’s playful, affectionate, and will make a wonderful companion.",
    age: "1 months",
    Inoculations: "yes",
    Disease: "none",
    Parasites: "none",
  },
  {
    id: "2",
    imageURL: "/images/pets-timmy.png",
    title: "Timmy",
    subtitle: "Cat - Timmy",
    text: "Timmy is a sweet 8-month-old cat searching for his forever home. He loves exploring new spaces and playing with feather toys, but he is also a big fan of curling up for a cozy nap.",
    age: "8 months",
    Inoculations: "yes",
    Disease: "none",
    Parasites: "none",
  },
  {
    id: "3",
    imageURL: "/images/pets-charly.png",
    title: "Charly",
    subtitle: "Cat - Katrine",
    text: "Charly is a friendly 1-year-old mixed breed dog looking for a home. He loves playing fetch and going for walks but is also content relaxing with his favorite humans. Charly is affectionate and always up for a cuddle.",
    age: "1 years",
    Inoculations: "none",
    Disease: "none",
    Parasites: "none",
  },
  {
    id: "4",
    imageURL: "/images/pets-katrine.png",
    title: "Katrine",
    subtitle: "Cat - Katrine",
    text: "Katrine is a playful 5-month-old kitten seeking a forever home. She loves chasing after toys and curling up for naps in cozy spots. This curious girl enjoys exploring her surroundings and would love some snuggles too.",
    age: "5 months",
    Inoculations: "yes",
    Disease: "none",
    Parasites: "none",
  },
  {
    id: "5",
    imageURL: "/images/pets-jennifer.png",
    title: "Jennifer",
    subtitle: "Dog - Labrador",
    text: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    Inoculations: "none",
    Disease: "none",
    Parasites: "none",
  },
  {
    id: "6",
    imageURL: "/images/pets-woody.png",
    title: "Woody",
    subtitle: "Dog - Woody",
    text: "Woody is an adorable 3-month-old Golden Retriever pup eagerly searching for his forever home. This energetic boy loves spending time outdoors, chasing after his favorite ball or exploring new scents. When indoors, he's just as happy curling up with his toys or enjoying a cuddle session on the couch.",
    age: "3 months",
    Inoculations: "yes",
    Disease: "none",
    Parasites: "none",
  },
  {
    id: "7",
    imageURL: "/images/pets-scarlet.png",
    title: "Scarlett",
    subtitle: "Dog - Scarlett",
    text: "Scarlett is a lovely 4-month-old Border Collie mix looking for her forever home. She is full of energy, loves to run outside, and enjoys quiet moments with her favorite chew toys indoors.",
    age: "4 months",
    Inoculations: "yes",
    Disease: "none",
    Parasites: "none",
  },
  {
    id: "8",
    imageURL: "/images/pets-freddie.png",
    title: "Freddie",
    subtitle: "Cat - Freddie",
    text: "Freddie is a charming 6-month-old tabby cat in search of a loving home. He loves lounging by the window, watching the world go by, but also has plenty of energy for playful sessions with his toys.",
    age: "months",
    Inoculations: "none",
    Disease: "none",
    Parasites: "none",
  },
];

// создаем объект cardObject, у которого каждый ключ соответствует id карточки, и в зависимоти от id карточки, будет вызываться функция createPopUp
const cardObject = {
  1: () => {
    createPopUp(popUpCard[0]);
    // console.log(1);
  },
  2: () => {
    createPopUp(popUpCard[1]);
    // console.log(2);
  },
  3: () => {
    createPopUp(popUpCard[2]);
    // console.log(3);
  },
  4: () => {
    createPopUp(popUpCard[3]);
    // console.log(4);
  },
  5: () => {
    createPopUp(popUpCard[4]);
    // console.log(5);
  },
  6: () => {
    createPopUp(popUpCard[5]);
    // console.log(6);
  },
  7: () => {
    createPopUp(popUpCard[6]);
  },
  8: () => {
    createPopUp(popUpCard[7]);
  },
};

slider.addEventListener("click", (event) => {
  let card = event.target.closest(".slider__body");
  if (card) {
    let action = cardObject[card.id];
    action();
  }
});


/* <div class="popUp popUp__hidden">
<div class="popUp__content">
  <button class="button__close">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929" />
    </svg>
  </button>
  <div class="popUp__row">
    <img class="popUp_img" src="/images/pets-jennifer.png">
    <div class="popUp__column">
      <div class="column__title">
        Jennifer
      </div>
      <div class="column__subtitle">
        Dog - Labrador
      </div>
      <div class="column__text">
      Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.
      </div>
      <div class="column__inform">
        <ul>
          <li><strong>Age:</strong> 2 months</li>
          <li><strong>Inoculations:</strong> none</li>
          <li><strong>Diseases:</strong> none</li>
          <li><strong>Parasites:</strong> none</li>
        </ul>
      </div>
    </div>
  </div>

  </div>
</div>  */
// Динамическое создание Pop-UP по макету.
function createPopUp(object) {
  let popUpWrapper = document.createElement("div");
  popUpWrapper.classList.add("popUp");

  let popUpContent = document.createElement("div");
  popUpContent.classList.add("popUp__content");

  const buttonClose = document.createElement("button");
  buttonClose.className = "button__close";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "12");
  svg.setAttribute("height", "12");
  svg.setAttribute("viewBox", "0 0 12 12");
  svg.setAttribute("fill", "none");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("clip-rule", "evenodd");
  path.setAttribute(
    "d",
    "M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z"
  );
  path.setAttribute("fill", "white");
  svg.appendChild(path);
  buttonClose.appendChild(svg);

  let popUpRow = document.createElement("div");
  popUpRow.classList.add("popUp__row");

  let img = document.createElement("img");
  img.src = object.imageURL;
  img.classList.add("popUp_img");

  let popUPColumn = document.createElement("div");
  popUPColumn.classList.add("popUp__column");

  let columnTitle = document.createElement("div");
  columnTitle.classList.add("column__title");
  columnTitle.innerText = object.title;

  let columnSubTitle = document.createElement("div");
  columnSubTitle.classList.add("column__subtitle");
  columnSubTitle.innerText = object.subtitle;

  let columnText = document.createElement("div");
  columnText.classList.add("column__text");
  columnText.innerText = object.text;

  let columnInform = document.createElement("div");
  columnInform.classList.add("column__inform");

  let ulInform = document.createElement("ul");

  let liAge = document.createElement("li");
  liAge.innerHTML = `<strong>Age:</strong> ${object.age}`;
  ulInform.appendChild(liAge);
  let liInocula = document.createElement("li");
  liInocula.innerHTML = `<strong>Inoculations:</strong> ${object.Inoculations}`;
  ulInform.appendChild(liInocula);
  let liDiseases = document.createElement("li");
  liDiseases.innerHTML = `<strong>Disease:</strong> ${object.Disease}`;
  ulInform.appendChild(liDiseases);
  let liParasit = document.createElement("li");
  liParasit.innerHTML = `<strong>Parasites:</strong> ${object.Parasites}`;
  ulInform.appendChild(liParasit);

  columnInform.appendChild(ulInform);

  popUPColumn.appendChild(columnTitle);
  popUPColumn.appendChild(columnSubTitle);
  popUPColumn.appendChild(columnText);
  popUPColumn.appendChild(columnInform);

  popUpRow.appendChild(img);
  popUpRow.appendChild(popUPColumn);

  popUpContent.appendChild(popUpRow);
  popUpContent.appendChild(buttonClose);

  popUpWrapper.appendChild(popUpContent);

  document.body.appendChild(popUpWrapper);

  document.body.classList.add("no-scroll");
  document.body.classList.add("darkened");

  document.addEventListener("click", closePopUp, true);
}

// при создании PopUp, на document.body вешается обработчик click, и вызывается функция closePopUp
function closePopUp(event) {
  let popUpWrapper = document.querySelector(".popUp");
  let isInsidePopUp = event.target.closest(".popUp__content");
  let closeButton=event.target.closest(".button__close");
  if (!isInsidePopUp || closeButton) {
    document.body.classList.remove("no-scroll");
    document.body.classList.remove("darkened");
    popUpWrapper.remove();
    document.removeEventListener("click", closePopUp, true);
  }
}

// -----------------------Pagination Start--------------------

const twoLeftArrow = document.querySelector(".two__arrawLeft");
const oneLeftArrow = document.querySelector(".one__arrowLeft");
const oneRightArrow = document.querySelector(".one__arrorRight");
const twoRightArrow = document.querySelector(".two__arrowRight");
let currentNumber = document.querySelector(".current__number");

// Функция для перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// оперделяет количество карточек на странице
let countCard = function () {
  const screenWidth = window.innerWidth;
  let visibleCards;
  if (screenWidth > 1200) {
    visibleCards = 8;
  } else if (screenWidth > 766) {
    visibleCards = 6;
  } else {
    visibleCards = 3;
  }
  return visibleCards;
};

const Card = [
  { id: "1", imageURL: "/images/pets-sofia.png", title: "Sophia", button: "Learn more" },
  { id: "2", imageURL: "/images/pets-timmy.png", title: "Timmy", button: "Learn more" },
  { id: "3", imageURL: "/images/pets-charly.png", title: "Charly", button: "Learn more" },
  { id: "4", imageURL: "/images/pets-katrine.png", title: "Katrine", button: "Learn more" },
  { id: "5", imageURL: "/images/pets-jennifer.png", title: "Jennifer", button: "Learn more" },
  { id: "6", imageURL: "/images/pets-woody.png", title: "Woody", button: "Learn more" },
  { id: "7", imageURL: "/images/pets-scarlet.png", title: "Scarlett", button: "Learn more" },
  { id: "8", imageURL: "/images/pets-freddie.png", title: "Freddie", button: "Learn more" },
];

// Дублируем данные
let newCardData = [...shuffleArray(Card), ...shuffleArray(Card), ...shuffleArray(Card), ...shuffleArray(Card), ...shuffleArray(Card), ...shuffleArray(Card)];


function checkArray(arr, n) {
  let result = [];
  let currentArr = [];
  let changeArr = arr.slice();
  while (changeArr.length) {
    for (let i = 0; i < changeArr.length; i++) {
      if (!currentArr.some((el) => el.id === changeArr[i].id)) {
        currentArr.push(changeArr[i]);
        result.push(changeArr[i]);
        changeArr.splice(i,1);
        break;
      }
    }
    if (currentArr.length === n) {
      console.log(currentArr)
      console.log('aaaaaaaaaaa')
      currentArr = [];
    }
  }


  return result;
}


// ------------------------------------------
function changArray(){
  let resultArray = checkArray(newCardData, countCard());
  return resultArray;
}

// displayList - отображает пагинацию
// currentPagesPar - текущая страница
function displayList(arr, countCardPar, currentPagesPar) {
  const friendsBody = document.querySelector(".friends_body");
  const start = (currentPagesPar - 1) * countCardPar;
  const end = start + countCardPar;
  console.log(start);
  console.log(end);
  const pagArr = arr.slice(start, end);
  console.log(pagArr);
  for (let i = 0; i < countCardPar; i++) {
    let curentElement = pagArr[i];
    createElement(friendsBody, curentElement);
  }
}

// функция создает карточки
function createElement(friendsBodyPar, curentElementPar) {
  const friendsWrap = document.createElement("div");
  friendsWrap.classList.add("friends-items");
  friendsWrap.id = curentElementPar.id;

  const imgWrap = document.createElement("div");
  imgWrap.classList.add("friends-items_img");
  const img = document.createElement("img");
  img.src = curentElementPar.imageURL;
  imgWrap.appendChild(img);

  const text = document.createElement("div");
  text.classList.add("friends-items_text");
  text.innerText = curentElementPar.title;

  const buttonWrap = document.createElement("div");
  buttonWrap.classList.add("friends-items_btn");
  const button = document.createElement("button");
  button.classList.add("friends-items_button");
  button.innerText = curentElementPar.button;
  buttonWrap.appendChild(button);

  friendsWrap.appendChild(imgWrap);
  friendsWrap.appendChild(text);
  friendsWrap.appendChild(buttonWrap);
  friendsBodyPar.appendChild(friendsWrap);
}

// checkCountCard - проверяет количество карточек в зависимости от ширины экрана
function checkCountCard() {
  let cardNumber = countCard();
  if(cardNumber===8){
    document.querySelector(".friends_body").innerHTML = "";
    displayList(changArray(), cardNumber, 1);
  }else if(cardNumber===6){
    document.querySelector(".friends_body").innerHTML = "";
    displayList(changArray(), cardNumber, 1);
  }else{
    document.querySelector(".friends_body").innerHTML = "";
    displayList(changArray(), cardNumber, 1);
  }
  // let child = Array.from(document.querySelector(".friends_body").children);
  // if (cardNumber !== child.length) {
  //   document.querySelector(".friends_body").innerHTML = "";
  //   displayList(changArray(), countCard(), 1);
  // } else {
  //   return;
  // }
}
// при изменении ширины окна браузера, срабатывается функция checkCountCard
window.addEventListener("resize", checkCountCard);

// отслеживание следующей страницы
function showPagNext() {
  let curentPag = currentNumber.innerText;
  return +curentPag + 1;
}

// отслеживание прошлой страницы
function showPagLast() {
  let curentPag = currentNumber.innerText;
  return +curentPag - 1;
}

moveRight = function () {
  let pageNext = showPagNext();
  document.querySelector(".friends_body").innerHTML = "";
  displayList(changArray(), countCard(), pageNext);
  currentNumber.innerText = "";
  currentNumber.innerText = pageNext;
  let maxPages = newCardData.length / countCard();
  // когда страница является последней
  if (pageNext === maxPages) {
    isLastRight();
  }
  // когда текущая страница становится >1, убираем неактивность кнопок
  if (pageNext === 2) {
    noFirstPositionLeft();
  }
};

moveLeft = function () {
  let maxPages = newCardData.length / countCard();
  let pageLast = showPagLast();
  // проверка на предпоследнюю  страницу
  if (pageLast === maxPages - 1) {
    isPenultimateRight();
  }
  // проверка на самую первую страницу
  if (pageLast === 1) {
    firstPositionLeft();
  }
  document.querySelector(".friends_body").innerHTML = "";
  displayList(changArray(), countCard(), pageLast);
  currentNumber.innerText = "";
  currentNumber.innerText = pageLast;
};

// левые кнопки становятся неактивными и добавляется специальный класс noActive__border
function firstPositionLeft() {
  oneLeftArrow.disabled = true;
  twoLeftArrow.disabled = true;
  oneLeftArrow.classList.add("noActive__border");
  twoLeftArrow.classList.add("noActive__border");
}

// левые кнопки становятся активными и удаляется специальный класс noActive__border
function noFirstPositionLeft() {
  oneLeftArrow.disabled = false;
  twoLeftArrow.disabled = false;
  oneLeftArrow.classList.remove("noActive__border");
  twoLeftArrow.classList.remove("noActive__border");
}

//  правые кнопки становятся неактивными и добавляется специальный класс noActive__border
function isLastRight() {
  oneRightArrow.disabled = true;
  twoRightArrow.disabled = true;
  oneRightArrow.classList.add("noActive__border");
  twoRightArrow.classList.add("noActive__border");
}

//  правые кнопки становятся активными и удаляется  класс noActive__border
function isPenultimateRight() {
  oneRightArrow.disabled = false;
  twoRightArrow.disabled = false;
  oneRightArrow.classList.remove("noActive__border");
  twoRightArrow.classList.remove("noActive__border");
}

oneRightArrow.addEventListener("click", moveRight);
oneLeftArrow.addEventListener("click", moveLeft);

document.addEventListener("DOMContentLoaded", () => {
  displayList(changArray(), countCard(), 1);
  // при создании DOM дерева, левая кнопка сразу будет неактивной
  firstPositionLeft();
});

// при нажатии на двойную левую стрелку
twoLeftArrow.addEventListener("click", () => {
  document.querySelector(".friends_body").innerHTML = "";
  displayList(changArray(), countCard(), 1);
  currentNumber.innerText = "";
  currentNumber.innerText = 1;
  isPenultimateRight();
  firstPositionLeft();
});

// при нажатии на двойную правую стрелку
twoRightArrow.addEventListener("click", () => {
  let maxPages = newCardData.length / countCard();
  document.querySelector(".friends_body").innerHTML = "";
  displayList(changArray(), countCard(), maxPages);
  currentNumber.innerText = "";
  currentNumber.innerText = maxPages;
  isLastRight();
  noFirstPositionLeft();
});


// ---------------Burger Menu Start--------------------------
const button = document.querySelector(".menu__burger");
const buttonWrap = document.querySelector(".burger__wrapper");
const fonOpac=document.querySelector('.fon__garknes');
const links = document.querySelectorAll(".burger__link");

button.addEventListener("click", (event) => {
  buttonWrap.classList.toggle("burger__active");
  button.classList.toggle("menu__burger-change");

  if (buttonWrap.classList.contains("burger__active")) {
    document.body.classList.add('burger__hidden');
    fonOpac.classList.remove('hidden');
  }else{
    document.body.classList.remove('burger__hidden');
    fonOpac.classList.add('hidden');
  }
});

document.addEventListener("click", (event) => {
  if (!buttonWrap.classList.contains("burger__active")) { 
    return;
  }
  if (!event.target.closest(".menu__burger")) {
    buttonWrap.classList.remove("burger__active");
    button.classList.remove("menu__burger-change");
    fonOpac.classList.add('hidden');
    document.body.classList.remove('burger__hidden');
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
// -------------Burger Menu End----------------------
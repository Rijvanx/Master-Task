const scrollparent= document.querySelector(".test-contant");
const scrollLength = scrollparent.scrollWidth - scrollparent.clientWidth;
console.log(scrollLength);

const leftButton = document.querySelector(".left-arrow");
const rightButton = document.querySelector(".right-arrow");


function leftScroll() {
    scrollparent.scrollBy({
      left: -1157,
      behavior: "smooth"
    });
  }

  function rightScroll() {
    scrollparent.scrollBy({
      left: 1157,
      behavior: "smooth"
    });
  }

  leftButton.addEventListener("click", leftScroll);
  rightButton.addEventListener("click", rightScroll);
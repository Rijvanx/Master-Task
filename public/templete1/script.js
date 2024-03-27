
// ===============  technology-section tabs ==================// 

// const tab_btns = document.querySelectorAll(".tab-btn");
// console.log(tab_btns)

// tab_btns.forEach(element => {
//     element.addEventListener("click", (e)=>{
//         console.log(e.target.id);

//         const tabs = document.querySelectorAll(".tab");
//         tabs.forEach(el => {
//             el.classList.remove("tab-active");
//             el.style.display = "none";
//         });


//         const tab = document.getElementsByClassName(e.target.id);
//         console.log()
//         // e.classList.add("tab-active");
//     })
// });

function changetab(n){
    const tabs = document.querySelectorAll(".tab");
        tabs.forEach(el => {
            el.classList.remove("tab-active");
            el.style.display = "none";
        });

        const tab_btns = document.querySelectorAll(".tab-btn");
        tab_btns.forEach(el => {
            el.classList.remove("btn-active");
        });

        if(n == 1){
            tabs[0].classList.add("tab-active");
            tab_btns[0].classList.add("btn-active");
        } else if(n== 2){
            tabs[1].classList.add("tab-active");
            tab_btns[1].classList.add("btn-active");
        } else if(n== 3){
            tabs[2].classList.add("tab-active");
            tab_btns[2].classList.add("btn-active");
        } else if(n== 4){
            tabs[3].classList.add("tab-active");
            tab_btns[3].classList.add("btn-active");
        }
}





// ===============  testimonial-section card swiper ==================// 

const scrollparent= document.querySelector(".customer-cards");
const scrollLength = scrollparent.scrollWidth - scrollparent.clientWidth;
// console.log(scrollLength);

const leftButton = document.querySelector(".arrow-left");
const rightButton = document.querySelector(".arrow-right");


function leftScroll() {
    scrollparent.scrollBy({
      left: -200,
      behavior: "smooth"
    });
  }

  function rightScroll() {
    scrollparent.scrollBy({
      left: 200,
      behavior: "smooth"
    });
  }

  leftButton.addEventListener("click", leftScroll);
  rightButton.addEventListener("click", rightScroll);
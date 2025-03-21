document.addEventListener("DOMContentLoaded", () => {
    /* let linksCollection = document.querySelectorAll('header nav ul li a');
     linksCollection.forEach((link)=>{
         link.addEventListener("click", (e)=>{
             e.preventDefault();
             e.stopPropagation();
             alert("Navegaría a Traves de esta página al target: " + e.target.href + " pero no.");
         });
     })
     */
    let btnLeft = null;
    let btnRight = null;
    let nav = null;
    let timeoutID = null;
    let currentSlide = 0;
    let direction = 1; // 1 derecha  -1 Izquierda

    const carrusel = document.querySelector('.carrusel');
    const track = document.querySelector('.carrusel .track');
    const slides = track.querySelectorAll('.hero-panel');
    const slidesTopLimit = slides.length - 1;
    const waitingTime = 3000; // 3s * 1000ms

    console.log("Slides Found:", slides);

    function moveSlide() {
        console.log("Move Slide Triggered");
        let nextSlide = currentSlide + direction;
        if (nextSlide < 0) {
            nextSlide = 1;
            direction = 1;
        }
        if (nextSlide > slidesTopLimit) {
            nextSlide = slidesTopLimit - 1;
            direction = -1;
        }
        renderSlide(nextSlide);
    }

    function renderSlide(moveTo) {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        track.style.transform = `translateX(calc(100vw * ${moveTo * -1}))`;

        nav.children[currentSlide].classList.remove('active');
        nav.children[moveTo].classList.add('active');

        // nav.querySelectorAll('button').forEach((dot, index)=>{
        //     if (index == moveTo) {
        //         dot.classList.add('active');
        //     } else {
        //         dot.classList.remove('active');
        //     }
        // });

        //slides[currentSlide].querySelector('img').style.transform = "scale(1)";
        //slides[moveTo].querySelector('img').style.transform = "scale(1.5)";
        currentSlide = moveTo;
        tickFunction();
    }

    function renderNavigation() {
        btnLeft = document.createElement('BUTTON');
        btnLeft.textContent = "<";
        btnLeft.classList.add("btn-left");
        btnLeft.addEventListener('click', ()=>{
            if(currentSlide > 0) {
                renderSlide(currentSlide -1);
            }
        });
        btnRight = document.createElement('BUTTON');
        btnRight.textContent = ">";
        btnRight.classList.add("btn-right");
        btnRight.addEventListener('click', ()=>{
            if(currentSlide < slidesTopLimit) {
                renderSlide(currentSlide + 1);
            }
        });
        carrusel.appendChild(btnLeft);
        carrusel.appendChild(btnRight);


        nav = document.createElement("DIV");
        nav.classList.add('nav');
        slides.forEach(
            (slide, index)=>{
                const btn = document.createElement("BUTTON");
                btn.textContent = (index + 1);
                btn.addEventListener('click', ()=>{
                    renderSlide(index);
                });
                nav.appendChild(btn);
            }
        );
        carrusel.appendChild(nav);
    }


    const tickFunction = () => {
        timeoutID = setTimeout(moveSlide, waitingTime);
    }

    renderNavigation();
    tickFunction();
});
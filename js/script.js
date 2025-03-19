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
        tickFunction();
    }

    function renderSlide(moveTo) {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        track.style.transform = `translateX(calc(100vw * ${moveTo * -1}))`;
        currentSlide = moveTo;
        tickFunction();
    }

    function renderNavigation() {
        // Generando los botones laterales
        btnLeft = document.createElement('BUTTON');
        btnRight = document.createElement('BUTTON');
        btnLeft.textContent = "<";
        btnRight.textContent = ">";
        btnLeft.classList.add('btn-left');
        btnRight.classList.add('btn-right');
        btnLeft.addEventListener("click", () => {
            if (currentSlide > 0) {
                renderSlide(currentSlide - 1);
            }
        });
        btnRight.addEventListener("click", () => {
            if (currentSlide < slidesTopLimit) {
                renderSlide(currentSlide + 1);
            }
        });
        carrusel.appendChild(btnLeft);
        carrusel.appendChild(btnRight);
        // Generando los botones inferiores
        let nav = document.createElement('DIV');
        nav.classList.add('nav');
        slides.forEach((slide, index) => {
            let dot = document.createElement('BUTTON');
            dot.textContent = index + 1;
            dot.addEventListener("click", () => {
                renderSlide(index);
            });
            nav.appendChild(dot);
        });
        carrusel.appendChild(nav);
    }


    const tickFunction = () => {
        timeoutID = setTimeout(moveSlide, waitingTime);
    }

    renderNavigation();
    tickFunction();
});
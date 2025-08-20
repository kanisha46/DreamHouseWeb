// Login / Register ----------------
const loginMenu = document.querySelector('header .active');
const loginShow = document.querySelector('.login-container');
const btnClose = document.querySelector('#btn-close');
loginMenu.addEventListener('click', () => {
    loginShow.style.clipPath = `circle(100% at 50% 50%)`;
})
btnClose.addEventListener('click', () => {
    loginShow.style.clipPath = `circle(0% at 50% 50%)`;
})
const btnToggle = document.querySelectorAll('.next-log');
const resForm = document.querySelector('#res');
btnToggle.forEach(item => {
    item.addEventListener('click', () => {
        resForm.classList.toggle('hidden');
    })
})

// Menu Toggle
const menuToggle = document.querySelectorAll('header .menu');
const menu = document.querySelector('header ul');
menuToggle.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.toggle('menu-toggle');
    })
})

// Banner Auto Slide
const banner = document.querySelector('.banner');
const images = document.querySelectorAll('.banner img');
const dots = document.querySelectorAll('.banner .nav-dot');
const prev = document.querySelector('.banner .prev');
const next = document.querySelector('.banner .next');

let slideIndex = 0;
slideShow(slideIndex);
function slideShow(n) {
    if (slideIndex > images.length - 1) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = images.length - 1;
    }
    let i;
    for (i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace('dot-active', '')
    }
    images[slideIndex].style.display = "block";
    dots[slideIndex].className += ' dot-active';
}
dots.forEach((item, index) => {
    item.addEventListener('click', () => {
        slideShow(slideIndex = index);
    })
})
prev.addEventListener('click', () => {
    slideShow(slideIndex += 1);
})

let run;
autoSlide();
function autoSlide() {
    run = setInterval(() => {
        slideShow(slideIndex += 1);
    }, 5000)
}
banner.addEventListener('mouseover', () => {
    clearInterval(run);
    run = null;
})
banner.addEventListener('mouseout', () => {
    autoSlide();
})

// Lazy Load Optimizer
document.addEventListener("DOMContentLoaded", () => {
    let lazyLoaderImages = document.querySelectorAll('img.lazy');
    let lazyLoaderThrottleTimeout;

    function lazyLoad() {
        if (lazyLoaderThrottleTimeout) {
            clearTimeout(lazyLoaderThrottleTimeout);
        }
        lazyLoaderThrottleTimeout = setTimeout(() => {
            let scrollTop = window.pageYOffset;
            lazyLoaderImages.forEach(img => {
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.style.transform = `scale(1)`;
                    img.style.transition = `2s`;
                }
            })
            if (lazyLoaderImages.length === 0) {
                document.removeEventListener('scroll', lazyLoad);
                document.removeEventListener('resize', lazyLoad);
                document.removeEventListener('orientationChange', lazyLoad);

            }
        }, 10)
    }
    document.addEventListener('scroll', lazyLoad);
    document.addEventListener('resize', lazyLoad);
    document.addEventListener('orientationChange', lazyLoad);
})

var typed = new Typed(".auto-type", {
    strings: ["Frontend Developer", "Problem Solver", "UI Designer"],
    typeSpeed: 100, 
    backSpeed: 50,  
    loop: true      
});



const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');


hamburger.addEventListener('click', () => {
    
    navMenu.classList.toggle('nav-active');
});


const navLinks = document.querySelectorAll('nav ul li a');


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('nav-active')) {
            navMenu.classList.remove('nav-active');
        }
    });
});
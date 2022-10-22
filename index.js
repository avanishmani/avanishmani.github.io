/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 200}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*SCROLL HOME*/
sr.reveal( ".home-title", {} );
sr.reveal( ".button", { delay: 200 } );
sr.reveal( ".home-img", { delay: 200 } );
sr.reveal( ".home-social-icon", { interval: 200 } );

/*SCROLL ABOUT*/
sr.reveal( ".about-img", {} );
sr.reveal( ".about-subtitle", { delay: 200 } );
sr.reveal( ".about-text", { delay: 200 } );

// Scross main skills mainskills
sr.reveal( ".mainskills", { interval: 100 } );
sr.reveal( ".mskill-img", { delay: 200 } );
sr.reveal( ".mskill-text", { delay: 200 } );
/*SCROLL SKILLS*/
sr.reveal( ".skills-subtitle", {} );
sr.reveal( ".skills-text", {} );
sr.reveal( ".skills-data", { interval: 100 } );
// sr.reveal(".skills-img", { delay: 600 });

/*SCROLL projects*/
sr.reveal( ".project-img", { interval: 200 } );

// SCROLL CONTACT
sr.reveal(".contact-input", { interval: 200 });
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .container ul li");

window.onscroll = function () {
    scrollFunction()
    // interestSticky()
};

function scrollFunction() {
    if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
    ) {
        document.getElementById("main-navbar").classList.remove("py-lg-3", "bg-transparent", "navbar-queen-blue")
        document.getElementById("main-navbar").classList.add("py-lg-0", "bg-primary", "navbar-light")

        document.getElementById("logo_span").style.display = "none"
        document.getElementById("svg_nav").style.fill = "#FCFCFC"
        document.getElementById("main-navbar").style.transition = "0.3s"
    } else {
        document.getElementById("main-navbar").classList.remove("py-lg-0", "bg-primary", "navbar-light")
        document.getElementById("main-navbar").classList.add("py-lg-3", "bg-transparent", "navbar-queen-blue")

        document.getElementById("logo_span").style.display = "inline-block"
        document.getElementById("svg_nav").style.fill = "#356CAB"
        document.getElementById("main-navbar").style.transition = "0.3s"
    }

    var current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        if (li.classList.contains(current)) {
            li.classList.add("active");
        }
    });
}

var interest = document.getElementById("int-nav")
var contact = document.getElementById("con-nav")

var intHeader = document.getElementById("int-header")
var navbar = document.getElementById("main-navbar")
var elemCards = document.getElementsByClassName("card")
// var elemIcons = document.getElementsByClassName("icons")

var stop = (interest.offsetTop - 150)
// var startAgain = (contact.offsetTop - 30)
// console.log(contact.offsetTop)

function addStickyClass(elem) {
    elem.classList.add("sticky-xl-top", "pt-5")
    elem.classList.remove("py-lg-5", "py-5")
}

function removeStickyClass(elem) {
    elem.classList.remove("sticky-xl-top", "pt-5")
    elem.classList.add("py-lg-5", "py-5")
}

function interestSticky() {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    // console.log(elemCards)

    for (i=0; i<elemCards.length; i++) {
        if (scrollTop >= stop) {
            addStickyClass(interest)
            intHeader.style.display = "none"

            elemCards[i].style.padding = 0
            elemCards[i].childNodes[1].style.display = "none"
        } else {
            removeStickyClass(interest)
            intHeader.style.display = "block"

            elemCards[i].style.padding = "2rem 0"
            elemCards[i].childNodes[1].style.display = "block"
        }
    }
}


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function showModal(img_id) {
    var imgPath = document.getElementById(img_id).querySelectorAll("img")

    document.getElementById("selectedImage").src = imgPath[0].src
}
//Select dom

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuBranding = document.querySelector('.menu-branding');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');

//set initial state of menu

let showMenu = false;
menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    menu.classList.add('show');

    navItems.forEach(item => item.classList.add('show'));

    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    menu.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));
    showMenu = false;
  }
}

$('.menu-nav li.current').removeClass('current');
//get the current page url(the last part of the url)
const page = window.location.href.match(/[^/]+$/)[0];
//then fine the li having the anchor with that url and add the class
$('.menu-nav li a[href$="' + page + '"]')
  .closest('li')
  .addClass('current');

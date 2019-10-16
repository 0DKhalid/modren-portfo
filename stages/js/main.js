(function() {
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

  //active navlink
  //remove class current (active) before set it up
  document.querySelector('.menu-nav li.current').classList.remove('current');

  //find and filter current page name
  const page = window.location.href.match(/[^/]+$/)[0];

  //find anchor tag with current href by use page name then set current class to his parent element (i)
  document
    .querySelector(`.menu-nav li a[href='${page}']`)
    .parentElement.classList.add('current');
})();

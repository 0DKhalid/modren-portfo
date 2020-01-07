"use strict";

(function () {
  //Select dom
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.menu');
  var menuBranding = document.querySelector('.menu-branding');
  var menuNav = document.querySelector('.menu-nav');
  var navItems = document.querySelectorAll('.nav-item'); //set initial state of menu

  var showMenu = false;
  menuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    if (!showMenu) {
      menuBtn.classList.add('close');
      menuNav.classList.add('show');
      menuBranding.classList.add('show');
      menu.classList.add('show');
      navItems.forEach(function (item) {
        return item.classList.add('show');
      });
      showMenu = true;
    } else {
      menuBtn.classList.remove('close');
      menuNav.classList.remove('show');
      menuBranding.classList.remove('show');
      menu.classList.remove('show');
      navItems.forEach(function (item) {
        return item.classList.remove('show');
      });
      showMenu = false;
    }
  } //active navlink
  //remove class current (active) before set it up


  document.querySelector('.menu-nav li.current').classList.remove('current'); //find and filter current page name

  var page;

  if (window.location.href.match(/[^/]+$/)) {
    page = window.location.href.match(/[^/]+$/)[0];
  } else {
    page = 'index.html';
  } //find anchor tag with current href by use page name then set current class to his parent element (i)


  document.querySelector(".menu-nav li a[href='".concat(page, "']")).parentElement.classList.add('current'); //copy contact info by click

  var emailEl = document.getElementById('email');
  var phoneNumEl = document.getElementById('phone-number');
  var overallTimer;

  function copyContactInfo(event) {
    if (overallTimer) {
      clearTimeout(overallTimer);
      overallTimer = 0;
    }

    var targetSpanName = event.target.childNodes[1].innerText;
    var targetValue = event.target.childNodes[2].data.trim();

    if (!navigator.clipboard) {
      return alert('copy only available on modren browsers');
    }

    navigator.clipboard.writeText(targetValue).then(function () {
      event.target.textContent = 'Copied!';
      overallTimer = setTimeout(function () {
        event.target.innerHTML = " <span class=\"text-secondary\">".concat(targetSpanName, "</span>").concat(targetValue);
      }, 500);
    })["catch"](function (err) {
      console.log(err);
    });
  }

  if (page === 'contact.html') {
    emailEl.addEventListener('click', copyContactInfo);
    phoneNumEl.addEventListener('click', copyContactInfo);
  }
})();
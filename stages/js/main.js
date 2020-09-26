(function () {
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

      navItems.forEach((item) => item.classList.add('show'));

      showMenu = true;
    } else {
      menuBtn.classList.remove('close');
      menuNav.classList.remove('show');
      menuBranding.classList.remove('show');
      menu.classList.remove('show');
      navItems.forEach((item) => item.classList.remove('show'));
      showMenu = false;
    }
  }

  //active navlink
  //remove class current (active) before set it up
  document.querySelector('.menu-nav li.current').classList.remove('current');

  //find and filter current page name
  let page;
  if (window.location.href.match(/[^/]+$/)) {
    page = window.location.href.match(/[^/]+$/)[0];
  } else {
    page = 'index.html';
  }
  //find anchor tag with current href by use page name then set current class to his parent element (i)
  document
    .querySelector(`.menu-nav li a[href='${page}']`)
    .parentElement.classList.add('current');

  //copy contact info by click
  const emailEl = document.getElementById('email');
  const phoneNumEl = document.getElementById('phone-number');
  let overallTimer;
  function copyContactInfo(event) {
    if (overallTimer) {
      clearTimeout(overallTimer);
      overallTimer = 0;
    }

    const targetSpanName = event.target.childNodes[1].innerText;
    const targetValue = event.target.childNodes[2].data.trim();

    const isCopy = window.copyToClipboard(targetValue);
    if (!isCopy) {
      alert('Copy Faild');
    } else {
      event.target.textContent = !localStorage.getItem('lang')
        ? 'Copied!'
        : 'تم النسخ!';
      setTimeout(() => {
        event.target.innerHTML = ` <span class="text-secondary">${targetSpanName}</span> ${targetValue}`;
      }, 500);
    }
  }
  if (page === 'contact.html') {
    emailEl.addEventListener('click', copyContactInfo);
    phoneNumEl.addEventListener('click', copyContactInfo);
  }

  //resume functionliaty
  //select dropdwon btn and drop down

  const wrapperDropdown = document.getElementById('dd');
  const dropdown = document.querySelector('.dropdown'); // toggle active class

  function toggleDropdown() {
    dropdown.classList.toggle('active');
  }

  if (page === 'about.html') {
    wrapperDropdown.addEventListener('click', toggleDropdown); //remove class active add hidde dropdown when click on window obj

    window.addEventListener('click', (event) => {
      if (!wrapperDropdown.contains(event.target)) {
        dropdown.classList.remove('active');
      }
    });
  }
})();

(function () {
  //translation to arabic
  const langSwitch = document.querySelector('.lang-switch');
  const isArMode = localStorage.getItem('lang');

  if (isArMode) {
    langSwitch.checked = true;
    translateToAr();
  }

  langSwitch.addEventListener('change', translateToAr);

  function translateToAr() {
    if (langSwitch.checked) {
      localStorage.setItem('lang', 'ar');
      fetch('./data/ar.json')
        .then((res) => res.json())
        .then((arData) => {
          const dataAtrrSelectors = Object.keys(arData);
          for (let key of dataAtrrSelectors) {
            const ele = document.querySelector(`[data-ar='${key}']`);
            if (ele) {
              ele.childNodes[0].textContent = `  ${arData[key]}`;
            } else {
              continue;
            }
          }
          changePageDir();
        })
        .catch(console.log);
    } else {
      localStorage.removeItem('lang');
      setTimeout(() => {
        window.location.reload();
      }, 260);
    }
  }

  function changePageDir() {
    const eleId =
      window.location.href.match(/[^/]+$/)[0].split('.')[0] === 'index'
        ? 'home'
        : window.location.href.match(/[^/]+$/)[0].split('.')[0];

    document.getElementById(eleId).dir = 'rtl';
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  /* Скрытие панели с фильтрами */
  function hideAside() {
    const btn = document.querySelector('.hide-filter');
    const aside = document.querySelector('.catalog__filters');
    if (document.documentElement.clientWidth < 560) {
      btn.textContent = "Фильтры";
    }
    btn.addEventListener('click', () => {
      if (document.documentElement.clientWidth < 560) {
        btn.textContent = "Фильтры";
        aside.classList.toggle('catalog__filters-hidden');
      } else {
        if (aside.classList.contains("catalog__filters-hidden")) {
          btn.textContent = "Скрыть фильтр";
        } else {
          btn.textContent = "Показать фильтр";
        }
        aside.classList.toggle('catalog__filters-hidden');
      }
    });
  }


  /* Скрытие блоков фильтров */
  function hideFilter() {
    const titles = document.querySelectorAll('.filter__title');
    titles.forEach(title => {
      title.addEventListener('click', () => {
        if (title.classList.contains('filter__title')) {
          title.classList.toggle('filter__title-close');
          title.nextElementSibling.classList.toggle('filter__body-hidden');
        }
      })
    })
  }

  /* При нажатии на лайк увеличивается цифра */
  function addLike() {
    const likes = document.querySelectorAll('.card__badge-like');
    likes.forEach(like => {
      like.addEventListener('click', () => {
        if (like.classList.contains('clicked')) {
          like.innerHTML = +like.innerHTML - 1;
          like.classList.remove('clicked');
        } else {
          like.innerHTML = +like.innerHTML + 1;
          like.classList.add('clicked');
        }
      })
    })
  }

  /* Показать больше карт */
  function showMoreCards() {
    const page = document.querySelector('.catalog__page');
    const pages = document.querySelector('.catalog__pages');
    const btnShowMore = document.querySelector('.more-btn');
    const pagination = document.querySelectorAll('.pagination__item');
    btnShowMore.addEventListener('click', () => {
      let nextPage = page.cloneNode(true);
      pages.append(nextPage);
      nextPage.setAttribute('data-page', +pages.children.length);

      pagination.forEach(item => {
        if (item.textContent == pages.children.length) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      })
    })
  }

  /* Пагинация */
  function pagination() {
    const pagination = document.querySelectorAll('.pagination__item');
    pagination.forEach(item => {
      item.addEventListener('click', () => {
        pagination.forEach(item => {
          item.classList.remove('active');
        })
        item.classList.add('active');
      })
    })
  }

  /* Показ цифры при выборе параметров фильтра */
  function showNumberOfFilter(num, check) {
    const numbers = document.querySelector(num);
    const checkbox = document.querySelectorAll(check);
    checkbox.forEach(item => {
      item.addEventListener('click', () => {
        if (!item.hasAttribute('checked')) {
          item.setAttribute('checked', true);
          numbers.innerHTML = +numbers.innerHTML + 1;
        } else {
          item.removeAttribute('checked');
          numbers.innerHTML = +numbers.innerHTML - 1;
          if (numbers.innerHTML == 0) {
            numbers.innerHTML = '';
          }
        }
      })
    })
  }

  /* Показать больше компаний */
  function showMoreCompany() {
    const hiddenCompany = document.querySelector('.filter__checkbox-wrapper');
    const btnShowMore = document.querySelector('.show-hidden-company');
    btnShowMore.addEventListener('click', () => {
      if (hiddenCompany.classList.contains('filter__checkbox-wrapper')) {
        hiddenCompany.classList.remove('filter__checkbox-wrapper');
        btnShowMore.innerHTML = "Скрыть";
      } else {
        hiddenCompany.classList.add('filter__checkbox-wrapper');
        btnShowMore.innerHTML = "Посмотреть все";
      }
    })
  }


  /* Поиск по компаниям */

  function searchCompany() {
    const input = document.querySelector('.filter__search');
    const company = document.querySelectorAll('.checkbox__title-company');
    input.oninput = () => {
      let value = input.value.toLowerCase();
      if (value) {
        company.forEach(item => {
          if (item.innerText.toLowerCase().search(value) == -1) {
            item.parentElement.style.display = 'none';
          } else {
            item.parentElement.style.display = 'block';
          }
        })
      } else {
        company.forEach(item => {
          item.parentElement.style.display = 'block';
        })
      }
    }
  }

  /* Список сортировки */
  function sort() {
    const wrapper = document.querySelector('.catalog__sort-wrapper');
    const btn = document.querySelectorAll('.catalog__sort-wrapper button');
    if (document.documentElement.clientWidth < 640) {
      btn.forEach(item => {
        item.addEventListener('click', () => {
          wrapper.prepend(item);
        })
      })
    }
  }

  /* Сортировка карточек товара */

  function sortCard(button, atr) {
    const cards = document.querySelector('.catalog__page');
    const btn = document.querySelector(button);

    function insertAfter(elem, refElem) {
      return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
    }
    btn.addEventListener('click', () => {
      for (i = 0; i < cards.children.length; i++) {
        for (j = i; j < cards.children.length; j++) {
          if (+cards.children[i].getAttribute(atr) < +cards.children[j].getAttribute(atr)) {
            replaceNode = cards.replaceChild(cards.children[j], cards.children[i]);
            insertAfter(replaceNode, cards.children[i]);
          }
        }
      }
    })
  }


  /* Выпадающее меню */
  function showMenu() {
    const menuBtn = document.querySelector('.menu__btn');
    const menu = document.querySelector('.menu__list');
    const body = document.querySelector('body');
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('menu__btn-active');
      menu.classList.toggle('menu__list-active');
      if (menuBtn.classList.contains('menu__btn-active')) {
        body.style.cssText = `position: fixed;`;
      } else {
        body.style.position = "";
      }
    })
  }



  hideAside();
  hideFilter();
  addLike();
  showMoreCards();
  showMoreCompany();
  searchCompany();
  showNumberOfFilter('.number-company', '.checkbox__real-company');
  showNumberOfFilter('.number-price', '.checkbox__real-price');
  showNumberOfFilter('.number-volume', '.checkbox__real-volume');
  sort();
  sortCard('.catalog__sort-popular', 'data-like');
  sortCard('.catalog__sort-new', 'data-date');
  sortCard('.catalog__sort-price', 'data-price');
  pagination();
  showMenu();
})
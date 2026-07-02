import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// constantes do swiper de produtos
const SWIPER_SPACING = 17;

const SWIPER_BREAKPOINTS = {
  320: { slidesPerView: 1.3, spaceBetween: SWIPER_SPACING },
  640: { slidesPerView: 2.3, spaceBetween: SWIPER_SPACING },
  1024: { slidesPerView: 4, spaceBetween: SWIPER_SPACING },
  1280: { slidesPerView: 5, spaceBetween: SWIPER_SPACING },
};

document.addEventListener('DOMContentLoaded', () => {
  initMegamenu();
  initSearch();
  initSearchMobile();
  initProductsSwiper();
});

// menu estatico unificado
function initMegamenu() {
  const navMenuContainer = document.getElementById('nav-menu-container');
  const megamenuDropdown = document.getElementById('megamenu-dropdown');
  const triggerTodasCategorias = document.getElementById('trigger-todas-categorias');
  const triggerPrimeiroDepto = document.getElementById('trigger-primeiro-depto');

  const contentTodasCategorias = document.getElementById('content-todas-categorias');
  const contentPrimeiroDepto = document.getElementById('content-primeiro-depto');

  if (!navMenuContainer || !megamenuDropdown || !triggerTodasCategorias || !triggerPrimeiroDepto) return;

  // função p abrir o menu exibindo a visão correta manipulando opacidade
  function openMegamenu(view) {
    megamenuDropdown.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
    megamenuDropdown.classList.add('opacity-100', 'visible', 'pointer-events-auto');

    if (view === 'todas') {
      contentTodasCategorias.classList.remove('hidden');
      contentPrimeiroDepto.classList.add('hidden');
    } else if (view === 'depto') {
      contentPrimeiroDepto.classList.remove('hidden');
      contentTodasCategorias.classList.add('hidden');
    }
  }

  // eventos de entrada nos gatilhos
  triggerTodasCategorias.addEventListener('mouseenter', () => openMegamenu('todas'));
  triggerPrimeiroDepto.addEventListener('mouseenter', () => openMegamenu('depto'));

  // fecha o menu injetando de volta as classes de opacidade nula e ponteiro desativado
  navMenuContainer.addEventListener('mouseleave', () => {
    megamenuDropdown.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
    megamenuDropdown.classList.add('opacity-0', 'invisible', 'pointer-events-none');
    contentTodasCategorias.classList.add('hidden');
    contentPrimeiroDepto.classList.add('hidden');
  });

  // troca de abas entre categorias
  const deptLinks = document.querySelectorAll('.dept-link');
  const deptContents = document.querySelectorAll('.dept-content');

  deptLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const targetIndex = link.getAttribute('data-index');

      // altera apenas o peso da fonte e cor do texto, mantendo o fundo transparente
      deptLinks.forEach(l => {
        l.classList.remove('text-avanti-blue', 'font-bold');
        l.classList.add('text-gray-600', 'font-medium');
      });
      link.classList.add('text-avanti-blue', 'font-bold');
      link.classList.remove('text-gray-600', 'font-medium');

      deptContents.forEach(content => {
        if (content.getAttribute('data-content') === targetIndex) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });
}

// função de busca para desktop
function initSearch() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchResult = document.getElementById('search-result');
  const searchClearBtn = document.getElementById('search-clear-btn');

  if (!searchForm || !searchInput || !searchResult || !searchClearBtn) return;

  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      searchClearBtn.classList.remove('hidden');
    } else {
      searchClearBtn.classList.add('hidden');
      searchResult.classList.add('hidden');
    }
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchClearBtn.classList.add('hidden');
    searchResult.classList.add('hidden');
    searchInput.focus();
  });

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const queryText = searchInput.value.trim();

    if (queryText !== '') {
      searchResult.textContent = `Você buscou por: '${queryText}'`;
      searchResult.classList.remove('hidden');
    } else {
      searchResult.classList.add('hidden');
    }
  });
}

// função de busca para mobile
function initSearchMobile() {
  const searchForm = document.getElementById('search-form-mobile');
  const searchInput = document.getElementById('search-input-mobile');
  const searchResult = document.getElementById('search-result-mobile');

  if (!searchForm || !searchInput || !searchResult) {
    console.warn('Busca mobile: elementos não encontrados');
    return;
  }

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const queryText = searchInput.value.trim();
    if (queryText !== '') {
      searchResult.textContent = `Você buscou por: '${queryText}'`;
      searchResult.classList.remove('hidden');
    } else {
      searchResult.classList.add('hidden');
    }
  });

  // esconder resultado se o input for esvaziado
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
      searchResult.classList.add('hidden');
    }
  });
}

// swiper de produtos (lançamentos)
function initProductsSwiper() {
  const swiperEls = document.querySelectorAll('.products-swiper');
  if (!swiperEls.length) return;

  swiperEls.forEach(swiperEl => {
    const wrapper = swiperEl.parentElement;
    const container = wrapper.parentElement;

    new Swiper(swiperEl, {
      modules: [Navigation, Pagination],
      slidesPerView: 'auto',
      spaceBetween: SWIPER_SPACING,
      navigation: {
        nextEl: swiperEl.parentElement.querySelector('.swiper-button-next-custom'),
        prevEl: swiperEl.parentElement.querySelector('.swiper-button-prev-custom'),
      },
      pagination: {
        el: swiperEl.querySelector('.swiper-pagination'),
        clickable: true,
      },
      breakpoints: SWIPER_BREAKPOINTS,
    });
  });
}
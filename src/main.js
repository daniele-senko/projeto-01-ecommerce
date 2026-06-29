document.addEventListener('DOMContentLoaded', () => {
  // menu estatico unificado
  const navMenuContainer = document.getElementById('nav-menu-container');
  const megamenuDropdown = document.getElementById('megamenu-dropdown');
  const triggerTodasCategorias = document.getElementById('trigger-todas-categorias');
  const triggerPrimeiroDepto = document.getElementById('trigger-primeiro-depto');
  
  const contentTodasCategorias = document.getElementById('content-todas-categorias');
  const contentPrimeiroDepto = document.getElementById('content-primeiro-depto');

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


  // campo de busca
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchResult = document.getElementById('search-result');
  const searchClearBtn = document.getElementById('search-clear-btn');

  if (searchForm && searchInput && searchResult && searchClearBtn) {
    
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
});
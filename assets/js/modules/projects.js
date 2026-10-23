/**
 * PROJETOS — monta o destaque (JARVIS), os cards com filtro e a
 * lista de estudos, a partir de data/projects.js.
 */

const Projects = (() => {
  const repoUrl = (repo, path) =>
    `${PROFILE.links.github}/${repo}${path ? `/tree/main/${path}` : ''}`;

  /** Cria <li> para cada item de uma lista. */
  function fillList(list, items) {
    items.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      list.append(li);
    });
  }

  /* ---------- Capas desenhadas ---------- */

  /** Gráfico de f(x) = 4 + x·cos(x) desenhado em SVG. */
  function curveSvg() {
    const points = [];
    for (let x = 0; x <= 12; x += 0.1) {
      const y = 4 + x * Math.cos(x);
      points.push(`${(x / 12) * 300},${80 - y * 5}`);
    }
    return `
      <svg viewBox="0 0 300 160" aria-hidden="true">
        <line x1="0" y1="80" x2="300" y2="80" stroke="#243b66" stroke-width="1.5"/>
        <polyline points="${points.join(' ')}" fill="none" stroke="#4fe3e0" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="${(2.4 / 12) * 300}" cy="80" r="5" fill="#ffc24b"/>
        <circle cx="${(5.8 / 12) * 300}" cy="80" r="5" fill="#ffc24b"/>
        <circle cx="${(8.7 / 12) * 300}" cy="80" r="5" fill="#ffc24b"/>
      </svg>`;
  }

  /** Mapa estilizado com pinos de acessibilidade. */
  function a11ySvg() {
    const pins = [[60, 70], [120, 40], [170, 95], [230, 55], [265, 110]];
    return `
      <svg viewBox="0 0 300 160" aria-hidden="true">
        <path d="M0 125 C 60 105, 110 140, 170 118 S 260 100, 300 120" fill="none" stroke="#4fe3e0" stroke-width="2" stroke-dasharray="6 6" opacity=".6"/>
        ${pins
          .map(
            ([x, y]) => `
          <g transform="translate(${x} ${y})">
            <path d="M0 18 C -9 8, -11 2, -11 -3 A 11 11 0 0 1 11 -3 C 11 2, 9 8, 0 18Z" fill="#ffc24b"/>
            <circle cx="0" cy="-3" r="4.5" fill="#0a1628"/>
          </g>`
          )
          .join('')}
      </svg>`;
  }

  function buildCover(cover) {
    const wrap = document.createElement('div');
    wrap.className = 'cover';
    if (cover.kind === 'formula') {
      wrap.innerHTML = `<p class="cover__formula"></p>`;
      wrap.firstElementChild.textContent = cover.text;
    } else if (cover.kind === 'curve') {
      wrap.innerHTML = `${curveSvg()}<span class="cover__label"></span>`;
      wrap.querySelector('.cover__label').textContent = cover.text;
    } else if (cover.kind === 'a11y') {
      wrap.innerHTML = `${a11ySvg()}<span class="cover__label">Orla da Atalaia, Aracaju</span>`;
    }
    return wrap;
  }

  /* ---------- Destaque ---------- */

  function renderFeatured(root, project) {
    root.innerHTML = `
      <div class="featured__content">
        <span class="featured__label">Projeto principal</span>
        <h3 class="featured__title"></h3>
        <p class="featured__subtitle"></p>
        <p class="featured__summary"></p>
        <ul class="featured__highlights"></ul>
        <ul class="featured__facts"></ul>
        <ul class="tags" aria-label="Tecnologias"></ul>
        <div class="featured__actions">
          <a class="btn btn--primary" target="_blank" rel="noopener noreferrer">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-github" /></svg>
            Ver código do JARVIS
          </a>
        </div>
      </div>
      <div class="transcript" aria-label="Exemplos de comandos de voz do JARVIS">
        <div><p class="transcript__cmd">abrir notepad</p><p class="transcript__res">Abre o aplicativo pelo nome ou pelo PATH.</p></div>
        <div><p class="transcript__cmd">ler site wikipedia.org</p><p class="transcript__res">Extrai o texto da página com Playwright.</p></div>
        <div><p class="transcript__cmd">ler imagem print.png</p><p class="transcript__res">Lê o texto da imagem com OCR local.</p></div>
        <div><p class="transcript__cmd">planejar estudo de Java</p><p class="transcript__res">Monta um plano usando o modelo de IA configurado.</p></div>
        <div><p class="transcript__cmd">próxima música</p><p class="transcript__res">Envia a tecla de mídia do Windows.</p></div>
      </div>`;

    root.querySelector('.featured__title').textContent = project.title;
    root.querySelector('.featured__subtitle').textContent = project.subtitle;
    root.querySelector('.featured__summary').textContent = project.summary;
    root.querySelector('.featured__actions a').href = repoUrl(project.repo);
    fillList(root.querySelector('.featured__highlights'), project.highlights);
    fillList(root.querySelector('.tags'), project.tags);

    const facts = root.querySelector('.featured__facts');
    project.facts.forEach(({ value, label }) => {
      const li = document.createElement('li');
      li.innerHTML = '<strong></strong><span></span>';
      li.querySelector('strong').textContent = value;
      li.querySelector('span').textContent = label;
      facts.append(li);
    });

    // Luz que segue o mouse (só em telas com mouse)
    if (window.matchMedia('(hover: hover)').matches) {
      root.addEventListener('pointermove', event => {
        const rect = root.getBoundingClientRect();
        root.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        root.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    }
  }

  /* ---------- Cards ---------- */

  function createCard(template, project) {
    const card = template.content.firstElementChild.cloneNode(true);
    const url = repoUrl(project.repo, project.path);
    card.dataset.category = project.category.join(' ');

    const media = card.querySelector('[data-field="media"]');
    if (project.image) {
      const img = document.createElement('img');
      img.src = `assets/img/projects/${project.image}`;
      img.alt = '';
      img.loading = 'lazy';
      img.width = 960;
      img.height = 600;
      media.append(img);
    } else if (project.cover) {
      media.append(buildCover(project.cover));
    }

    const title = card.querySelector('[data-field="title"]');
    title.textContent = project.title;
    title.href = url;
    title.setAttribute('aria-label', `${project.title} (abre o repositório no GitHub)`);

    card.querySelector('[data-field="summary"]').textContent = project.summary;
    fillList(card.querySelector('[data-field="highlights"]'), project.highlights);
    fillList(card.querySelector('[data-field="tags"]'), project.tags);
    return card;
  }

  function setupFilters(grid) {
    const buttons = document.querySelectorAll('[data-filter]');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        buttons.forEach(b => {
          const active = b === button;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });

        grid.querySelectorAll('.project').forEach(card => {
          const show = filter === 'todos' || card.dataset.category.split(' ').includes(filter);
          card.classList.toggle('is-hidden', !show);
          card.classList.remove('is-entering');
          if (show) {
            void card.offsetWidth; // reinicia a animação de entrada
            card.classList.add('is-entering');
          }
        });
      });
    });
  }

  /* ---------- Estudos ---------- */

  function renderStudies(list, studies) {
    studies.forEach(study => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a target="_blank" rel="noopener noreferrer">
          <strong></strong><span></span>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-external" /></svg>
        </a>`;
      const link = li.querySelector('a');
      link.href = repoUrl(study.repo);
      li.querySelector('strong').textContent = study.title;
      li.querySelector('span').textContent = study.summary;
      list.append(li);
    });
  }

  function init() {
    const featured = document.querySelector('[data-featured]');
    const grid = document.querySelector('[data-projects]');
    const template = document.getElementById('project-card-template');
    const studies = document.querySelector('[data-studies]');

    if (featured) renderFeatured(featured, FEATURED_PROJECT);

    if (grid && template) {
      const fragment = document.createDocumentFragment();
      PROJECTS.forEach(project => fragment.append(createCard(template, project)));
      grid.replaceChildren(fragment);
      setupFilters(grid);
    }

    if (studies) renderStudies(studies, STUDIES);
  }

  return { init };
})();

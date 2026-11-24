/**
 * PROJETOS — monta o destaque (JARVIS), os cards com filtro e a
 * lista de outros projetos, a partir de data/projects.js.
 */

const Projects = (() => {
  const repoUrl = repo => `${PROFILE.links.github}/${repo}`;

  /** Cria <li> para cada item de uma lista. */
  function fillList(list, items) {
    items.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      list.append(li);
    });
  }

  /** Cria um elemento com classe e texto (seguro: usa textContent). */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /** Botão de ação com ícone (Ver online / Código). */
  function actionLink(href, label, icon, title, extraClass = '') {
    const a = el('a', `project__action ${extraClass}`.trim());
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = label;
    a.setAttribute('aria-label', `${label}: ${title}`);
    a.innerHTML = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#${icon}" /></svg>`;
    a.append(label);
    return a;
  }

  /* ---------- Capas desenhadas ---------- */

  /** Mapa estilizado com pinos de acessibilidade. */
  function a11ySvg() {
    const pins = [[60, 70], [120, 40], [170, 95], [230, 55], [265, 110]];
    return `
      <svg viewBox="0 0 300 160" aria-hidden="true">
        <path d="M0 125 C 60 105, 110 140, 170 118 S 260 100, 300 120" fill="none" stroke="#ff6b1a" stroke-width="2" stroke-dasharray="6 6" opacity=".6"/>
        ${pins
          .map(
            ([x, y]) => `
          <g transform="translate(${x} ${y})">
            <path d="M0 18 C -9 8, -11 2, -11 -3 A 11 11 0 0 1 11 -3 C 11 2, 9 8, 0 18Z" fill="#ff6b1a"/>
            <circle cx="0" cy="-3" r="4.5" fill="#09090b"/>
          </g>`
          )
          .join('')}
      </svg>`;
  }

  function buildCover(cover) {
    const wrap = el('div', `cover cover--${cover.kind}`);

    if (cover.kind === 'formula') {
      wrap.append(el('p', 'cover__formula', cover.text));
    } else if (cover.kind === 'a11y') {
      wrap.innerHTML = `${a11ySvg()}<span class="cover__label">Orla da Atalaia, Aracaju</span>`;
    } else if (cover.kind === 'metric') {
      const box = el('div', 'cover__metric');
      box.append(el('span', 'cover__from', cover.from));
      box.append(el('span', 'cover__arrow', '→'));
      box.append(el('span', 'cover__to', cover.to));
      wrap.append(box, el('span', 'cover__label', cover.label));
    } else if (cover.kind === 'code') {
      const win = el('div', 'code-window');
      const bar = el('div', 'code-window__bar');
      bar.innerHTML = '<i></i><i></i><i></i>';
      bar.append(el('span', null, cover.title));
      const body = el('div', 'code-window__body');
      cover.lines.forEach(([type, head, text]) => {
        const line = el('p', `code-line code-line--${type}`);
        line.append(el('b', null, head), el('span', null, text));
        body.append(line);
      });
      win.append(bar, body);
      wrap.append(win);
    }
    return wrap;
  }

  /* ---------- Destaque ---------- */

  function renderFeatured(root, project) {
    root.innerHTML = `
      <div class="featured__content">
        <span class="featured__label"><span class="pulse" aria-hidden="true"></span> Projeto principal · IA aplicada</span>
        <h3 class="featured__title"></h3>
        <p class="featured__subtitle"></p>
        <p class="featured__summary"></p>
        <ul class="featured__highlights"></ul>
        <ul class="featured__facts"></ul>
        <ul class="tags" aria-label="Tecnologias"></ul>
        <div class="featured__actions">
          <a class="btn btn--primary" data-demo target="_blank" rel="noopener noreferrer">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-play" /></svg>
            Experimentar online
          </a>
          <a class="btn btn--outline" data-code target="_blank" rel="noopener noreferrer">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-github" /></svg>
            Ver código
          </a>
        </div>
      </div>
      <div class="featured__side">
        <a class="featured__shot" data-demo target="_blank" rel="noopener noreferrer" aria-label="Abrir a demonstração do JARVIS">
          <img src="assets/img/projects/jarvis.jpg" alt="Página do JARVIS com o título Fale. O JARVIS faz." width="800" height="500" loading="lazy" />
        </a>
        <div class="transcript" aria-label="Exemplo de conversa com o JARVIS">
          <p class="transcript__you">coloca o volume em 30 e tira um print</p>
          <p class="transcript__bot">Volume ajustado para 30%. Print salvo em Imagens\\Jarvis.</p>
          <p class="transcript__you">me lembra em 10 minutos de tirar o bolo do forno</p>
          <p class="transcript__bot">Combinado. Te aviso às 10:31.</p>
          <p class="transcript__you">desliga o computador em 30 minutos</p>
          <p class="transcript__bot">Confirma: desligar em 30 minutos? Diga sim ou não.</p>
        </div>
      </div>`;

    root.querySelector('.featured__title').textContent = project.title;
    root.querySelector('.featured__subtitle').textContent = project.subtitle;
    root.querySelector('.featured__summary').textContent = project.summary;
    root.querySelectorAll('[data-demo]').forEach(a => (a.href = project.demo));
    root.querySelector('[data-code]').href = repoUrl(project.repo);
    fillList(root.querySelector('.featured__highlights'), project.highlights);
    fillList(root.querySelector('.tags'), project.tags);

    const facts = root.querySelector('.featured__facts');
    project.facts.forEach(({ value, label }) => {
      const li = document.createElement('li');
      li.append(el('strong', null, value), el('span', null, label));
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

  function createCard(template, project, index) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.category = project.category.join(' ');

    const media = card.querySelector('[data-field="media"]');
    if (project.image) {
      const img = document.createElement('img');
      img.src = `assets/img/projects/${project.image}`;
      img.alt = `Captura de tela do projeto ${project.title}`;
      img.loading = 'lazy';
      img.width = 800;
      img.height = 500;
      media.append(img);
    } else if (project.cover) {
      media.append(buildCover(project.cover));
    }

    if (project.team) media.append(el('span', 'project__badge', 'Em equipe'));
    if (project.demo) media.append(el('span', 'project__badge project__badge--live', 'Online'));

    card.querySelector('[data-field="kind"]').textContent = project.kind;
    card.querySelector('[data-field="num"]').textContent = `/${String(index + 1).padStart(2, '0')}`;
    card.querySelector('[data-field="title"]').textContent = project.title;
    card.querySelector('[data-field="summary"]').textContent = project.summary;
    fillList(card.querySelector('[data-field="proofs"]'), project.proofs);
    card.querySelector('[data-field="stack"]').textContent = project.tags.join(' · ');
    card.querySelector('[data-field="result"]').textContent = project.result;

    const actions = card.querySelector('[data-field="actions"]');
    if (project.demo) {
      actions.append(actionLink(project.demo, 'Ver online', 'i-external', project.title, 'project__action--live'));
    }
    actions.append(actionLink(repoUrl(project.repo), 'Código', 'i-github', project.title));
    return card;
  }

  function setupFilters(grid) {
    const buttons = document.querySelectorAll('[data-filter]');

    // Mostra quantos projetos há em cada filtro
    buttons.forEach(button => {
      const filter = button.dataset.filter;
      const count =
        filter === 'todos'
          ? PROJECTS.length
          : PROJECTS.filter(p => p.category.includes(filter)).length;
      button.append(el('span', 'filter__count', String(count)));
    });

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

  /* ---------- Outros projetos ---------- */

  function renderStudies(list, studies) {
    studies.forEach(study => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a target="_blank" rel="noopener noreferrer">
          <strong></strong><span></span>
          <em></em>
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-external" /></svg>
        </a>`;
      const link = li.querySelector('a');
      link.href = study.demo || repoUrl(study.repo);
      li.querySelector('strong').textContent = study.title;
      li.querySelector('span').textContent = study.summary;
      li.querySelector('em').textContent = study.demo ? 'online' : 'código';
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
      PROJECTS.forEach((project, index) => fragment.append(createCard(template, project, index)));
      grid.replaceChildren(fragment);
      setupFilters(grid);
    }

    if (studies) renderStudies(studies, STUDIES);
  }

  return { init };
})();

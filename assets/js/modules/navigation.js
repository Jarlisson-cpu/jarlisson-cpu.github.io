/**
 * NAVEGAÇÃO — menu mobile, link ativo, header ao rolar e barra de progresso.
 */

const Navigation = (() => {
  function setupMenu() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    const setOpen = open => {
      nav.classList.toggle('is-open', open);
      header.classList.toggle('menu-is-open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => e.key === 'Escape' && setOpen(false));
    window.matchMedia('(min-width: 721px)').addEventListener('change', () => setOpen(false));
  }

  function setupActiveLink() {
    const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    if (!links.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          links.forEach(link =>
            link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`)
          );
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }

  function setupScrollEffects() {
    const header = document.querySelector('.site-header');
    const progress = document.querySelector('.scroll-progress');
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header?.classList.toggle('is-scrolled', window.scrollY > 10);
      progress?.style.setProperty('--progress', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) requestAnimationFrame(update);
        ticking = true;
      },
      { passive: true }
    );
    update();
  }

  function init() {
    setupMenu();
    setupActiveLink();
    setupScrollEffects();
  }

  return { init };
})();

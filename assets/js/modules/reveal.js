/**
 * REVEAL — elementos com data-reveal (up, left, right, scale, clip)
 * aparecem quando entram na tela. Filhos de [data-stagger] entram em
 * cascata. Sem JS ou com "reduzir movimento", tudo já aparece normal.
 */

const Reveal = (() => {
  const reduced = window.MOTION_OK === false;
  let observer = null;
  // Títulos em "cortina" ficam com área visível zero enquanto escondidos,
  // então quem é observado é o elemento pai deles
  const targets = new Map();

  function observe(items) {
    items.forEach(item => {
      const watched = item.dataset.reveal === 'clip' ? item.parentElement : item;
      if (!targets.has(watched)) targets.set(watched, []);
      targets.get(watched).push(item);
      observer?.observe(watched);
    });
  }

  function init() {
    if (reduced || !('IntersectionObserver' in window)) return;

    document.documentElement.classList.add('has-reveal');

    // Cascata: cada filho ganha um atraso maior que o anterior
    document.querySelectorAll('[data-stagger]').forEach(group => {
      [...group.children].forEach((child, i) => child.style.setProperty('--delay', `${i * 70}ms`));
    });

    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          (targets.get(entry.target) || [entry.target]).forEach(el => el.classList.add('is-visible'));
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    observe(document.querySelectorAll('[data-reveal]'));
  }

  return { init, observe };
})();

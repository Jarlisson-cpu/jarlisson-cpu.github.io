/**
 * DEPOIMENTOS — monta a seção a partir de data/testimonials.js.
 * Sem depoimentos, a seção continua escondida.
 */

const Testimonials = (() => {
  const initials = name =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
      .join('');

  function card(item) {
    const li = document.createElement('li');
    li.className = 'testimonial';
    li.dataset.reveal = 'up';
    li.innerHTML = `
      <span class="testimonial__mark" aria-hidden="true">“</span>
      <blockquote class="testimonial__text"></blockquote>
      <footer class="testimonial__author">
        <span class="testimonial__avatar" aria-hidden="true"></span>
        <span><strong></strong><small></small></span>
      </footer>`;
    li.querySelector('blockquote').textContent = item.text;
    li.querySelector('.testimonial__avatar').textContent = initials(item.name);
    li.querySelector('small').textContent = item.role || '';

    const name = li.querySelector('strong');
    if (item.link) {
      const a = document.createElement('a');
      a.href = item.link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = item.name;
      name.append(a);
    } else {
      name.textContent = item.name;
    }
    return li;
  }

  function init() {
    const section = document.querySelector('[data-testimonials]');
    const list = document.querySelector('[data-testimonials-list]');
    if (!section || !list || typeof TESTIMONIALS === 'undefined' || !TESTIMONIALS.length) return;

    TESTIMONIALS.forEach((item, i) => {
      const li = card(item);
      li.style.setProperty('--delay', `${i * 80}ms`);
      list.append(li);
    });
    section.hidden = false;
    section.dataset.dot = 'Depoimentos';
  }

  return { init };
})();

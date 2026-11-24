/**
 * MAIN — ponto de entrada. Cada módulo cuida de uma parte da página.
 */

Projects.init();
Testimonials.init();
Effects.init();
Navigation.init();
Reveal.init();
GitHubStats.init();
ContactForm.init();

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/**
 * MAIN — ponto de entrada. Cada módulo cuida de uma parte da página.
 */

Projects.init();
ConsoleJarvis.init();
Navigation.init();
ContactForm.init();

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

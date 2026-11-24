/**
 * GITHUB STATS — atualiza o número de repositórios públicos direto da
 * API do GitHub. Se a API falhar, fica o número escrito no HTML.
 */

const GitHubStats = (() => {
  async function init() {
    const targets = document.querySelectorAll('[data-repo-count]');
    if (!targets.length) return;

    try {
      const response = await fetch(`https://api.github.com/users/${PROFILE.githubUser}`);
      if (!response.ok) return;
      const { public_repos: count } = await response.json();
      if (Number.isInteger(count) && count > 0) {
        targets.forEach(el => {
          el.textContent = count;
          if (el.dataset.count) el.dataset.count = count;
        });
      }
    } catch {
      /* sem internet ou limite da API: mantém o valor padrão */
    }
  }

  return { init };
})();

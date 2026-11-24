/**
 * PROJETOS — conteúdo tirado dos READMEs dos repositórios.
 *
 * Campos:
 *   repo      → nome exato do repositório no GitHub
 *   title     → nome exibido no card
 *   kind      → categoria curta exibida no topo do card
 *   summary   → uma ou duas frases sobre o projeto
 *   proofs    → três provas curtas (viram selos)
 *   result    → o resultado em uma linha
 *   tags      → tecnologias
 *   category  → 'backend' | 'dados' | 'web' | 'python' (usado nos filtros)
 *   demo      → (opcional) link da versão online
 *   team      → (opcional) true quando foi feito em equipe
 *   image     → (opcional) captura de tela em assets/img/projects/
 *   cover     → (opcional) capa desenhada quando não há imagem:
 *               { kind: 'code', title: 'arquivo', lines: ['...'] }
 *               { kind: 'metric', from: '...', to: '...', label: '...' }
 *               { kind: 'formula', text: '...' }
 *               { kind: 'a11y' }
 */

const FEATURED_PROJECT = {
  repo: 'jarvis-assistente',
  demo: 'https://jarlisson-cpu.github.io/jarvis-assistente/',
  title: 'JARVIS',
  subtitle: 'Você fala. Ele faz.',
  summary:
    'Assistente pessoal por voz para Windows. Ajusta volume e brilho, abre apps e sites, tira print, cria lembretes e conversa sobre qualquer assunto usando Claude, GPT ou Gemini. Tudo que é perigoso pede confirmação antes.',
  highlights: [
    'Integração com 3 provedores de IA, com execução de ações por ferramentas (tool use)',
    'Usuários com senha (PBKDF2-SHA256 + sal), permissões por ação e limite de tentativas',
    'Voz offline com Vosk, além de terminal, app desktop e interface web com login',
    'Funciona sem chave de IA: sugere o comando mais parecido quando não entende',
    'Arquitetura modular em plugins, coberta por testes automatizados com pytest'
  ],
  facts: [
    { value: '90+', label: 'módulos Python' },
    { value: '26', label: 'arquivos de teste' },
    { value: '3', label: 'provedores de IA' }
  ],
  tags: ['Python', 'Claude · GPT · Gemini', 'Vosk', 'Playwright', 'OCR', 'pytest']
};

const PROJECTS = [
  {
    repo: 'biblioteca-api',
    kind: 'Back-end · Java',
    title: 'Biblioteca API',
    summary:
      'API REST para o acervo e os empréstimos de uma biblioteca: exemplares, devoluções e multa por atraso.',
    proofs: ['Regras configuráveis', 'Erros RFC 9457', 'CI no GitHub Actions'],
    tags: ['Java 21', 'Spring Boot', 'JPA', 'JUnit', 'Mockito'],
    result: 'Regra de negócio testada antes de chegar em quem usa',
    category: ['backend'],
    cover: {
      kind: 'code',
      title: 'EmprestimoController.java',
      lines: [
        ['get', 'GET', '/livros?busca='],
        ['post', 'POST', '/livros'],
        ['post', 'POST', '/emprestimos'],
        ['put', 'PATCH', '/emprestimos/{id}/devolucao'],
        ['get', 'GET', '/emprestimos/atrasados']
      ]
    }
  },
  {
    repo: 'oficina-mecanica-banco-de-dados',
    kind: 'Banco de dados · Equipe',
    title: 'Oficina Mecânica',
    summary:
      'Banco PostgreSQL para as ordens de serviço de uma oficina. Cada regra de negócio tem um teste executado e uma evidência.',
    proofs: ['300 mil OS', '5 triggers', '34 testes'],
    tags: ['PostgreSQL', 'SQL', 'Python'],
    result: 'Busca de histórico 120× mais rápida com o índice certo',
    category: ['dados'],
    team: true,
    cover: { kind: 'metric', from: '30,6 ms', to: '0,25 ms', label: 'busca de histórico por placa' }
  },
  {
    repo: 'controle-de-financas',
    demo: 'https://jarlisson-cpu.github.io/controle-de-financas/',
    kind: 'Web · PWA',
    title: 'Minhas Finanças',
    summary:
      'Controle financeiro pessoal: lançamentos, contas, orçamentos por categoria, metas e compras parceladas.',
    proofs: ['Funciona offline', 'Gráficos mensais', 'Exporta CSV e JSON'],
    tags: ['JavaScript', 'PWA', 'Service Worker'],
    result: 'O mês inteiro numa tela, sem depender de servidor',
    category: ['web'],
    image: 'financas.jpg'
  },
  {
    repo: 'sistema-reservas-academia',
    kind: 'Back-end · Python',
    title: 'Academia Power',
    summary:
      'Reservas de aulas com vagas por horário. O front-end conversa com uma API REST em Flask que salva em SQLite.',
    proofs: ['Vagas em tempo real', 'Valida CPF', 'Painel com filtros'],
    tags: ['Python', 'Flask', 'SQLite', 'JavaScript'],
    result: 'Aula lotada não aceita reserva: a API recusa',
    category: ['backend', 'python', 'web'],
    image: 'academia.jpg'
  },
  {
    repo: 'cookiecutter_java',
    kind: 'Ferramenta · Java · Equipe',
    title: 'JMol Project Generator',
    summary:
      'Gerador de projetos Maven inspirado no Cookiecutter: poucas respostas e o projeto sai pronto, com testes.',
    proofs: ['Interface gráfica', 'CLI com JSON', 'Licença e CI prontos'],
    tags: ['Java 21', 'Maven', 'JUnit'],
    result: 'Projeto novo que compila e passa nos testes de primeira',
    category: ['backend'],
    team: true,
    cover: {
      kind: 'code',
      title: 'terminal',
      lines: [
        ['cmd', '$', 'java -jar jmol.jar generate spec.json'],
        ['out', '✓', 'projeto-cientifico/ criado'],
        ['cmd', '$', 'mvn test'],
        ['ok', '✓', 'BUILD SUCCESS']
      ]
    }
  },
  {
    repo: 'meu-site',
    demo: 'https://jarlisson-cpu.github.io/meu-site/trabalho1/',
    kind: 'Acessibilidade · PWA',
    title: 'Acessibilidade Orla da Atalaia',
    summary:
      'Mapa dos pontos acessíveis da Orla de Aracaju: rampas, banheiros adaptados, piso tátil, Braille e Libras.',
    proofs: ['Leitura por voz', 'Alto contraste', 'Funciona offline'],
    tags: ['JavaScript', 'Leaflet', 'WCAG'],
    result: 'Um passeio na orla planejado por quem mais precisa',
    category: ['web'],
    cover: { kind: 'a11y' }
  },
  {
    repo: 'bubble-sort-java',
    kind: 'Algoritmos · Java · Equipe',
    title: '1 milhão de registros',
    summary:
      'Lê 1.000.000 de empresas de um arquivo, ordena por valor de mercado com Bubble Sort e grava o resultado.',
    proofs: ['1.000.000 de linhas', '9 de 9 testes', 'Windows e Linux'],
    tags: ['Java', 'Estrutura de dados'],
    result: 'Um milhão de empresas em ordem, com teste provando',
    category: ['dados'],
    team: true,
    cover: { kind: 'formula', text: 'O(n²) · 1.000.000 registros' }
  },
  {
    repo: 'mario-jump-game',
    demo: 'https://jarlisson-cpu.github.io/mario-jump-game/',
    kind: 'Jogo · JavaScript',
    title: 'Mario Jump',
    summary:
      'Jogo de pular canos em JavaScript puro: física de pulo, níveis, recorde salvo e controle por toque.',
    proofs: ['Game loop', 'Sons via Web Audio', 'Joga no celular'],
    tags: ['JavaScript', 'CSS'],
    result: 'Começou como exercício de mentoria, virou jogo completo',
    category: ['web'],
    image: 'mario.jpg'
  },
  {
    repo: 'matrizes-inversa-adjunta-sistemas-lineares',
    kind: 'Matemática · Python',
    title: 'Matrizes e sistemas lineares',
    summary:
      'Determinante por Laplace, adjunta, inversa e Gauss-Jordan com pivoteamento, em Python puro.',
    proofs: ['Sem NumPy', 'Gauss-Jordan', 'Classifica o sistema'],
    tags: ['Python', 'Álgebra linear'],
    result: 'Álgebra linear implementada do zero',
    category: ['python', 'dados'],
    cover: { kind: 'formula', text: 'A⁻¹ = adj(A) / det(A)' }
  }
];

/** Outros projetos e estudos: aparecem em lista compacta. */
const STUDIES = [
  { repo: 'abertura-fechamento-cofres', title: 'Métodos numéricos', summary: 'Bissecção, Newton-Raphson e Secantes comparados em Python.' },
  { repo: 'tela-cancelamento-engplay', title: 'Eng Play — retenção', summary: 'Fluxo de cancelamento de assinatura feito na residência Eng Play.', demo: 'https://jarlisson-cpu.github.io/tela-cancelamento-engplay/' },
  { repo: 'harpia-bank', title: 'Harpia Bank', summary: 'Landing page e login de um banco digital a partir de um protótipo.', demo: 'https://jarlisson-cpu.github.io/harpia-bank/' },
  { repo: 'Laboratorio', title: 'Laboratório pytest', summary: 'Testes unitários de funções de e-commerce, incluindo casos de erro.' },
  { repo: 'DuckPetGame', title: 'DuckPetGame', summary: 'Pet virtual no terminal com loja, economia e minigame em Python.' },
  { repo: 'pagina-vaga-frontend', title: 'Página de vaga', summary: 'Página de vaga para desenvolvedor front-end com formulário.', demo: 'https://jarlisson-cpu.github.io/pagina-vaga-frontend/' },
  { repo: 'primeiro-portfolio', title: 'Primeiro portfólio', summary: 'A primeira versão deste site, com mini-projetos em JavaScript.', demo: 'https://jarlisson-cpu.github.io/primeiro-portfolio/' }
];

/**
 * PROJETOS — conteúdo tirado dos READMEs dos repositórios.
 *
 * Campos:
 *   repo      → nome exato do repositório no GitHub
 *   path      → (opcional) subpasta dentro do repo
 *   title     → nome exibido no card
 *   summary   → uma ou duas frases sobre o projeto
 *   highlights→ o que o projeto faz de mais interessante
 *   tags      → tecnologias
 *   category  → 'web' | 'python' | 'matematica' (usado nos filtros)
 *   image     → (opcional) captura de tela em assets/img/projects/
 *   cover     → (opcional) capa desenhada em CSS quando não há imagem:
 *               { kind: 'formula', text: '...' }
 */

const FEATURED_PROJECT = {
  repo: 'Javis-jz',
  title: 'JARVIS',
  subtitle: 'Assistente de IA pessoal para Windows',
  summary:
    'Inspirado no JARVIS da Marvel: você fala, ele executa. Controle por voz offline, memória de longo prazo, vários modelos de IA e um sistema de plugins para automatizar o computador.',
  highlights: [
    'Voz offline com Vosk e palavra de ativação configurável',
    'Memória de longo prazo com SQLite e ChromaDB',
    'Plugins: abrir apps, ler sites, OCR em imagens, mídia, arquivos',
    'Interface gráfica em Tkinter e dashboard web com token e TLS',
    'Arquitetura modular em fases, com testes automatizados em pytest'
  ],
  facts: [
    { value: '72', label: 'arquivos Python' },
    { value: '19', label: 'arquivos de teste' },
    { value: '10', label: 'fases implementadas' }
  ],
  tags: ['Python', 'SQLite', 'ChromaDB', 'Vosk', 'Playwright', 'pytest']
};

const PROJECTS = [
  {
    repo: 'ACADEMIA--RESERVAS',
    title: 'Academia Power',
    summary:
      'Sistema web de reservas de aulas (Spinning, Musculação, Yoga) que controla quantos alunos cabem em cada horário.',
    highlights: ['API REST em Flask', 'Checagem de conflito de horário', 'CRUD com SQLite'],
    tags: ['Python', 'Flask', 'SQLite', 'JavaScript'],
    category: ['web', 'python'],
    image: 'academia.jpg'
  },
  {
    repo: 'meu-site',
    title: 'Acessibilidade Orla da Atalaia',
    summary:
      'PWA com mapa dos pontos acessíveis da Orla de Aracaju: rampas, banheiros adaptados, piso tátil, Braille e Libras.',
    highlights: ['Alto contraste e leitura por voz', 'Navegação por teclado e ARIA', 'Funciona offline'],
    tags: ['JavaScript', 'Leaflet', 'PWA', 'WCAG'],
    category: ['web'],
    cover: { kind: 'a11y' }
  },
  {
    repo: 'HAPIA-BANK',
    title: 'Harpia Bank',
    summary:
      'Landing page e tela de login de um banco digital fictício, construídas a partir de um protótipo de UI.',
    highlights: ['Fidelidade ao protótipo', 'Múltiplas páginas', 'Flexbox'],
    tags: ['HTML', 'CSS'],
    category: ['web'],
    image: 'harpia.jpg'
  },
  {
    repo: 'tela-de-cancelamento-eng-play',
    title: 'Eng Play — fluxo de cancelamento',
    summary:
      'Telas de retenção de assinatura feitas na residência Eng Play: entende o motivo do aluno e oferece uma solução antes dele sair.',
    highlights: ['Fluxo em 4 telas', 'Seleção múltipla com JS', 'Botão liberado com aria-disabled'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: ['web'],
    image: 'engplay.jpg'
  },
  {
    repo: 'DETERMINA-O-DE-MATRIZES-INVERSA-E-ADJUNTAS-E-SISTEMAS-LINEARES',
    title: 'Matrizes e sistemas lineares',
    summary:
      'Determinante por Laplace, matriz adjunta, inversa e Gauss-Jordan com pivoteamento, tudo em Python puro, sem NumPy.',
    highlights: ['Recursão', 'Classifica o sistema (única, infinitas, nenhuma)', 'Tolerância numérica'],
    tags: ['Python', 'Álgebra linear'],
    category: ['python', 'matematica'],
    cover: { kind: 'formula', text: 'A⁻¹ = adj(A) / det(A)' }
  },
  {
    repo: 'ABERTURA-E-FECHAMENTO-DE-COFRES',
    title: 'Métodos numéricos',
    summary:
      'Encontra raízes de f(x) = 4 + x·cos(x) por Bissecção, Newton-Raphson e Secantes e compara as iterações de cada método.',
    highlights: ['3 métodos comparados', 'Tolerância 1e-5', 'Tratamento de erros'],
    tags: ['Python', 'Cálculo numérico'],
    category: ['python', 'matematica'],
    cover: { kind: 'curve', text: 'f(x) = 4 + x·cos(x)' }
  },
  {
    repo: 'GITGITHUB-OFICINA-CPU',
    path: 'mentoria/jogos',
    title: 'Mario Jump',
    summary:
      'Jogo de pular canos em JavaScript, criado nos encontros de mentoria da oficina de Git e GitHub.',
    highlights: ['Animações com CSS', 'Detecção de colisão', 'Eventos de teclado'],
    tags: ['JavaScript', 'CSS'],
    category: ['web'],
    image: 'mario.jpg'
  },
  {
    repo: 'PORTI',
    title: 'PORTI — primeiro portfólio',
    summary:
      'A primeira versão do meu portfólio, com mini-projetos em JavaScript como a lâmpada que liga e desliga.',
    highlights: ['Experiências e projetos', 'Mini-projetos em JS', 'Várias páginas'],
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: ['web'],
    image: 'porti.jpg'
  }
];

/** Repositórios de estudo: aparecem em lista compacta. */
const STUDIES = [
  { repo: 'WEB1.0-A-4.0-HTML.', title: 'Web 1.0 a 4.0', summary: 'Site multi-página sobre a evolução da Web.' },
  { repo: 'WEB--NCORA', title: 'Web com âncoras', summary: 'A mesma pesquisa em página única com navegação por âncoras.' },
  { repo: 'PROJETO-TELA', title: 'Projeto Tela', summary: 'Página de vaga para desenvolvedor front-end com formulário.' },
  { repo: 'TABELAS.HTML', title: 'Tabelas em HTML', summary: 'Exercícios de estrutura e estilo de tabelas.' },
  { repo: 'VIDEO--AUDIO', title: 'Vídeo e áudio', summary: 'Mídia nativa com as tags do HTML5.' },
  { repo: 'MARGIN-X-PADDING', title: 'Margin x padding', summary: 'Introdução ao modelo de caixa do CSS.' },
  { repo: 'BIO-JARLISSON', title: 'Bio', summary: 'Minha apresentação em Markdown.' }
];

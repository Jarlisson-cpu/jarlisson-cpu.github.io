/**
 * CONSOLE — mini JARVIS do hero. Entende alguns comandos em texto
 * (ou pelos chips) e responde com efeito de digitação.
 *
 * Para adicionar um comando, inclua um item em COMMANDS:
 *   keys   → palavras que ativam o comando (sem acento, minúsculas)
 *   reply  → resposta (pode ter <strong> e <a>)
 *   action → (opcional) o que acontece além da resposta
 */

const ConsoleJarvis = (() => {
  const scrollTo = selector => () =>
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const openLink = url => () => window.open(url, '_blank', 'noopener');

  const COMMANDS = [
    {
      keys: ['ajuda', 'help', 'comandos'],
      reply:
        'Eu entendo: <strong>projetos</strong>, <strong>jarvis</strong>, <strong>skills</strong>, <strong>sobre</strong>, <strong>contato</strong>, <strong>linkedin</strong>, <strong>github</strong> e <strong>limpar</strong>.'
    },
    {
      keys: ['jarvis', 'assistente', 'ia'],
      reply:
        'O JARVIS é o assistente de IA pessoal do Jarlisson: voz offline com Vosk, memória de longo prazo com SQLite e ChromaDB, plugins para automatizar o Windows e testes em pytest. Levando você até ele.',
      action: scrollTo('[data-featured]')
    },
    {
      keys: ['projeto', 'portfolio', 'trabalho'],
      reply:
        'Abrindo os projetos. O destaque é o <strong>JARVIS</strong>; depois vêm apps web, uma API em Flask e algoritmos de matemática em Python.',
      action: scrollTo('#projetos')
    },
    {
      keys: ['skill', 'tecnologia', 'stack', 'linguagem'],
      reply:
        'No dia a dia: <strong>Python</strong>, <strong>JavaScript</strong>, HTML e CSS. No back-end: Flask e SQLite. Estudando agora: Java e Spring Boot.',
      action: scrollTo('#skills')
    },
    {
      keys: ['sobre', 'quem', 'jarlisson'],
      reply:
        'Estudante de Ciência da Computação, interessado em IA, acessibilidade e matemática computacional. Aberto a estágio, vaga júnior e freelas.',
      action: scrollTo('#sobre')
    },
    {
      keys: ['contato', 'email', 'falar', 'whatsapp', 'vaga', 'contratar'],
      reply:
        'O caminho mais rápido é o WhatsApp ou o LinkedIn. Também tem um formulário que chega direto no e-mail dele.',
      action: scrollTo('#contato')
    },
    {
      keys: ['linkedin'],
      reply: 'Abrindo o LinkedIn em uma nova aba.',
      action: () => openLink(PROFILE.links.linkedin)()
    },
    {
      keys: ['github', 'codigo', 'repositorio'],
      reply: 'Abrindo o GitHub em uma nova aba.',
      action: () => openLink(PROFILE.links.github)()
    },
    {
      keys: ['oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e ai'],
      reply:
        'Olá! Sou uma versão de demonstração do JARVIS. Digite <strong>ajuda</strong> para ver o que eu sei fazer.'
    }
  ];

  const INTRO = {
    question: 'jarvis, quem é o Jarlisson?',
    reply:
      'Estudante de Ciência da Computação e desenvolvedor Python e web. Criou um <strong>assistente de IA por voz</strong>, uma API de reservas em Flask e um app de acessibilidade para a Orla da Atalaia. Toque num comando abaixo ou digite <strong>ajuda</strong>.'
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let log;
  let stateLabel;
  let finishTyping = null; // função que completa a digitação atual na hora
  let userTookOver = false; // o visitante interagiu: a introdução para

  /** Remove acentos, pontuação e o "jarvis," do começo. */
  function normalize(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/^jarvis[,\s]+(?=\S)/, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findCommand(input) {
    const text = normalize(input);
    if (!text) return null;
    return COMMANDS.find(cmd =>
      cmd.keys.some(key => (key.length <= 3 ? text.split(' ').includes(key) : text.includes(key)))
    );
  }

  function setState(mode) {
    stateLabel.textContent = mode;
    stateLabel.dataset.mode = mode;
    Waveform.setSpeaking(mode === 'falando');
  }

  function addLine(type, html, asText = false) {
    const line = document.createElement('p');
    line.className = `console__line console__line--${type}`;
    if (asText) line.textContent = html;
    else line.innerHTML = html;
    log.append(line);
    log.scrollTop = log.scrollHeight;
    return line;
  }

  /** Digita o conteúdo de um elemento letra por letra, preservando o HTML. */
  function typeInto(element, speed = 14) {
    return new Promise(resolve => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) {
        nodes.push({ node: walker.currentNode, text: walker.currentNode.textContent });
        walker.currentNode.textContent = '';
      }

      const caret = document.createElement('span');
      caret.className = 'console__caret';
      element.append(caret);

      let nodeIndex = 0;
      let charIndex = 0;
      let timer;

      const done = () => {
        clearTimeout(timer);
        nodes.forEach(({ node, text }) => (node.textContent = text));
        caret.remove();
        finishTyping = null;
        log.scrollTop = log.scrollHeight;
        resolve();
      };
      finishTyping = done;

      const step = () => {
        const current = nodes[nodeIndex];
        if (!current) return done();
        current.node.textContent = current.text.slice(0, ++charIndex);
        if (charIndex >= current.text.length) {
          nodeIndex++;
          charIndex = 0;
        }
        log.scrollTop = log.scrollHeight;
        timer = setTimeout(step, speed);
      };
      step();
    });
  }

  async function respond(html) {
    const line = addLine('bot', html);
    if (reducedMotion) return;
    setState('falando');
    await typeInto(line);
    setState('ouvindo');
  }

  async function run(input) {
    userTookOver = true;
    finishTyping?.(); // termina a resposta anterior antes de começar outra
    const text = input.trim();
    if (!text) return;

    if (normalize(text) === 'limpar' || normalize(text) === 'clear') {
      log.replaceChildren();
      return;
    }

    addLine('user', text, true);
    const command = findCommand(text);

    if (!command) {
      await respond(
        `Ainda não conheço esse comando. Tente <strong>projetos</strong>, <strong>skills</strong>, <strong>contato</strong> ou <strong>ajuda</strong>.`
      );
      return;
    }

    // Links abrem na hora (o navegador bloqueia pop-ups atrasados)
    const opensLink = command.keys.includes('linkedin') || command.keys.includes('github');
    if (opensLink) command.action();

    await respond(command.reply);
    if (!opensLink && command.action) command.action();
  }

  async function playIntro() {
    if (reducedMotion) {
      addLine('user', INTRO.question, true);
      addLine('bot', INTRO.reply);
      return;
    }
    await new Promise(r => setTimeout(r, 900));
    if (userTookOver) return;
    const question = addLine('user', INTRO.question, true);
    await typeInto(question, 38);
    await new Promise(r => setTimeout(r, 350));
    if (userTookOver) return;
    await respond(INTRO.reply);
  }

  function init() {
    const root = document.querySelector('.console');
    if (!root) return;

    log = root.querySelector('[data-console-log]');
    stateLabel = root.querySelector('[data-console-state]');
    const form = root.querySelector('[data-console-form]');
    const input = form.querySelector('input');

    Waveform.init(root.querySelector('[data-waveform]'));

    root.querySelectorAll('[data-command]').forEach(chip => {
      chip.addEventListener('click', () => run(chip.dataset.command));
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      run(input.value);
      input.value = '';
    });

    playIntro();
  }

  return { init };
})();

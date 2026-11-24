/**
 * EFEITOS — tudo que dá vida à página:
 *   loader       tela de abertura com contador
 *   splitText    letras do nome entram uma a uma
 *   cursor       ponto + anel que segue o mouse
 *   magnetic     botões puxados de leve pelo mouse
 *   tilt         cards inclinam em 3D com brilho
 *   parallax     camadas do topo se movem com o mouse e a rolagem
 *   counters     números contam até o valor final
 *   dots         navegação lateral por pontos
 *   headerHide   header some ao descer e volta ao subir
 *   clock        hora local de Aracaju no contato
 *
 * Tudo respeita "reduzir movimento" e telas de toque.
 */

const Effects = (() => {
  const reduced = window.MOTION_OK === false;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- Tela de abertura ---------- */
  function loader() {
    const root = document.documentElement;
    const count = document.querySelector('[data-loader-count]');

    const finish = () => {
      root.classList.remove('is-loading');
      root.classList.add('is-loaded');
    };

    if (reduced || !count) return finish();

    // Trava de segurança: a abertura nunca passa de 2,5 s
    setTimeout(finish, 2500);

    const start = performance.now();
    const duration = 1100;
    const tick = now => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      count.textContent = Math.round(eased * 100);
      root.style.setProperty('--load', eased.toFixed(3));
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(finish, 180);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Letras animadas ---------- */
  function splitText() {
    document.querySelectorAll('[data-split]').forEach(el => {
      const nodes = [...el.childNodes];
      el.textContent = '';
      let i = 0;
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          [...node.textContent].forEach(ch => {
            const span = document.createElement('span');
            span.className = 'char';
            span.style.setProperty('--i', i++);
            span.textContent = ch;
            el.append(span);
          });
        } else {
          node.classList?.add('char');
          node.style?.setProperty('--i', i++);
          el.append(node);
        }
      });
    });
  }

  /* ---------- Cursor ---------- */
  function cursor() {
    const root = document.querySelector('.cursor');
    if (!root || !finePointer || reduced) return;

    const dot = root.querySelector('.cursor__dot');
    const ring = root.querySelector('.cursor__ring');
    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;

    document.documentElement.classList.add('has-cursor');

    window.addEventListener('pointermove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    const interactive = 'a, button, input, textarea, [data-tilt], .filter';
    document.addEventListener('pointerover', e => {
      if (e.target.closest(interactive)) root.classList.add('is-hover');
    });
    document.addEventListener('pointerout', e => {
      if (e.target.closest(interactive)) root.classList.remove('is-hover');
    });
    document.addEventListener('pointerdown', () => root.classList.add('is-down'));
    document.addEventListener('pointerup', () => root.classList.remove('is-down'));
    document.addEventListener('mouseleave', () => root.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => root.classList.remove('is-hidden'));

    const loop = () => {
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Botões magnéticos ---------- */
  function magnetic() {
    if (!finePointer || reduced) return;
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- Cards em 3D ---------- */
  function tilt() {
    if (!finePointer || reduced) return;
    document.addEventListener('pointermove', e => {
      const card = e.target.closest('[data-tilt]');
      document.querySelectorAll('[data-tilt].is-tilting').forEach(c => {
        if (c !== card) {
          c.classList.remove('is-tilting');
          c.style.transform = '';
        }
      });
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.classList.add('is-tilting');
      card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-4px)`;
      card.style.setProperty('--gx', `${px * 100}%`);
      card.style.setProperty('--gy', `${py * 100}%`);
    });
  }

  /* ---------- Parallax do topo ---------- */
  function parallax() {
    const root = document.querySelector('[data-parallax-root]');
    if (!root || reduced) return;

    const layers = [...root.querySelectorAll('[data-depth]')];
    const photo = root.querySelector('.hero__photo');
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    if (finePointer) {
      window.addEventListener('pointermove', e => {
        tx = (e.clientX / innerWidth - 0.5) * 2;
        ty = (e.clientY / innerHeight - 0.5) * 2;
      });
    }

    const loop = () => {
      cx = lerp(cx, tx, 0.08);
      cy = lerp(cy, ty, 0.08);
      const scroll = Math.min(scrollY, innerHeight);
      layers.forEach(layer => {
        const d = parseFloat(layer.dataset.depth);
        layer.style.translate = `${cx * d * -10}px ${cy * d * -8 - scroll * d * 0.08}px`;
      });
      if (photo) photo.style.translate = `${cx * -8}px ${cy * -6 + scroll * 0.05}px`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Contadores ---------- */
  function counters() {
    const items = document.querySelectorAll('[data-count]');
    if (!items.length) return;

    const run = el => {
      const target = parseFloat(el.dataset.count);
      if (reduced || !Number.isFinite(target)) {
        el.textContent = el.dataset.count;
        return;
      }
      const start = performance.now();
      const duration = 1400;
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * eased).toLocaleString('pt-BR');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          run(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    items.forEach(el => {
      if (!reduced) el.textContent = '0';
      io.observe(el);
    });
  }

  /* ---------- Navegação lateral por pontos ---------- */
  function dots() {
    const nav = document.querySelector('[data-dots]');
    const sections = [...document.querySelectorAll('section[data-dot]')];
    if (!nav || !sections.length) return;

    const links = sections.map(section => {
      const a = document.createElement('a');
      a.href = `#${section.id}`;
      a.className = 'dots__item';
      a.setAttribute('aria-label', section.dataset.dot);
      a.innerHTML = '<span class="dots__label"></span><i></i>';
      a.querySelector('.dots__label').textContent = section.dataset.dot;
      nav.append(a);
      return a;
    });

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const i = sections.indexOf(entry.target);
          links.forEach((l, j) => l.classList.toggle('is-active', i === j));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(s => io.observe(s));
  }

  /* ---------- Header some ao descer ---------- */
  function headerHide() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let last = scrollY;
    window.addEventListener(
      'scroll',
      () => {
        const y = scrollY;
        const goingDown = y > last && y > 400;
        if (!document.body.classList.contains('menu-open')) {
          header.classList.toggle('is-hidden', goingDown);
        }
        last = y;
      },
      { passive: true }
    );
  }

  /* ---------- Efeitos ligados à rolagem ----------
   *   data-skew      inclina com a velocidade da rolagem
   *   data-speed     parallax vertical (anda mais rápido ou mais devagar)
   *   data-scroll-x  texto gigante anda para o lado
   *   data-words     frase acende palavra por palavra
   *   .road          a linha da trajetória enche conforme você desce
   *   .hero          o topo sobe e some suavemente
   *   .marquee       a faixa acelera e inverte com a rolagem
   */
  function scrollFx() {
    if (reduced) return;

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    // Frase: quebra em palavras sem perder o destaque laranja nem as quebras
    const statement = document.querySelector('[data-words]');
    let words = [];
    if (statement) {
      const nodes = [...statement.childNodes];
      statement.textContent = '';
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) return statement.append(part);
            const w = document.createElement('span');
            w.className = 'word';
            w.textContent = part;
            statement.append(w);
          });
        } else {
          if (node.nodeName !== 'BR') node.classList.add('word');
          statement.append(node);
        }
      });
      words = [...statement.querySelectorAll('.word')];
    }

    const skewEls = [...document.querySelectorAll('[data-skew]')];
    const speedEls = [...document.querySelectorAll('[data-speed]')];
    const xEls = [...document.querySelectorAll('[data-scroll-x]')];
    const road = document.querySelector('.road');
    const heroIntro = document.querySelector('.hero__intro');
    const heroVisual = document.querySelector('.hero__visual');
    const track = document.querySelector('.marquee__track');
    if (track) track.classList.add('is-js');

    let lastY = scrollY;
    let vel = 0;
    let mx = 0;
    let dir = 1;

    const loop = () => {
      const y = scrollY;
      const vh = innerHeight;
      const dy = y - lastY;
      lastY = y;
      vel = lerp(vel, dy, 0.12);
      if (Math.abs(dy) > 0.5) dir = dy > 0 ? 1 : -1;

      // Inclinação pela velocidade
      const skew = clamp(vel * 0.15, -4, 4);
      skewEls.forEach(el => (el.style.transform = `skewY(${skew.toFixed(2)}deg)`));

      // Parallax vertical (mede o pai, que não se move)
      speedEls.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        const offset = r.top + r.height / 2 - vh / 2;
        el.style.translate = `0 ${(offset * -parseFloat(el.dataset.speed)).toFixed(1)}px`;
      });

      // Texto gigante para os lados
      xEls.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        el.style.translate = `${((r.top - vh) * parseFloat(el.dataset.scrollX)).toFixed(1)}px 0`;
      });

      // Frase acendendo
      if (statement && words.length) {
        const r = statement.getBoundingClientRect();
        const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0, 1);
        const lit = p * words.length;
        words.forEach((w, i) => w.style.setProperty('--lit', clamp(lit - i, 0, 1).toFixed(2)));
      }

      // Linha da trajetória
      if (road) {
        const r = road.getBoundingClientRect();
        road.style.setProperty('--progress', clamp((vh * 0.65 - r.top) / r.height, 0, 1).toFixed(3));
      }

      // Topo saindo de cena
      // (só no layout lado a lado; empilhado no celular, empurraria os botões)
      if (y < vh * 1.2 && innerWidth > 960) {
        const p = clamp(y / vh, 0, 1);
        if (heroIntro) {
          heroIntro.style.translate = `0 ${(y * 0.3).toFixed(1)}px`;
          heroIntro.style.opacity = (1 - p * 1.1).toFixed(3);
        }
        if (heroVisual) heroVisual.style.scale = (1 - p * 0.08).toFixed(3);
      }

      // Faixa: acelera e inverte com a rolagem
      if (track) {
        const half = track.scrollWidth / 2;
        mx -= (0.6 + Math.min(Math.abs(vel) * 0.5, 14)) * dir;
        if (mx <= -half) mx += half;
        if (mx > 0) mx -= half;
        track.style.transform = `translateX(${mx.toFixed(1)}px)`;
      }

      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Relógio de Aracaju ---------- */
  function clock() {
    const el = document.querySelector('[data-clock]');
    if (!el) return;
    const fmt = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Maceio'
    });
    const update = () => (el.textContent = fmt.format(new Date()));
    update();
    setInterval(update, 30000);
  }

  /* ---------- Botão "Efeitos" (liga/desliga e lembra a escolha) ---------- */
  function motionToggle() {
    const button = document.querySelector('[data-motion-toggle]');
    if (!button) return;
    button.setAttribute('aria-pressed', String(!reduced));
    button.title = reduced ? 'Ligar animações' : 'Desligar animações';
    button.addEventListener('click', () => {
      try {
        localStorage.setItem('efeitos', reduced ? 'on' : 'off');
      } catch {
        /* navegador sem armazenamento: só recarrega */
      }
      location.reload();
    });
  }

  function init() {
    motionToggle();
    splitText();
    loader();
    cursor();
    magnetic();
    tilt();
    parallax();
    counters();
    dots();
    headerHide();
    scrollFx();
    clock();
  }

  return { init };
})();

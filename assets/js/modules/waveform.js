/**
 * WAVEFORM — onda sonora desenhada em <canvas> no console do hero.
 * Fica calma quando o JARVIS está "ouvindo" e se agita quando ele "fala".
 */

const Waveform = (() => {
  let canvas;
  let ctx;
  let energy = 0.35; // amplitude atual
  let target = 0.35; // amplitude desejada
  let phase = 0;
  let running = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw() {
    const { width, height } = canvas.getBoundingClientRect();
    const mid = height / 2;
    const bars = Math.floor(width / 7);
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgba(79, 227, 224, 0.15)');
    gradient.addColorStop(0.5, 'rgba(79, 227, 224, 1)');
    gradient.addColorStop(1, 'rgba(255, 194, 75, 0.25)');

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = gradient;

    for (let i = 0; i < bars; i++) {
      const x = i * 7 + 2;
      const t = i / bars;
      // Envelope: mais alto no centro, some nas bordas
      const envelope = Math.sin(Math.PI * t);
      const wave =
        Math.sin(t * 18 + phase) * 0.55 +
        Math.sin(t * 7 - phase * 1.3) * 0.3 +
        Math.sin(t * 31 + phase * 2.1) * 0.15;
      const h = Math.max(2, Math.abs(wave) * envelope * energy * (height - 8));
      ctx.beginPath();
      ctx.roundRect(x, mid - h / 2, 3, h, 1.5);
      ctx.fill();
    }
  }

  function loop() {
    energy += (target - energy) * 0.08;
    phase += 0.05 + energy * 0.12;
    draw();
    if (running) requestAnimationFrame(loop);
  }

  function init(element) {
    canvas = element;
    if (!canvas || !canvas.getContext) return;
    ctx = canvas.getContext('2d');
    if (!ctx.roundRect) ctx.roundRect = (x, y, w, h) => ctx.rect(x, y, w, h);

    resize();
    window.addEventListener('resize', () => {
      resize();
      draw();
    });

    if (reducedMotion) {
      energy = 0.5;
      draw();
      return;
    }

    // Só anima quando o console está visível na tela (economiza bateria)
    new IntersectionObserver(([entry]) => {
      const wasRunning = running;
      running = entry.isIntersecting;
      if (running && !wasRunning) loop();
    }).observe(canvas);
  }

  function setSpeaking(isSpeaking) {
    target = isSpeaking ? 1 : 0.35;
  }

  return { init, setSpeaking };
})();

/**
 * FORMULÁRIO DE CONTATO — envia pelo FormSubmit (https://formsubmit.co)
 * e mostra o resultado real do envio.
 *
 * Atenção: no primeiro envio, o FormSubmit manda um e-mail de ativação
 * para britojarlisson64@gmail.com. É só confirmar uma vez.
 */

const ContactForm = (() => {
  const MESSAGES = {
    sending: 'Enviando…',
    success: 'Mensagem enviada. Respondo assim que puder.',
    error: 'Não foi possível enviar agora. Tente de novo ou me chame no WhatsApp.'
  };

  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const status = form.querySelector('.form__status');
    const button = form.querySelector('button[type="submit"]');
    const label = button.textContent;

    const setStatus = state => {
      status.textContent = MESSAGES[state];
      status.dataset.state = state;
    };

    form.addEventListener('submit', async event => {
      event.preventDefault();
      button.disabled = true;
      button.textContent = 'Enviando…';
      setStatus('sending');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        form.reset();
        setStatus('success');
      } catch (error) {
        console.error('Falha no envio do formulário:', error);
        setStatus('error');
      } finally {
        button.disabled = false;
        button.textContent = label;
      }
    });
  }

  return { init };
})();

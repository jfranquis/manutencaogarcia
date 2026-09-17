const phone = '5511940044249';
const defaultMessage = 'Ol\u00e1, Garcia! Vi seu site e gostaria de solicitar um or\u00e7amento para um servi\u00e7o de manuten\u00e7\u00e3o.';

function openWhatsApp(message) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll('[data-wa]').forEach(link => {
  link.href = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMessage)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const service = data.get('service');
    const bairro = (data.get('bairro') || '').trim();
    const details = (data.get('details') || '').trim();
    const error = document.getElementById('quoteError');

    if (!service || !bairro) {
      error.classList.add('show');
      return;
    }
    error.classList.remove('show');

    const message = [
      'Ol\u00e1, Garcia! Vi seu site e gostaria de solicitar um or\u00e7amento.',
      '',
      `Servi\u00e7o: ${service}`,
      `Bairro/cidade: ${bairro}`,
      details ? `Detalhes: ${details}` : 'Detalhes: posso explicar melhor por aqui.',
      '',
      'Posso enviar fotos do local para voc\u00ea avaliar.'
    ].join('\n');

    openWhatsApp(message);
  });
}

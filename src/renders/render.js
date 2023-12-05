export default (state, elements, i18n) => (path, value, previousValue) => {
  switch (path) {
    case 'status':
      if (value === 'invalid') {
        elements.input.classList.add('is-invalid');
        elements.errorText.textContent = i18n.t('warnings.errUrl');
        // elements.errorText.classList.remove('text-success');
        // elements.errorText.classList.add('text-danger');
      }
      if (value === 'filling') {
        elements.input.classList.remove('is-invalid');
        elements.errorText.textContent = '';
      }
      break;
  }
};

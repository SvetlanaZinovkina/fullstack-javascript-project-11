import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import { handleProcessSubmit } from '../utilits.js';

export default (state, elements, i18n) => (path, value, previousValue) => {
  const {
    form, input, button, errorText,
  } = elements;
  switch (path) {
    case 'form.status':
      if (value === 'invalid') {
        input.classList.add('is-invalid');
        errorText.textContent = i18n.t('warnings.errUrl');
        // elements.errorText.classList.remove('text-success');
        // elements.errorText.classList.add('text-danger');
      }
      if (value === 'filling') {
        input.classList.remove('is-invalid');
        errorText.textContent = '';
      }
      break;
    case 'data.feeds':
      if (value) {
        renderFeeds(
          state,
          i18n.t('feeds'),
        );
        handleProcessSubmit(elements);
      }
      break;
  }
};

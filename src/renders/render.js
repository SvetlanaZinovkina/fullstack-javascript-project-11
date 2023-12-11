import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
import { handleProcessSubmit } from '../utilits.js';

export default (state, elements, i18n) => (path, value, previousValue) => {
  const {
    input, btnForm, errorText,
  } = elements;
  switch (path) {
    case 'form.status':
      if (value === 'invalid') {
        input.classList.add('is-invalid');
        // errorText.textContent = i18n.t('warnings.errUrl');
        errorText.classList.remove('text-success');
        errorText.classList.add('text-danger');
      }
      break;
    case 'form.error':
      input.classList.add('is-invalid');
      errorText.textContent = i18n.t(value);
      errorText.classList.remove('text-success');
      errorText.classList.add('text-danger');
      break;
    case 'data.feeds':
      if (value) {
        renderFeeds(state, i18n.t('feeds'));
        handleProcessSubmit(elements);
      }
      break;
    case 'data.posts':
      if (value.length !== previousValue.length) {
        renderPosts(state, i18n);
      }
      break;
    case 'request.status':
      if (value === 'processing') {
        errorText.textContent = '';
        input.classList.remove('is-invalid');
        input.disabled = true;
        btnForm.disabled = true;
      }
      if (value === 'waiting') {
        input.disabled = false;
        btnForm.disabled = false;
      }
      if (value === 'failed') {
        input.classList.remove('is-invalid');
        errorText.classList.remove('text-success');
        errorText.classList.add('text-danger');
        input.disabled = false;
        btnForm.disabled = false;
        input.focus({ preventScroll: true });
      }
      if (value === 'finished') {
        input.classList.remove('is-invalid');
        errorText.classList.remove('text-danger');
        errorText.classList.add('text-success');
        errorText.textContent = i18n.t('successfully');
        input.disabled = false;
        btnForm.disabled = false;
        input.focus({ preventScroll: true });
      }
      break;
    case 'request.error':
      errorText.textContent = i18n.t(value);
      break;
    default:
      break;
  }
};

import onChange from 'on-change';
import * as yup from 'yup';
import i18n from 'i18next';
import ru from './locales/ru.js';

const schema = yup.object().shape({
  url: yup.string().url().required('this rss already add'),
});
const isIncludes = (state) => state.rss.includes(state.url);

const render = (state) => {
  // console.log(state);
  const divForm = document.querySelector('.form-floating');
  const divError = document.createElement('div');

  const input = document.getElementById('url-input');
  if (state.valid === false) {
    input.classList.add('is-invalid');
    divError.classList.add('invalid-feedback');
    divError.textContent = 'oooops';
    divForm.append(divError);
  } else {
    // input.classList.remove('is-invalid');
    // divForm.remove(divError);
  }
};

const isValid = (state) => {
  schema.isValid({ url: state.url })
    .then((result) => {
      state.valid = result;
      render(state);
    });
  // schema.validate({ url: state.url })
  //   .then((result) => {
  //     console.log(result);
  //   });
};
const view = (state) => {
  const form = document.querySelector('form');
  const input = document.getElementById('url-input');

  input.addEventListener('input', (e) => {
    state.url = e.target.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(isValid(state));
    isValid(state);
    if (state.valid === true && !isIncludes(state)) {
      state.rss.push(state.url);
    }
    e.target.reset();
    input.focus();
  });
};

const data = () => {
  const i18nextInstance = i18n.createInstance();

  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources: ru,
  })
    .then(() => {
      const state = {
        valid: true,
        url: '',
        rss: [],
      };
      const watchedState = onChange(state, (path, value, previousValue) => {
        render(watchedState);
      });
      // console.log(state);
      view(watchedState);
    });
};

export default data;

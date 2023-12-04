import onChange from 'on-change';
// import * as yup from 'yup';
import i18n from 'i18next';
import ru from './locales/ru.js';
import { isValid } from './checkers.js';
import renderTextContent from './renders/renderText.js';
import render from './renders/render.js';

export default () => {
  const i18nInst = i18n.createInstance();

  i18nInst.init({
    lng: 'ru',
    debug: false,
    resources: { ru },
  })
    .then(() => {
      const elements = {
        h1: document.querySelector('.display-3'),
        article: document.querySelector('.lead'),
        btnForm: document.querySelector('.btn-lg'),
        exampleText: document.querySelector('.mt-2'),
        errorText: document.querySelector('.text-danger'),
        input: document.getElementById('url-input'),
        form: document.querySelector('form'),

      };

      renderTextContent(elements, i18nInst);

      const state = {
        status: 'filling',
        error: '',
        feeds: [],
        posts: [],
      };

      const watchedState = onChange(state, render(state, elements, i18nInst));

      elements.form.addEventListener('submit', async (e) => {
        const inputValue = e.target[0].value;
        isValid(watchedState, inputValue)
          .then((result) => {
            watchedState.feeds.push(result.url);
            watchedState.error = '';
            watchedState.status = 'filling';
          })
          .catch((error) => {
            watchedState.error = error;
            watchedState.status = 'invalid';
          });
        e.preventDefault();
        elements.input.focus();
        e.target.reset();
      });
    }).catch((error) => console.log(error));
};

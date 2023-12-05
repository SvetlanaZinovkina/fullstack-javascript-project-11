import onChange from 'on-change';
import i18n from 'i18next';
import axios from 'axios';
import _ from 'lodash';
import ru from './locales/ru.js';
import { isValid, getProxy } from './utilits.js';
import renderTextContent from './renders/renderText.js';
import render from './renders/render.js';
import parser from './parser.js';

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
        const feedsLinks = watchedState.feeds.map((feed) => feed.link);
        isValid(feedsLinks, inputValue)
          .then((result) => {
            console.log(result);
            watchedState.feeds.push({ id: _.uniqueId(), link: result.url });
            watchedState.error = '';
            watchedState.status = 'filling';
            // console.log(watchedState);
            axios
              .get(getProxy(result.url))
              .then((response) => {
                console.log(response);
                parser(response);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            // console.log(watchedState);
            watchedState.error = error;
            watchedState.status = 'invalid';
          });
        e.preventDefault();
        elements.input.focus();
        e.target.reset();
      });
    }).catch((error) => console.log(error));
};

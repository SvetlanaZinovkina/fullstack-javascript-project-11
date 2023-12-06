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
        request: {
          status: 'waiting',
          error: '',
        },
        form: {
          status: 'filling',
          error: '',
        },
        data: {
          feeds: [],
          posts: [],
        },
        uiState: {
          visitedLinks: [],
          modal: '',
        },
      };

      // const state = {
      //   status: '',
      //   error: '',
      //   feeds: [],
      //   posts: [],
      // };

      const watchedState = onChange(state, render(state, elements, i18nInst));

      elements.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const inputValue = form.get('url').trim();
        const feedsLinks = watchedState.data.feeds.map((feed) => feed.link);
        isValid(feedsLinks, inputValue)
          .then((result) => {
            axios
              .get(getProxy(result.url))
              .then((response) => {
                const parseData = parser(response.data.contents);
                const { feed, posts } = parseData;
                watchedState.form.status = 'filling';
                const id = _.uniqueId();
                watchedState.data.feeds.push({ ...feed, id, link: result.url });
                posts.forEach((post) => watchedState.posts.push({ ...post, id }));
              })
              .catch((error) => {
                watchedState.request.error = error;
              });
          })
          .catch((error) => {
            watchedState.form.error = error.message;
            watchedState.form.status = 'invalid';
          });
        // elements.form.reset();
        elements.input.focus();
      });
    }).catch((error) => console.log(error));
};

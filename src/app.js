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
        body: document.querySelector('body'),
        h1: document.querySelector('.display-3'),
        article: document.querySelector('.lead'),
        label: document.querySelector('label'),
        btnForm: document.querySelector('.btn-lg'),
        exampleText: document.querySelector('.mt-2'),
        errorText: document.querySelector('.feedback'),
        input: document.getElementById('url-input'),
        form: document.querySelector('form'),
        posts: document.querySelector('.posts'),
        modal: document.querySelector('.modal'),
        modalTitle: document.querySelector('.modal-title'),
        modalBody: document.querySelector('.modal-body'),
        modalFooter: document.querySelector('.modal-footer'),

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
        uiModal: {
          visitedLinks: new Set(),
          modal: '',
        },
      };

      const timeout = 5000;

      const watchedState = onChange(state, render(state, elements, i18nInst));

      // eslint-disable-next-line no-shadow
      const getNewPosts = (state) => {
        const promises = state.data.feeds
          .map(({ link, id }) => axios
            .get(getProxy(link))
            .then((response) => {
              const { posts } = parser(response.data.contents);
              const addedPosts = state.data.posts.map((post) => post.link);
              const newPosts = posts.filter((post) => !addedPosts.includes(post.link));
              if (newPosts.length > 0) {
                posts.forEach((post) => watchedState.data.posts.push({ ...post, id }));
              }
            }));

        Promise.allSettled(promises)
          .finally(() => {
            setTimeout(() => getNewPosts(state), timeout);
          });
      };

      elements.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const inputValue = form.get('url').trim();
        const feedsLinks = watchedState.data.feeds.map((feed) => feed.link);
        watchedState.request.status = 'processing';
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
                posts.forEach((post) => watchedState.data.posts.push({ ...post, id }));
                watchedState.request.status = 'finished';
              })
              .catch((error) => {
                if (axios.isAxiosError(error)) {
                  watchedState.form.status = 'filling';
                  watchedState.request.error = 'warnings.errNetwork';
                  watchedState.request.status = 'failed';
                } else {
                  watchedState.form.status = 'filling';
                  watchedState.request.status = 'failed';
                  watchedState.request.error = 'warnings.errIncludes';
                }
              });
          })
          .catch((error) => {
            watchedState.form.error = error.message;
            watchedState.form.status = 'invalid';
            watchedState.request.status = 'waiting';
          });
      });

      elements.posts.addEventListener('click', (e) => {
        const activeElem = e.target;
        if (activeElem.tagName === 'BUTTON') watchedState.uiModal.modal = activeElem.getAttribute('data-post-id');
        if (activeElem.tagName === 'A') watchedState.uiModal.visitedLinks.add(activeElem.getAttribute('data-post-id'));
      });

      getNewPosts(watchedState);
    }).catch((error) => console.log(error));
};

import { renderTitle } from './renderText.js';

export default (state, i18n) => {
  const container = document.querySelector('.feeds');
  container.innerHTML = '';
  const divCard = document.createElement('div');
  const divCardBody = document.createElement('div');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');
  divCard.classList.add('card', 'border-0');
  divCardBody.classList.add('card-body');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n;
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.data.feeds.forEach((feed) => {
    const { title, description } = feed;
    const li = document.createElement('li');
    const h3Title = document.createElement('h3');
    const pDescription = document.createElement('p');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    h3Title.classList.add('h6', 'm-0');
    pDescription.classList.add('m-0', 'small', 'text-black-50');
    pDescription.textContent = description;
    h3Title.textContent = title;
    li.append(h3Title, pDescription);
    ul.append(li);
  });

  container.append(divCard);
  divCard.append(divCardBody);
  divCardBody.append(h2);
  divCardBody.append(ul);
};

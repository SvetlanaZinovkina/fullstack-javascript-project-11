import _ from 'lodash';

export default (state, i18n) => {
  const container = document.querySelector('.posts');
  container.innerHTML = '';
  const divCard = document.createElement('div');
  const divCardBody = document.createElement('div');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');
  const fragment = document.createDocumentFragment();

  divCard.classList.add('card', 'border-0');
  divCardBody.classList.add('card-body');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t('posts');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  state.data.posts.forEach((post) => {
    const {
      title, link, id,
    } = post;

    const idPost = _.uniqueId();

    const li = document.createElement('li');
    const a = document.createElement('a');
    const btn = document.createElement('button');

    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    a.setAttribute('href', link);
    a.classList.add('fw-bold');
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('data-id', id);
    a.setAttribute('data-post-id', idPost);
    a.textContent = title;

    btn.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'btn-posts');
    btn.setAttribute('type', 'button');
    btn.setAttribute('data-id', id);
    btn.setAttribute('data-post-id', idPost);
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#modal');
    btn.textContent = i18n.t('btnView');

    li.append(a, btn);
    fragment.insertBefore(li, fragment.firstChild);
    // fragment.append(li);
  });
  container.append(divCard);
  divCard.append(divCardBody);
  divCardBody.append(h2);
  divCardBody.append(ul);
  ul.append(fragment);
};

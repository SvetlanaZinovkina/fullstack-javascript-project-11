const closeModal = (modal, body, backdrop) => {
  modal.removeAttribute('style');
  modal.removeAttribute('aria-modal');
  modal.removeAttribute('role');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
  backdrop.remove();
};

export default (state, elements, i18n, idPost) => {
  const {
    body, modal, modalTitle, modalBody, modalFooter,
  } = elements;
  const { posts } = state.data;
  const aLink = document.querySelector(`[data-post-id="${idPost}"]`);
  const btnRead = modalFooter.querySelector('a');
  const btnClose = modalFooter.querySelector('.btn-secondary');
  const crossClose = document.querySelector('.btn-close');
  const backdrop = document.createElement('div');

  const [{ description, link, title }] = posts.filter((post) => post.link === aLink.href);
  modal.classList.add('show');
  modal.setAttribute('style', 'display: block');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');
  modal.removeAttribute('aria-hidden');

  aLink.classList.remove('fw-bold');
  aLink.classList.add('fw-normal');
  aLink.classList.add('link-secondary');
  body.classList.add('modal-open');

  body.setAttribute('style', 'overflow: hidden; padding-right: 0px;');
  backdrop.classList.add('modal-backdrop', 'fade', 'show');
  body.appendChild(backdrop);

  modalTitle.textContent = title;
  modalBody.textContent = description;
  btnRead.href = link;
  btnRead.textContent = i18n.t('modal.btnRead');
  btnClose.textContent = i18n.t('modal.btnClose');

  btnClose.addEventListener('click', () => closeModal(modal, body, backdrop));
  crossClose.addEventListener('click', () => closeModal(modal, body, backdrop));
};

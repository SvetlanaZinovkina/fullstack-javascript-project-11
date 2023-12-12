export default (state, elements, i18n, idPost) => {
  const {
    modal, modalTitle, modalBody, modalFooter,
  } = elements;
  const { posts } = state.data;
  const aLink = document.querySelector(`[data-post-id=${idPost}]`);
  console.log(aLink);
  const { title, description, link } = posts.filter((post) => post.link === aLink.href);
  modal.classList.add('show');
  modal.setAttribute('style', 'display: block');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');
  modal.removeAttribute('aria-hidden');
  modalTitle.textContent = title;
};

export default (state, elements, i18n) => {
  const {
    modal, modalTitle, modalBody, modalFooter,
  } = elements;
  modal.classList.add('show');
  modal.setAttribute('style', 'display: block');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');
  modal.removeAttribute('aria-hidden');
};

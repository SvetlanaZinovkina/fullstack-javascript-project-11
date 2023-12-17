export default (elements, i18n) => {
  const {
    h1, article, btnForm, exampleText, label,
  } = elements;
  h1.textContent = i18n.t('headerText');
  article.textContent = i18n.t('articleText');
  btnForm.textContent = i18n.t('btn');
  exampleText.textContent = i18n.t('example');
  label.textContent = i18n.t('labelText');
};

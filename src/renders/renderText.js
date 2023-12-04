export default (elements, i18n) => {
  elements.h1.textContent = i18n.t('headerText');
  elements.article.textContent = i18n.t('articleText');
  elements.btnForm.textContent = i18n.t('btn');
  elements.exampleText.textContent = i18n.t('example');
};

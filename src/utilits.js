import * as yup from 'yup';

export const isValid = (feedsLinks, inputValue) => {
  const schema = yup.object({
    url: yup
      .string()
      .url('warnings.errUrl')
      .notOneOf(feedsLinks, 'warnings.errFeed')
      .required('warnings.errIncludes'),
  });

  return schema.validate({ url: inputValue }, { abortEarly: false });
};

export const getProxy = (url) => {
  const urlProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlProxy.searchParams.set('disableCache', 'true');
  urlProxy.searchParams.set('url', url);
  return urlProxy.toString();
};

export const handleProcessSubmit = (elements) => {
  const { form, input, btnForm } = elements;
  form.reset();
  input.focus();
  btnForm.disabled = false;
};

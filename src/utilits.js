import * as yup from 'yup';

export const isValid = (state, inputValue) => {
  const schema = yup.object({
    url: yup
      .string()
      .url('invalid url')
      .notOneOf(state.feeds, 'error')
      .required(''),
  });

  return schema.validate({ url: inputValue });
};

export const getProxy = (url) => {
  const urlProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlProxy.searchParams.set('url', url);
  urlProxy.searchParams.set('disableCache', 'true');
  return urlProxy.searchParams.toString();
};

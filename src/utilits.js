import * as yup from 'yup';

export const isValid = (feedsLinks, inputValue) => {
  const schema = yup.object({
    url: yup
      .string()
      .url('invalid url')
      .notOneOf(feedsLinks, 'url already yet')
      .required('error'),
  });

  return schema.validate({ url: inputValue });
};

export const getProxy = (url) => {
  const urlProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlProxy.searchParams.set('disableCache', 'true');
  urlProxy.searchParams.set('url', url);
  return urlProxy.toString();
};

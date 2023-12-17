import * as yup from 'yup';

export const isValid = (feedsLinks, currentUrl) => {
  const schema = yup.object({
    url: yup
      .string()
      .url('warnings.errUrl')
      .notOneOf(feedsLinks, 'warnings.errFeed')
      .required('warnings.errIncludes'),
  });

  return schema.validate({ url: currentUrl }, { abortEarly: false });
};

export const getProxy = (url) => {
  const urlProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlProxy.searchParams.set('disableCache', 'true');
  urlProxy.searchParams.set('url', url);
  return urlProxy.toString();
};

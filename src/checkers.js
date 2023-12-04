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

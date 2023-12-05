export default (response) => {
  const parser = new DOMParser();
  const text = parser.parseFromString(response, 'application / xhtml + xml');
  return text;
};

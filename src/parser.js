const getPosts = (feedData) => {
  const items = feedData.querySelectorAll('item');
  return [...items].map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return { title, description, link };
  });
};

const getFeed = (feedData) => {
  const title = feedData.querySelector('channel > title').textContent;
  const description = feedData.querySelector('channel > description').textContent;

  return { title, description };
};

export default (response) => {
  const parser = new DOMParser();
  const feedData = parser.parseFromString(response, 'text/xml');

  const parsererrors = feedData.querySelector('parsererror');

  if (parsererrors !== null) {
    const error = parsererrors.textContent;
    throw new Error(error);
  }

  const posts = getPosts(feedData);
  const feed = getFeed(feedData);

  return { feed, posts };
};

export default (elements, visitedLinksArr) => {
  const { posts } = elements;
  const links = Array.from(posts.querySelectorAll('li a'));
  const visitedLinks = links.filter((link) => visitedLinksArr.has(link.getAttribute('data-post-id')));
  return visitedLinks.forEach((link) => {
    link.classList.remove('fw-bold');
    link.classList.add('fw-normal');
    link.classList.add('link-secondary');
  });
};

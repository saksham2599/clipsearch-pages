const input = document.querySelector('#guide-search');
const topics = [...document.querySelectorAll('[data-topic]')];
const links = [...document.querySelectorAll('.contents a')];
const status = document.querySelector('#search-status');
function filterTopics() {
  const terms = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const topic of topics) {
    const text = topic.textContent.toLocaleLowerCase();
    topic.hidden = !terms.every(term => text.includes(term));
    if (!topic.hidden) count++;
  }
  for (const link of links) link.hidden = document.querySelector(link.getAttribute('href')).hidden;
  status.textContent = terms.length ? count + ' of ' + topics.length + ' topics found' : '';
  document.querySelector('#empty-search').hidden = count !== 0;
}
input.addEventListener('input', filterTopics);
function revealLinkedTopic() {
  const topic = topics.find(section => '#' + section.id === location.hash);
  if (topic && topic.hidden) {
    input.value = '';
    filterTopics();
    topic.scrollIntoView();
  }
}
window.addEventListener('hashchange', revealLinkedTopic);

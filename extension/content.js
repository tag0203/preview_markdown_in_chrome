(function () {
  if (window.location.protocol !== 'file:') return;
  if (!/.md$/i.test(window.location.pathname)) return;

  const pre = document.querySelector('pre');
  if (!pre) return;

  const rawMarkdown = pre.textContent;

  document.body.style.visibility = 'hidden';

  const html = marked.parse(rawMarkdown);

  const firstH1 = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const titleText = firstH1
    ? firstH1[1].replace(/<[^>]+>/g, '')
    : decodeURIComponent(window.location.pathname.split('/').pop().replace(/\.md$/i, ''));

  document.documentElement.classList.add('md-preview');

  document.head.innerHTML =
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>' + titleText + '</title>';

  document.body.innerHTML = '<article class="markdown-body">' + html + '</article>';
  document.body.style.visibility = '';
})();

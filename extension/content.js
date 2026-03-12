(function () {
  if (window.location.protocol !== 'file:') return;
  if (!/.md$/i.test(window.location.pathname)) return;

  const pre = document.querySelector('pre');
  if (!pre) return;

  const rawMarkdown = pre.textContent;

  document.body.style.visibility = 'hidden';

  // Disable raw HTML blocks: escape them instead of passing through as-is.
  // Without this, <script> or <img onerror=...> in the markdown would execute.
  marked.use({
    renderer: {
      html({ text }) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }
    }
  });

  const html = marked.parse(rawMarkdown);

  const firstH1 = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const titleText = firstH1
    ? firstH1[1].replace(/<[^>]+>/g, '')
    : decodeURIComponent(window.location.pathname.split('/').pop().replace(/\.md$/i, ''));

  document.documentElement.classList.add('md-preview');

  document.head.innerHTML =
    '<meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">';
  const titleEl = document.createElement('title');
  titleEl.textContent = titleText;
  document.head.appendChild(titleEl);

  document.body.innerHTML = '<article class="markdown-body">' + html + '</article>';

  document.querySelectorAll('.markdown-body a').forEach(function (a) {
    a.target = '_blank';
    a.rel = 'noreferrer noopener';
  });

  document.body.style.visibility = '';
})();

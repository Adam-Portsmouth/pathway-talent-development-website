(function () {
  const buttons = document.querySelectorAll('.blog-filter');
  const cards = document.querySelectorAll('.blog-card');
  const emptyMessage = document.querySelector('[data-blog-empty]');
  if (!buttons.length || !cards.length) return;

  function applyFilter(tag) {
    let matchCount = 0;

    cards.forEach(function (card) {
      const isKeystone = card.classList.contains('blog-card--keystone');
      const cardTags = (card.dataset.tags || '').split(/\s+/).filter(Boolean);
      const matches = tag === 'all' || cardTags.indexOf(tag) !== -1;

      if (matches) matchCount += 1;
      card.hidden = !(isKeystone || matches);
    });

    if (emptyMessage) {
      emptyMessage.hidden = !(tag !== 'all' && matchCount === 0);
    }

    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.tag === tag ? 'true' : 'false');
    });
  }

  function tagFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    if (!tag) return 'all';
    const known = Array.from(buttons).some(function (b) { return b.dataset.tag === tag; });
    return known ? tag : 'all';
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const tag = btn.dataset.tag;
      const url = new URL(window.location.href);
      if (tag === 'all') {
        url.searchParams.delete('tag');
      } else {
        url.searchParams.set('tag', tag);
      }
      window.history.replaceState({}, '', url);
      applyFilter(tag);
    });
  });

  applyFilter(tagFromUrl());
})();

/* DanPlays website foundation. No Twitch tokens, balances or purchase actions live in client code. */
(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !expanded);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.reward-card'));
  const search = document.getElementById('reward-search');
  const empty = document.getElementById('empty-search');
  let activeFilter = 'all';

  const updateResults = () => {
    const term = (search?.value || '').trim().toLocaleLowerCase('en-GB');
    let visible = 0;
    cards.forEach(card => {
      const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
      const searchMatch = (card.dataset.title || '').toLocaleLowerCase('en-GB').includes(term);
      card.hidden = !(categoryMatch && searchMatch);
      if (!card.hidden) visible++;
    });
    if (empty) empty.hidden = visible > 0;
  };

  buttons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    buttons.forEach(other => {
      const selected = other === button;
      other.classList.toggle('active', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    updateResults();
  }));
  search?.addEventListener('input', updateResults);
  updateResults();

  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const updateNav = () => {
    const hash = location.hash || '#home';
    navLinks.forEach(link => link.classList.toggle('current', link.getAttribute('href') === hash));
  };
  window.addEventListener('hashchange', updateNav);
  updateNav();
})();

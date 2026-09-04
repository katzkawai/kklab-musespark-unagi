// Hamanako Unagi interactions
(function(){
  'use strict';
  var header = document.getElementById('header');
  var btn = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  function onScroll(){
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setOpen(open){
    header.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }
  btn.addEventListener('click', function(){
    setOpen(!header.classList.contains('is-open'));
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      setOpen(false);
      btn.focus();
    }
  });
  document.addEventListener('click', function(e){
    if (!header.classList.contains('is-open')) return;
    if (!header.contains(e.target)) setOpen(false);
  });
  document.querySelectorAll('.nav a, .header__cta').forEach(function(a){
    a.addEventListener('click', function(){ setOpen(false); });
  });
  if (nav) {
    nav.addEventListener('keydown', function(e){
      if (e.key === 'Tab' && header.classList.contains('is-open')) {
        var links = nav.querySelectorAll('a');
        if (!links.length) return;
        var first = links[0];
        var last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  }

  // shop filter
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('.filter__btn'));
  var shops = Array.prototype.slice.call(document.querySelectorAll('.shop'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  filterBtns.forEach(function(b){
    b.addEventListener('click', function(){
      filterBtns.forEach(function(x){
        x.classList.remove('is-active');
        x.setAttribute('aria-pressed', 'false');
      });
      b.classList.add('is-active');
      b.setAttribute('aria-pressed', 'true');
      var f = b.getAttribute('data-filter');
      shops.forEach(function(s){
        var area = s.getAttribute('data-area') || '';
        var show = f === 'all' || area.split(' ').indexOf(f) !== -1;
        if (reduceMotion) {
          s.classList.toggle('is-hidden', !show);
          return;
        }
        if (show) {
          s.classList.remove('is-hidden');
          s.classList.add('is-fade');
          requestAnimationFrame(function(){
            requestAnimationFrame(function(){ s.classList.remove('is-fade'); });
          });
        } else {
          s.classList.add('is-hidden');
        }
      });
    });
  });

  // reveal on scroll
  var revealTargets = document.querySelectorAll('.section-head, .dish, .shop, .feat, .buy-card, .route, .tl');
  if ('IntersectionObserver' in window && !reduceMotion && revealTargets.length) {
    revealTargets.forEach(function(el){ el.classList.add('reveal'); });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach(function(el){ io.observe(el); });
  }

  // smooth scroll already via CSS
})();

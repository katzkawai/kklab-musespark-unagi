// Hamanako Unagi interactions
(function(){
  var header = document.getElementById('header');
  window.addEventListener('scroll', function(){
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  });

  var btn = document.getElementById('hamburger');
  btn.addEventListener('click', function(){
    header.classList.toggle('is-open');
    var expanded = header.classList.contains('is-open');
    btn.setAttribute('aria-expanded', expanded);
  });
  document.querySelectorAll('.nav a, .header__cta').forEach(function(a){
    a.addEventListener('click', function(){ header.classList.remove('is-open'); });
  });

  // shop filter
  var filterBtns = document.querySelectorAll('.filter__btn');
  var shops = document.querySelectorAll('.shop');
  filterBtns.forEach(function(b){
    b.addEventListener('click', function(){
      filterBtns.forEach(function(x){ x.classList.remove('is-active'); });
      b.classList.add('is-active');
      var f = b.getAttribute('data-filter');
      shops.forEach(function(s){
        var area = s.getAttribute('data-area') || '';
        var show = f === 'all' || area.split(' ').indexOf(f) !== -1;
        s.classList.toggle('is-hidden', !show);
      });
    });
  });

  // smooth scroll already via CSS
})();

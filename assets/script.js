/* Basic JS for SPA-like navigation, slider and interactions */
document.addEventListener('DOMContentLoaded', function () {
  // set year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // simple page show/hide for SPA navigation
  const links = document.querySelectorAll('.nav-link');
  const pages = {
    home: document.getElementById('home'),
    about: document.getElementById('about'),
    services: document.getElementById('services'),
    projects: document.getElementById('projects'),
    contact: document.getElementById('contact')
  };
  function showPage(name) {
    for (const k in pages) {
      if (!pages[k]) continue;
      pages[k].style.display = (k === name) ? 'block' : 'none';
    }
    links.forEach(l => l.classList.toggle('active', l.dataset.page === name));
    // smooth scroll to top
    window.scrollTo({top:0,behavior:'smooth'});
  }
  links.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const p = a.dataset.page || 'home';
      showPage(p);
    });
  });

  // show home by default
  showPage('home');

  // mobile toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navList = document.getElementById('navList');
  mobileToggle && mobileToggle.addEventListener('click', () => {
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
  });

  // simple slider for industries
  const slidesWrap = document.querySelector('.slides');
  const prevBtn = document.getElementById('industriesPrev');
  const nextBtn = document.getElementById('industriesNext');
  let idx = 0;
  function updateSlider() {
    if (!slidesWrap) return;
    const slideWidth = slidesWrap.querySelector('.slide').offsetWidth + 16; // include gap
    slidesWrap.style.transform = `translateX(${-idx * slideWidth}px)`;
  }
  prevBtn && prevBtn.addEventListener('click', () => { idx = Math.max(0, idx-1); updateSlider(); });
  nextBtn && nextBtn.addEventListener('click', () => { idx = Math.min(slidesWrap.children.length - 1, idx+1); updateSlider(); });
  window.addEventListener('resize', updateSlider);
  updateSlider();

  // simple fade-in on scroll
  const faders = document.querySelectorAll('.fade-in, .card');
  const appearOptions = {threshold: 0.1, rootMargin: "0px 0px -50px 0px"};
  const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(f => appearOnScroll.observe(f));

  // contact form handler (no back-end)
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thanks! Your message was received locally. Integrate with backend or email service to send messages.');
    contactForm.reset();
  });
});

// Scroll progress bar
window.addEventListener('scroll', function() {
  const bar = document.getElementById('scroll-progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = percent + '%';
});

// Offer nudge after 10 seconds
setTimeout(() => {
  const nudge = document.getElementById('offer-nudge');
  if (nudge) nudge.style.display = 'block';
  setTimeout(() => { if (nudge) nudge.style.display = 'none'; }, 7000);
}, 10000);
// Variant image grid switcher with fade-in
const sunglassesRadio = document.getElementById('sunglasses');
const antiBlueRadio = document.getElementById('anti-blue');
const gridSunglasses = document.getElementById('grid-sunglasses');
const gridAntiBlue = document.getElementById('grid-anti-blue');
if (sunglassesRadio && antiBlueRadio && gridSunglasses && gridAntiBlue) {
  function showFadeIn(grid) {
    grid.classList.remove('visible');
    setTimeout(() => grid.classList.add('visible'), 10);
  }
  function updateVariantGrid() {
    if (sunglassesRadio.checked) {
      gridSunglasses.style.display = 'grid';
      gridAntiBlue.style.display = 'none';
      showFadeIn(gridSunglasses);
    } else {
      gridSunglasses.style.display = 'none';
      gridAntiBlue.style.display = 'grid';
      showFadeIn(gridAntiBlue);
    }
  }
  sunglassesRadio.addEventListener('change', updateVariantGrid);
  antiBlueRadio.addEventListener('change', updateVariantGrid);
  // Initial fade-in
  setTimeout(() => gridSunglasses.classList.add('visible'), 10);
  updateVariantGrid();
}
// Live Counter (Fake Real-Time Visitors)
function startLiveCounter() {
  const el = document.getElementById('live-counter');
  let count = Math.floor(Math.random() * 11) + 15; // 15-25
  el.textContent = count;
  setInterval(() => {
    // Randomly increase or decrease by 1, but keep between 13 and 32
    const change = Math.random() > 0.5 ? 1 : -1;
    count = Math.max(13, Math.min(32, count + change));
    el.textContent = count;
  }, 3500);
}
startLiveCounter();
// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
    if (!open) {
      item.classList.add('open');
      this.classList.add('active');
    }
  });
});
// Simple form handler (demo only)
document.querySelector('.cod-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.name.value.trim();
  const phone = this.phone.value.trim();
  if (!name || !phone) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }
  this.querySelector('button[type="submit"]').disabled = true;
  this.querySelector('button[type="submit"]').textContent = 'Envoi...';
  setTimeout(() => {
    alert('Merci pour votre commande, ' + name + ' ! Nous vous contacterons bientôt.');
    this.reset();
    this.querySelector('button[type="submit"]').disabled = false;
    this.querySelector('button[type="submit"]').textContent = 'Commander';
  }, 1200);
});

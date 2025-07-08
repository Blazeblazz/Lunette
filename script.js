// About section animated progress bar
document.addEventListener('DOMContentLoaded', function() {
  var bar = document.getElementById('about-progress-bar');
  var value = document.getElementById('about-progress-value');
  if (bar && value) {
    // Simulate popularity between 78% and 97% for social proof
    var percent = Math.floor(Math.random() * 20) + 78;
    setTimeout(function() {
      bar.style.width = percent + '%';
      value.textContent = percent + '%';
    }, 400);
  }
});
// Scroll progress bar
window.addEventListener('scroll', function() {
  const bar = document.getElementById('scroll-progress-bar');
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = percent + '%';
});

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
// Stock display for variants
const stock = {
  'sunglasses': 19,
  'anti-blue': 4
};
function updateStockDisplay() {
  const variant = sunglassesRadio && sunglassesRadio.checked ? 'sunglasses' : 'anti-blue';
  let stockText = '';
  let urgent = false;
  if (variant === 'sunglasses') {
    stockText = `Stock restant : <b>${stock['sunglasses']}</b> paires`;
    urgent = stock['sunglasses'] <= 5;
  } else {
    stockText = `Stock restant : <b>${stock['anti-blue']}</b> paires`;
    urgent = stock['anti-blue'] <= 5;
  }
  let stockEl = document.getElementById('stock-indicator');
  if (!stockEl) {
    stockEl = document.createElement('div');
    stockEl.id = 'stock-indicator';
    stockEl.style.cssText = 'color:#d32f2f;font-weight:700;font-size:1.08em;margin-bottom:0.5em;text-align:center;';
    const form = document.querySelector('.cod-form');
    form.insertBefore(stockEl, form.querySelector('input'));
  }
  stockEl.innerHTML = stockText + (urgent ? ' <span class="stock-badge">Rupture imminente</span>' : '');
  // Micro-message sous le bouton Commander
  let microMsg = document.getElementById('stock-micro-msg');
  if (!microMsg) {
    microMsg = document.createElement('div');
    microMsg.id = 'stock-micro-msg';
    microMsg.style.cssText = 'color:#d32f2f;font-size:0.98em;font-weight:600;text-align:center;margin-top:0.3em;';
    const btn = document.querySelector('.cod-form button[type="submit"]');
    btn.parentNode.insertBefore(microMsg, btn.nextSibling);
  }
  microMsg.innerHTML = urgent ? `Plus que <b>${variant === 'sunglasses' ? stock['sunglasses'] : stock['anti-blue']}</b> paires en stock !` : '';
}
if (sunglassesRadio && antiBlueRadio) {
  sunglassesRadio.addEventListener('change', updateStockDisplay);
  antiBlueRadio.addEventListener('change', updateStockDisplay);
  updateStockDisplay();
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
// Add aria-expanded for accessibility
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
    document.querySelectorAll('.faq-question').forEach(q => q.setAttribute('aria-expanded', 'false'));
    if (!open) {
      item.classList.add('open');
      this.classList.add('active');
      this.setAttribute('aria-expanded', 'true');
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

// Hide sticky order bar when form input is focused (prevents keyboard overlap on mobile)
(function() {
  const stickyBar = document.querySelector('.sticky-order-bar');
  if (!stickyBar) return;
  const formInputs = document.querySelectorAll('.cod-form input, .cod-form select, .cod-form textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      stickyBar.style.display = 'none';
    });
    input.addEventListener('blur', () => {
      stickyBar.style.display = '';
    });
  });
})();
// Add animated accent bar under all main section headings
const accentHeadings = document.querySelectorAll('.hero h1, .features h2, .about-compare-title, .about-title, .reviews h2, .faq h2, .engagements-title');
accentHeadings.forEach(h => {
  if (!h.querySelector('.section-heading-bar')) {
    const bar = document.createElement('span');
    bar.className = 'section-heading-bar';
    h.insertAdjacentElement('afterend', bar);
  }
});

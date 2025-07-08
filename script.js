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

// MOBILE COLLAPSE/EXPAND LOGIC
(function() {
  if (window.innerWidth > 700) return;
  // 1. Collapse About List
  const aboutList = document.querySelector('.about-list-collapsible');
  if (aboutList) {
    const items = aboutList.querySelectorAll('li');
    items.forEach((li, i) => {
      if (i > 1) li.style.display = 'none';
    });
    if (items.length > 2) {
      const btn = document.createElement('button');
      btn.textContent = 'Voir plus';
      btn.className = 'about-see-more';
      btn.style = 'margin:0.7em auto 0 auto;display:block;background:#00c3ad;color:#fff;border:none;border-radius:18px;padding:0.7em 1.5em;font-weight:700;';
      let expanded = false;
      btn.onclick = function() {
        expanded = !expanded;
        items.forEach((li, i) => { if (i > 1) li.style.display = expanded ? '' : 'none'; });
        btn.textContent = expanded ? 'Voir moins' : 'Voir plus';
      };
      aboutList.parentNode.insertBefore(btn, aboutList.nextSibling);
    }
  }
  // 2. Collapse FAQ
  document.querySelectorAll('.faq-list .faq-item').forEach((item, i) => {
    if (i > 0) item.style.display = 'none';
  });
  const faqList = document.querySelector('.faq-list');
  if (faqList && faqList.children.length > 1) {
    const btn = document.createElement('button');
    btn.textContent = 'Voir plus de questions';
    btn.className = 'faq-see-more';
    btn.style = 'margin:0.7em auto 0 auto;display:block;background:#00c3ad;color:#fff;border:none;border-radius:18px;padding:0.7em 1.5em;font-weight:700;';
    let expanded = false;
    btn.onclick = function() {
      expanded = !expanded;
      Array.from(faqList.children).forEach((item, i) => { if (i > 0) item.style.display = expanded ? '' : 'none'; });
      btn.textContent = expanded ? 'Voir moins de questions' : 'Voir plus de questions';
    };
    faqList.parentNode.insertBefore(btn, faqList.nextSibling);
  }
  // 3. Collapse Reviews
  const reviewList = document.querySelector('.review-list');
  if (reviewList) {
    const reviews = reviewList.querySelectorAll('.review');
    reviews.forEach((r, i) => { if (i > 0) r.style.display = 'none'; });
    if (reviews.length > 1) {
      const btn = document.createElement('button');
      btn.textContent = 'Voir plus d\'avis';
      btn.className = 'reviews-see-more';
      btn.style = 'margin:0.7em auto 0 auto;display:block;background:#00c3ad;color:#fff;border:none;border-radius:18px;padding:0.7em 1.5em;font-weight:700;';
      let expanded = false;
      btn.onclick = function() {
        expanded = !expanded;
        reviews.forEach((r, i) => { if (i > 0) r.style.display = expanded ? '' : 'none'; });
        btn.textContent = expanded ? 'Voir moins d\'avis' : 'Voir plus d\'avis';
      };
      reviewList.parentNode.insertBefore(btn, reviewList.nextSibling);
    }
  }
  // 4. Hide review image banner on very small screens
  if (window.innerWidth < 375) {
    var reviewImgBanner = document.querySelector('.review-image-banner');
    if (reviewImgBanner) reviewImgBanner.style.display = 'none';
  }
  // 5. Move comparison table behind a button
  var compareContainer = document.querySelector('.about-compare-container');
  if (compareContainer) {
    compareContainer.style.display = 'none';
    var btn = document.createElement('button');
    btn.textContent = 'Voir le comparatif';
    btn.className = 'compare-see-more';
    btn.style = 'margin:0.7em auto 1em auto;display:block;background:#00c3ad;color:#fff;border:none;border-radius:18px;padding:0.7em 1.5em;font-weight:700;';
    let expanded = false;
    btn.onclick = function() {
      expanded = !expanded;
      compareContainer.style.display = expanded ? '' : 'none';
      btn.textContent = expanded ? 'Masquer le comparatif' : 'Voir le comparatif';
    };
    compareContainer.parentNode.insertBefore(btn, compareContainer);
  }
})();

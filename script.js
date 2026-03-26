/* ════════════════════════════════════════════════════
   GeneXplor Website — JavaScript
   ════════════════════════════════════════════════════ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ── Mobile nav toggle ──
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active nav link tracking ──
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ── Hero screenshot carousel ──
const heroImg = document.getElementById('heroImg');
const heroLabel = document.getElementById('heroLabel');
const screenshotDots = document.querySelectorAll('.screenshot-dot');

screenshotDots.forEach(dot => {
  dot.addEventListener('click', () => {
    screenshotDots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    heroImg.style.opacity = '0';
    setTimeout(() => {
      heroImg.src = dot.dataset.img;
      heroImg.style.opacity = '1';
      heroLabel.textContent = dot.dataset.label;
    }, 300);
  });
});

// Auto-rotate hero screenshots
let heroIndex = 0;
setInterval(() => {
  heroIndex = (heroIndex + 1) % screenshotDots.length;
  screenshotDots[heroIndex].click();
}, 5000);

// ── Count-up animation ──
function animateCountUp(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const start = performance.now();
  
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + '+';
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + '+';
  }
  requestAnimationFrame(update);
}

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal], .feature-card, .datasource-card, .gallery-item').forEach(el => {
  revealObserver.observe(el);
});

// Count-up observer
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCountUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
  countObserver.observe(el);
});

// ── Screenshot Gallery ──
const galleryData = [
  {
    img: 'screenshots/homepage-hero.png',
    title: 'Home Page & Smart Search',
    desc: 'Landing page with real-time autocomplete search supporting genes, diseases, variants, and chromosomal locations.'
  },
  {
    img: 'screenshots/search-autocomplete.png',
    title: 'Search Autocomplete',
    desc: 'Categorized autocomplete results as you type — Gene, Alias, Gene Name, Disease Name — with keyboard navigation.'
  },
  {
    img: 'screenshots/dashboard-overview.png',
    title: 'Gene Dashboard — Overview',
    desc: 'Summary view when you first open a gene, showing variant counts, diseases, publications, pathways, interactions, and concordance score.'
  },
  {
    img: 'screenshots/variants-tab.png',
    title: 'Variant Explorer',
    desc: 'Filterable, sortable variant table powered by TanStack Table. Filter by clinical significance, search by variant ID, and paginate through results.'
  },
  {
    img: 'screenshots/variant-detail-modal.png',
    title: 'Variant Detail Modal',
    desc: 'Three-tab detail view for any variant — Details (HGVS, conditions), Impact (animated simulator), and Population (world map frequencies).'
  },
  {
    img: 'screenshots/variant-analytics.png',
    title: 'Variant Analytics Charts',
    desc: 'Interactive donut chart for significance distribution, allele frequency histogram, and consequence types stacked by clinical significance.'
  },
  {
    img: 'screenshots/protein-3d.png',
    title: '3D Protein Structure',
    desc: 'Interactive AlphaFold protein viewer (PDBe Molstar) with confidence coloring, variant mapping, and cartoon/surface/ball-and-stick modes.'
  },
  {
    img: 'screenshots/population-map.png',
    title: 'Population Frequency Map',
    desc: 'World map showing allele frequency distribution across 9 global populations from the gnomAD database.'
  },
  {
    img: 'screenshots/interactions.png',
    title: 'Interaction Network',
    desc: 'D3 force-directed graph showing protein-protein interactions from STRING. Adjustable confidence threshold and evidence type filters.'
  },
  {
    img: 'screenshots/pathways.png',
    title: 'Biological Pathways',
    desc: 'Reactome pathway memberships organized by category — signal transduction, metabolism, cell cycle, and more.'
  },
  {
    img: 'screenshots/timeline.png',
    title: 'Discovery Timeline',
    desc: 'Recharts timeline showing when variants were classified over time — stacked by significance with cumulative line and brush zoom.'
  },
  {
    img: 'screenshots/publications.png',
    title: 'Research Publications',
    desc: 'Latest PubMed articles with expandable abstracts, plus a Research Pulse card tracking publication trends over time.'
  },
  {
    img: 'screenshots/diseases.png',
    title: 'Disease Associations',
    desc: 'All ClinVar-linked clinical conditions with variant counts and associated variant IDs.'
  },
  {
    img: 'screenshots/reconciliation.png',
    title: 'Reconciliation Engine',
    desc: 'Cross-references ClinVar classifications with gnomAD population data — flags conflicts like rare-pathogenic variants that are actually common.'
  },
  {
    img: 'screenshots/simulator.png',
    title: 'Variant Impact Simulator',
    desc: 'Animated visualization of the central dogma — DNA → RNA → Protein → Structure → Function → Clinical significance cascade.'
  },
  {
    img: 'screenshots/report.png',
    title: 'Clinical Report Generator',
    desc: 'ACMG-formatted clinical reports with configurable sections. Export as PDF, Markdown, or JSON. Filter variants by significance.'
  },
  {
    img: 'screenshots/trending.png',
    title: 'Trending Genes',
    desc: 'Genes ranked by recent research momentum — publication rate changes, category filters, and all-time most-researched rankings.'
  },
  {
    img: 'screenshots/compare.png',
    title: 'Gene Comparison',
    desc: 'Side-by-side comparison of two genes — variant counts, disease overlaps, publication activity, and key metrics.'
  },
  {
    img: 'screenshots/watchlist.png',
    title: 'Gene Watchlist',
    desc: 'Save genes to a personal watchlist with notes, tags, card/table view toggle, and bulk comparison capability.'
  },
];

const gallery = document.getElementById('screenshotGallery');

// Render gallery items in pairs for a nice two-up layout
galleryData.forEach((item, i) => {
  const div = document.createElement('div');
  div.className = 'gallery-item';
  div.innerHTML = `
    <div class="gallery-browser">
      <div class="browser-bar">
        <div class="browser-dots">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
        </div>
        <div class="browser-address">genexplor.app</div>
      </div>
      <img src="${item.img}" alt="${item.title}" loading="lazy" />
    </div>
    <div class="gallery-info">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `;
  // Stagger animation delay
  div.style.transitionDelay = `${(i % 2) * 0.15}s`;
  gallery.appendChild(div);
  revealObserver.observe(div);
});

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

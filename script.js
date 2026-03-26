/* ════════════════════════════════════════════════════
   GeneXplor Website — Multi-Page Routing
   ════════════════════════════════════════════════════ */

// ── Active nav link tracking based on URL path ──
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ── Mobile nav toggle ──
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksContainer = document.getElementById('navLinks');
    if(mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });
    }

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    // ── Hero screenshot carousel (for index.html) ──
    const heroImg = document.getElementById('heroImg');
    const heroLabel = document.getElementById('heroLabel');
    const screenshotDots = document.querySelectorAll('.screenshot-dot');

    if (heroImg && screenshotDots.length > 0) {
        screenshotDots.forEach(dot => {
            dot.addEventListener('click', () => {
                screenshotDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                heroImg.style.opacity = '0';
                setTimeout(() => {
                    heroImg.src = dot.dataset.img;
                    heroImg.style.opacity = '1';
                    if (heroLabel) heroLabel.textContent = dot.dataset.label;
                }, 200);
            });
        });

        // Auto-rotate hero screenshots
        let heroIndex = 0;
        setInterval(() => {
            heroIndex = (heroIndex + 1) % screenshotDots.length;
            screenshotDots[heroIndex].click();
        }, 5000);
    }

    // ── Demo Gallery Rendering (for demo.html) ──
    const gallery = document.getElementById('screenshotGallery');
    if (gallery) {
        const galleryData = [
            { img: 'screenshots/homepage-hero.png', title: 'Smart Search', desc: 'Real-time autocomplete for genes, diseases, variants, and locations.' },
            { img: 'screenshots/dashboard-overview.png', title: 'Gene Dashboard', desc: 'Summary view showing variant counts, diseases, publications, and interactions.' },
            { img: 'screenshots/variants-tab.png', title: 'Variant Explorer', desc: 'Filterable, sortable variant table powered by TanStack Table.' },
            { img: 'screenshots/variant-detail-modal.png', title: 'Detail Modal', desc: 'In-depth variant view with Details, Impact simulator, and Population frequencies.' },
            { img: 'screenshots/variant-analytics.png', title: 'Visual Analytics', desc: 'Interactive charts for significance distribution and consequence types.' },
            { img: 'screenshots/protein-3d.png', title: '3D Protein Structure', desc: 'AlphaFold protein viewer with confidence coloring and variant mapping.' },
            { img: 'screenshots/population-map.png', title: 'Population Map', desc: 'World map showing allele frequencies across 9 global gnomAD populations.' },
            { img: 'screenshots/interactions.png', title: 'Protein Interactions', desc: 'D3 force-directed graph of protein networks from STRING.' },
            { img: 'screenshots/pathways.png', title: 'Biological Pathways', desc: 'Reactome pathway memberships organized by category.' },
            { img: 'screenshots/timeline.png', title: 'Discovery Timeline', desc: 'Recharts timeline showing variant classifications over time.' },
            { img: 'screenshots/publications.png', title: 'Research Publications', desc: 'Latest PubMed articles tracking publication trends.' },
            { img: 'screenshots/disease.png', title: 'Disease Associations', desc: 'ClinVar-linked clinical conditions with variant counts.' },
            { img: 'screenshots/reconciliation.png', title: 'Data Reconciliation', desc: 'Cross-references ClinVar classifications with gnomAD for conflict detection.' },
            { img: 'screenshots/simulator.png', title: 'Impact Simulator', desc: 'Animated validation of the molecular cascade from DNA to Clinic.' },
            { img: 'screenshots/report.png', title: 'Clinical Reports', desc: 'ACMG-formatted PDF/Markdown generation engine.' }
        ];

        galleryData.forEach((item, i) => {
            const div = document.createElement('div');
            div.className = 'demo-item grid-2';
            div.innerHTML = `
                <div class="demo-browser">
                    <img src="${item.img}" alt="${item.title}" loading="lazy" style="width: 100%; display:block;" />
                </div>
                <div class="demo-info" style="align-self: center; text-align: left; padding: 0 40px;">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            // Alternate flex direction for visual interest
            if (i % 2 !== 0) {
                div.style.direction = "rtl";
                div.innerHTML = `
                    <div class="demo-info" style="align-self: center; text-align: right; padding: 0 40px; direction: ltr;">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                    <div class="demo-browser" style="direction: ltr;">
                        <img src="${item.img}" alt="${item.title}" loading="lazy" style="width: 100%; display:block;" />
                    </div>
                `;
            }
            gallery.appendChild(div);
        });
    }
});

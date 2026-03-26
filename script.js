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
            { img: 'screenshots/homepage-hero.png', title: 'Smart Search', desc: 'Find any human gene instantly using HGNC symbols, aliases, associated diseases (MIM), or Ensembl IDs without ambiguity.' },
            { img: 'screenshots/dashboard-overview.png', title: 'Unified Dashboard', desc: 'Get a real-time summary of the gene\'s clinical relevance, including total pathogenic variants, linked phenotypes, and overall publication volume.' },
            { img: 'screenshots/variants-tab.png', title: 'Variant Explorer', desc: 'Rapidly filter through thousands of documented variants by their clinical significance, functional consequence (e.g., frameshift, nonsense), and allele frequency.' },
            { img: 'screenshots/variant-detail-modal.png', title: 'Variant Deep-Dive', desc: 'Inspect individual mutations to see precise molecular changes, global allele distributions, and supporting literature.' },
            { img: 'screenshots/variant-analytics.png', title: 'Clinical Analytics', desc: 'Understand the overall pathogenicity landscape of a gene at a glance with interactive distribution charts and histograms.' },
            { img: 'screenshots/protein-3d.png', title: 'AlphaFold Structural Integration', desc: 'Visualize exact missense mutations on a 3D protein structure to immediately determine if they disrupt active binding sites or occur in unstructured regions.' },
            { img: 'screenshots/population-map.png', title: 'Genomic Epidemiology', desc: 'Evaluate allele frequencies mapped across distinct global ancestries using gnomAD data to ensure ancestrally aware interpretations.' },
            { img: 'screenshots/interactions.png', title: 'Protein Interactome', desc: 'Investigate the gene\'s functional neighborhood through evidence-scored biological networks derived from STRING.' },
            { img: 'screenshots/pathways.png', title: 'Biological Systems', desc: 'Contextualize the gene within broader hierarchical signaling cascades and metabolic pathways sourced from Reactome.' },
            { img: 'screenshots/timeline.png', title: 'Discovery Timeline', desc: 'Track the historical classifications of variants over the last several decades to understand shifts in diagnostic consensus.' },
            { img: 'screenshots/publications.png', title: 'Literature Tracking', desc: 'Cut through PubMed noise to access a live, targeted feed of the most critical studies relevant to your precise variant of interest.' },
            { img: 'screenshots/disease.png', title: 'Disease Associations', desc: 'Review all clinical conditions linked to mutations in the gene, strictly mapped via ClinVar assertion data.' },
            { img: 'screenshots/reconciliation.png', title: 'Conflict Detection Engine', desc: 'Automatically flag "Pathogenic" assertions from literature that contradict modern, high-frequency population observations.' },
            { img: 'screenshots/simulator.png', title: 'Pathology Cascade Simulator', desc: 'Watch the entire Central Dogma play out—from base pair mutation, to protein misfolding, to presenting clinical phenotype.' },
            { img: 'screenshots/report.png', title: 'Clinical Report Generation', desc: 'Seamlessly compile your findings into clean, ACMG-formatted summaries ready for inclusion in electronic health records or tumor boards.' }
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

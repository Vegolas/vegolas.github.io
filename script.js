/* =====================================================
   ŚLONSKI GOTHIC - Interactive Features
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMarbleOverlays();
    initParticles();
    initProgressBar();
    initFAQ();
    initAudioPlayer();
    initSmoothScroll();
    initNavHighlight();
    initScrollReveal();
});

/* =====================================================
   MARBLE TEXTURE OVERLAYS - Stone wall effect
   ===================================================== */
function initMarbleOverlays() {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const overlay = document.createElement('div');
        overlay.className = 'section-marble-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        section.insertBefore(overlay, section.firstChild);
    });
}

/* =====================================================
   SCROLL REVEAL ANIMATIONS
   ===================================================== */
function initScrollReveal() {
    const sectionFrames = document.querySelectorAll('.section-frame');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sectionFrames.forEach(frame => {
        observer.observe(frame);
    });
}

/* =====================================================
   PARTICLE SYSTEM - Ember/Dust Effects
   ===================================================== */
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.life = Math.random() * 0.5 + 0.5;

            // Color variation: golden embers + mystical teal mist
            const colorChoice = Math.random();
            if (colorChoice < 0.35) {
                this.color = `rgba(201, 162, 39, ${this.opacity})`; // Gold
                this.glowColor = 'rgba(255, 159, 28, 0.3)';
            } else if (colorChoice < 0.55) {
                this.color = `rgba(255, 107, 53, ${this.opacity})`; // Orange/fire
                this.glowColor = 'rgba(255, 107, 53, 0.3)';
            } else if (colorChoice < 0.85) {
                this.color = `rgba(74, 158, 140, ${this.opacity})`; // Mystical teal
                this.glowColor = 'rgba(74, 158, 140, 0.3)';
            } else {
                this.color = `rgba(212, 205, 196, ${this.opacity * 0.5})`; // Dust
                this.glowColor = 'rgba(212, 205, 196, 0.2)';
            }
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.x += Math.sin(this.y * 0.01) * 0.2; // Slight wave motion

            this.life -= 0.002;
            this.opacity = this.life * 0.5;

            if (this.y < -10 || this.life <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            // Glow effect for larger particles
            if (this.size > 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 2
                );
                gradient.addColorStop(0, this.glowColor);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        p.y = Math.random() * canvas.height; // Spread initially
        particles.push(p);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* =====================================================
   PROGRESS BAR ANIMATION
   ===================================================== */
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;

    const targetProgress = progressFill.dataset.progress || 98;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    progressFill.style.width = targetProgress + '%';
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(progressFill);
}

/* =====================================================
   FAQ ACCORDION
   ===================================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* =====================================================
   AUDIO PLAYER
   ===================================================== */
function initAudioPlayer() {
    const audioBtn = document.getElementById('audio-toggle');
    const audio = document.getElementById('ambient-audio');

    if (!audioBtn || !audio) return;

    let isPlaying = false;

    // Set initial volume
    audio.volume = 0.3;

    audioBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            audioBtn.classList.remove('playing');
            audioBtn.querySelector('.audio-status').textContent = 'DŹWIĘK';
        } else {
            audio.play().catch(e => {
                console.log('Audio playback failed:', e);
            });
            audioBtn.classList.add('playing');
            audioBtn.querySelector('.audio-status').textContent = 'GRA';
        }
        isPlaying = !isPlaying;
    });

    // Update button state if audio ends or errors
    audio.addEventListener('ended', () => {
        // Loop is enabled, but just in case
        isPlaying = false;
        audioBtn.classList.remove('playing');
    });

    audio.addEventListener('error', () => {
        console.log('Audio file not found or cannot be played');
        audioBtn.style.opacity = '0.5';
        audioBtn.style.pointerEvents = 'none';
    });
}

/* =====================================================
   SMOOTH SCROLL WITH OFFSET
   ===================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = window.innerWidth <= 768 ? 0 : 150;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Calculate maximum scrollable position
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

                // Use the smaller of desired position or max scroll to handle last sections
                const finalPosition = Math.min(offsetPosition, maxScroll);

                window.scrollTo({
                    top: finalPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================================
   NAVIGATION HIGHLIGHT ON SCROLL
   ===================================================== */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Initial check
}

/* =====================================================
   OPTIONAL: Custom Cursor (commented out by default)
   Uncomment if you want a custom cursor
   ===================================================== */
/*
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}
*/

/* =====================================================
   OPTIONAL: Parallax effect on scroll
   ===================================================== */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
    });
}

// Initialize parallax
initParallax();

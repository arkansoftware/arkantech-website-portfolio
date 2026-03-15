document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    // Theme & Language Elements
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    const htmlElement = document.documentElement;

    // Translations Dictionary
    const translations = {
        en: {
            nav_services: "Services",
            nav_portfolio: "Our Work",
            nav_about: "About",
            nav_contact: "Contact Us",
            hero_title_1: "Building Digital",
            hero_title_2: "Excellence",
            hero_desc: "Specializing in the design and development of innovative web solutions and robust software systems.",
            hero_btn_projects: "View Projects",
            hero_btn_contact: "Get in Touch",
            services_title: "Our Expertise",
            services_subtitle: "We craft digital experiences that drive growth.",
            service_1_title: "Web Development",
            service_1_desc: "Custom websites built with modern technologies ensuring performance, security, and scalability.",
            service_2_title: "UI/UX Design",
            service_2_desc: "Intuitive and visually stunning interfaces that provide seamless user experiences across all devices.",
            service_3_title: "Software Systems",
            service_3_desc: "Robust enterprise software solutions tailored to streamline your business operations.",
            portfolio_title: "Featured Projects",
            portfolio_subtitle: "A glimpse into our recent success stories.",
            contact_title: "Ready to Start?",
            contact_desc: "Let's transform your ideas into reality. Reach out to us today.",
            contact_call: "Call Us",
            contact_follow: "Follow Us",
            contact_fb: "Facebook Page",
            footer_desc: "Empowering businesses through digital innovation.",
            footer_rights: "&copy; 2026 Arkan. All rights reserved.",
            toggle_theme: "Theme",
            toggle_lang: "English",
            stat_projects: "Projects Delivered",
            stat_clients: "Happy Clients",
            stat_satisfaction: "% Satisfaction"
        },
        ar: {
            nav_services: "خدماتنا",
            nav_portfolio: "أعمالنا",
            nav_about: "من نحن",
            nav_contact: "تواصل معنا",
            hero_title_1: "نبني التميز",
            hero_title_2: "الرقمي",
            hero_desc: "متخصصون في تصميم وتطوير حلول الويب المبتكرة وأنظمة البرمجيات القوية.",
            hero_btn_projects: "شاهد مشاريعنا",
            hero_btn_contact: "تواصل معنا",
            services_title: "خبراتنا",
            services_subtitle: "نصنع تجارب رقمية تدفع عجلة النمو.",
            service_1_title: "تطوير الويب",
            service_1_desc: "مواقع مخصصة مبنية بأحدث التقنيات لضمان الأداء والأمان وقابلية التوسع.",
            service_2_title: "تصميم واجهة المستخدم",
            service_2_desc: "واجهات بديهية ومذهلة بصرياً توفر تجارب مستخدم سلسة عبر جميع الأجهزة.",
            service_3_title: "أنظمة البرمجيات",
            service_3_desc: "حلول برمجية مؤسسية قوية مصممة لتبسيط عمليات عملك.",
            portfolio_title: "مشاريع مميزة",
            portfolio_subtitle: "لمحة عن قصص نجاحنا الأخيرة.",
            contact_title: "مستعد للبدء؟",
            contact_desc: "دعنا نحول أفكارك إلى واقع. تواصل معنا اليوم.",
            contact_call: "اتصل بنا",
            contact_follow: "تابعنا",
            contact_fb: "صفحة الفيسبوك",
            footer_desc: "تمكين الشركات من خلال الابتكار الرقمي.",
            footer_rights: "&copy; 2026 أركان. جميع الحقوق محفوظة.",
            toggle_theme: "المظهر",
            toggle_lang: "العربية",
            stat_projects: "مشاريع منجزة",
            stat_clients: "عملاء سعداء",
            stat_satisfaction: "% رضا العملاء"
        }
    };

    // --- State Management ---
    // Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    // Language
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    // --- Event Listeners ---

    // Theme Toggles
    [themeToggle, mobileThemeToggle].forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    // Language Toggles
    [langToggle, mobileLangToggle].forEach(btn => {
        btn.addEventListener('click', () => {
            const currentLang = htmlElement.getAttribute('lang') || 'en';
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            setLanguage(newLang);
        });
    });


    // --- Helper Functions ---

    function updateThemeIcons(theme) {
        const iconClass = theme === 'dark' ? 'fa-moon' : 'fa-sun';
        const btns = [themeToggle, mobileThemeToggle];
        btns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = `fas ${iconClass}`;
            }
        });
    }

    function setLanguage(lang) {
        htmlElement.setAttribute('lang', lang);
        htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem('lang', lang);

        // Update Toggle Text
        if (langToggle) langToggle.innerText = lang === 'en' ? 'AR' : 'EN';

        // Update Text Content
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // If it contains HTML (like &copy;), use innerHTML, otherwise innerText
                if (translations[lang][key].includes('&')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.innerText = translations[lang][key];
                }
            }
        });
    }

    // --- Navbar scroll effect ---
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    mobileMenuClose.addEventListener('click', closeMenu);

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // ==========================================
    // Scroll Reveal Animation (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });


    // ==========================================
    // Animated Number Counter
    // ==========================================
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);

            el.textContent = current + (el.closest('.stat-item')?.querySelector('.stat-label')?.textContent.startsWith('%') ? '' : '+');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target + (el.closest('.stat-item')?.querySelector('.stat-label')?.textContent.startsWith('%') ? '' : '+');
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Observe stat counters
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));


    // ==========================================
    // Particle System (Hero Background)
    // ==========================================
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let mouseX = 0;
        let mouseY = 0;

        function resizeCanvas() {
            const hero = canvas.parentElement;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        function createParticles() {
            particles = [];
            const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000));

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const theme = htmlElement.getAttribute('data-theme');
            const baseColor = theme === 'dark' ? '59, 130, 246' : '37, 99, 235';

            particles.forEach((p, i) => {
                // Update position
                p.x += p.speedX;
                p.y += p.speedY;

                // Mouse interaction - gentle repulsion
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    p.x += dx * 0.01;
                    p.y += dy * 0.01;
                }

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
                ctx.fill();

                // Draw connections between nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (dist2 < 150) {
                        const lineOpacity = (1 - dist2 / 150) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${baseColor}, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(drawParticles);
        }

        // Mouse tracking for particle interaction
        const hero = canvas.parentElement;
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        // Initialize particles
        resizeCanvas();
        createParticles();
        drawParticles();

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                createParticles();
            }, 250);
        });
    }


    // ==========================================
    // Tilt Effect on Service Cards
    // ==========================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });


    // ==========================================
    // Active Nav Link Highlighting on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.btn-primary)');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // ==========================================
    // Parallax effect on hero orbs
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const orbs = document.querySelectorAll('.hero-orb');
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.1;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

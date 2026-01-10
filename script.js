document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    const revealElements = document.querySelectorAll('.reveal');

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
            toggle_lang: "English"
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
            toggle_lang: "العربية"
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

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });


    // Smooth Scrolling for Anchor Links (Optional modern browser support covers this, but good as fallback/control)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed navbar height
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
});

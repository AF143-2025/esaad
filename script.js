/* ═══════════════════════════════════════════════════════════════
   شركة اصعد للحلول الرقمية والتقنية - GO uptm
   Enterprise Single Page Application Router & Engine (v6.0)
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Configuration ───
    const CONFIG = {
        telegramUrl: 'https://t.me/GOUP202',
        telegramUser: '@GOUP202',
        scrollThreshold: 40
    };

    // ─── DOM Elements ───
    const navbarWrapper = document.getElementById('navbarWrapper');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMobileMenu = document.getElementById('navMobileMenu');
    const navMobileClose = document.getElementById('navMobileClose');
    const backToTop = document.getElementById('backToTop');

    // ═══════════════════════════════════ ROUTE & METADATA CONFIG ═══════════════════════════════════

    const ROUTE_MAP = {
        '': 'page-home',
        '#': 'page-home',
        '#home': 'page-home',
        '#services': 'page-services',
        '#programming': 'page-programming',
        '#services/programming': 'page-programming',
        '#cybersecurity': 'page-cybersecurity',
        '#services/cybersecurity': 'page-cybersecurity',
        '#social-media': 'page-social-media',
        '#services/social-media': 'page-social-media',
        '#about': 'page-about',
        '#portfolio': 'page-portfolio',
        '#faq': 'page-faq',
        '#contact': 'page-contact'
    };

    const PAGE_METADATA = {
        'page-home': {
            title: 'شركة اصعد للحلول الرقمية والتقنية | GO uptm',
            desc: 'شركة تقنية متخصصة في هندسة البرمجيات وتطوير الأنظمة، الأمن السيبراني وفحص الثغرات، وقيادة استراتيجيات النمو والتسويق الرقمي.'
        },
        'page-services': {
            title: 'دليل الخدمات العامة والمسارات | شركة اصعد - GO uptm',
            desc: 'استكشف مسارات خدماتنا في هندسة البرمجيات والأنظمة، الأمن السيبراني وفحص الثغرات VAPT، واستراتيجيات التسويق والنمو.'
        },
        'page-programming': {
            title: 'هندسة البرمجيات وتطوير الأنظمة | شركة اصعد - GO uptm',
            desc: 'تطوير منصات ويب سحابية، تطبيقات جوال iOS و Android، وأنظمة إدارة مخصصة بمعمارية كود نظيفة قابلة للتوسع.'
        },
        'page-cybersecurity': {
            title: 'الأمن السيبراني وفحص الثغرات VAPT | شركة اصعد - GO uptm',
            desc: 'فحص أمني دقيق واختبارات اختراق مصرحة للمواقع والمنصات والسيرفرات لكشف نقاط الضعف وسد الثغرات وفق أعلى المعايير.'
        },
        'page-social-media': {
            title: 'التسويق الرقمي واستراتيجيات النمو | شركة اصعد - GO uptm',
            desc: 'إدارة احترافية للحسابات، حملات إعلانية ممولة دقيقة الاستهداف، وتطوير الحضور الرقمي بالطرق الرسمية المعتمدة.'
        },
        'page-about': {
            title: 'من نحن • الرؤية والمعايير المؤسسية | شركة اصعد - GO uptm',
            desc: 'تعرف على شركة اصعد للحلول الرقمية والتقنية، قيمنا الهندسية، معايير الجودة، ومنهجيتنا في إدارة وتنفيذ المشاريع.'
        },
        'page-portfolio': {
            title: 'معرض الأعمال ودراسات الحالة | شركة اصعد - GO uptm',
            desc: 'نماذج تطبيقية ودراسات حالة تعكس قدراتنا الهندسية والتقنية في بناء المنصات، الفحص الأمني، والنمو الرقمي.'
        },
        'page-faq': {
            title: 'الأسئلة الشائعة | شركة اصعد - GO uptm',
            desc: 'إجابات مباشرة حول آلية طلب الخدمات، التواصل عبر Telegram، معايير الفحص الأمني المصرح، وملكية الكود.'
        },
        'page-contact': {
            title: 'تواصل معنا • تواصل فوري ومباشر | شركة اصعد - GO uptm',
            desc: 'تواصل مباشرة مع مهندسي وفريق شركة اصعد عبر Telegram على @GOUP202.'
        }
    };

    // ═══════════════════════════════════ SCROLL & NAVBAR ═══════════════════════════════════

    function handleScrollEffects() {
        const scrollY = window.scrollY;
        const isScrolled = scrollY > CONFIG.scrollThreshold;

        if (navbarWrapper) {
            navbarWrapper.classList.toggle('navbar-wrapper--scrolled', isScrolled);
        }

        if (backToTop) {
            backToTop.classList.toggle('back-to-top--visible', scrollY > 400);
        }

        checkActiveReveals();
    }

    // ═══════════════════════════════════ SCROLL REVEAL OBSERVER ═══════════════════════════════════

    let revealObserver = null;

    function initScrollReveal() {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const revealElements = document.querySelectorAll('[data-reveal]');

        if (isReducedMotion) {
            revealElements.forEach(el => el.classList.add('is-revealed'));
            return;
        }

        if ('IntersectionObserver' in window) {
            revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.05,
                rootMargin: '0px 0px 60px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));
        } else {
            revealElements.forEach(el => el.classList.add('is-revealed'));
        }
    }

    function checkActiveReveals() {
        const activeView = document.querySelector('.page-view.is-active');
        if (!activeView) return;

        activeView.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100) {
                el.classList.add('is-revealed');
                if (revealObserver) {
                    revealObserver.unobserve(el);
                }
            }
        });
    }

    function triggerViewReveals(targetView) {
        if (!targetView) return;
        targetView.querySelectorAll('[data-reveal]').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 150) {
                el.classList.add('is-revealed');
            } else if (revealObserver) {
                revealObserver.observe(el);
            }
        });
    }

    // ═══════════════════════════════════ MOBILE DRAWER MENU ═══════════════════════════════════

    function toggleMobileMenu(forceState) {
        if (!navMobileMenu) return;
        const isCurrentlyOpen = navMobileMenu.classList.contains('is-open');
        const shouldOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

        if (shouldOpen) {
            navMobileMenu.removeAttribute('hidden');
            navMobileMenu.setAttribute('aria-hidden', 'false');
            // Force browser layout reflow so CSS transition executes smoothly
            void navMobileMenu.offsetWidth;
            navMobileMenu.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            if (navToggle) {
                navToggle.classList.add('is-active');
                navToggle.setAttribute('aria-expanded', 'true');
            }
        } else {
            navMobileMenu.classList.remove('is-open');
            navMobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (navToggle) {
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            setTimeout(() => {
                if (!navMobileMenu.classList.contains('is-open')) {
                    navMobileMenu.setAttribute('hidden', 'true');
                }
            }, 320);
        }
    }

    function initNavbarInteractions() {
        if (navToggle) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            });
        }

        if (navMobileClose) {
            navMobileClose.addEventListener('click', (e) => {
                e.preventDefault();
                toggleMobileMenu(false);
            });
        }

        // Close when clicking mobile backdrop
        const backdrop = document.querySelector('.navbar__mobile-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', (e) => {
                e.preventDefault();
                toggleMobileMenu(false);
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMobileMenu && navMobileMenu.classList.contains('is-open')) {
                toggleMobileMenu(false);
            }
        });

        // Close drawer when any route link inside is clicked
        document.querySelectorAll('.navbar__mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu(false);
            });
        });

        // Auto close mobile drawer if resized to desktop
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 1140 && navMobileMenu && navMobileMenu.classList.contains('is-open')) {
                    toggleMobileMenu(false);
                }
            }, 100);
        });
    }

    // ═══════════════════════════════════ FAQ ACCORDION ═══════════════════════════════════

    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-item__question');
            const answerPanel = item.querySelector('.faq-item__answer');
            if (!questionBtn || !answerPanel) return;

            questionBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('faq-item--open');
                const parentList = item.closest('.faq-accordion-list') || item.parentElement;

                // Close other items in the same container for clean accordion UX
                if (parentList) {
                    parentList.querySelectorAll('.faq-item').forEach(other => {
                        if (other !== item) {
                            other.classList.remove('faq-item--open');
                            const otherBtn = other.querySelector('.faq-item__question');
                            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                        }
                    });
                }

                // Toggle current item
                if (isOpen) {
                    item.classList.remove('faq-item--open');
                    questionBtn.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('faq-item--open');
                    questionBtn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // ═══════════════════════════════════ PORTFOLIO FILTERS ═══════════════════════════════════

    function initPortfolioFilters() {
        const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
        const cards = document.querySelectorAll('.case-study-card');

        if (!filterBtns.length || !cards.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'block';
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(12px)';
                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 250);
                    }
                });
            });
        });
    }

    // ═══════════════════════════════════ SPA ROUTER & NAVIGATION ═══════════════════════════════════

    function navigateTo(hash, shouldScroll = true) {
        const cleanHash = (hash || window.location.hash || '#home').split('?')[0];
        const targetViewId = ROUTE_MAP[cleanHash] || 'page-home';

        const allViews = document.querySelectorAll('.page-view');
        let targetView = document.getElementById(targetViewId);
        if (!targetView) targetView = document.getElementById('page-home');

        allViews.forEach(view => {
            if (view === targetView) {
                view.classList.add('is-active');
                view.removeAttribute('hidden');
            } else {
                view.classList.remove('is-active');
                view.setAttribute('hidden', 'true');
            }
        });

        // Close mobile drawer if open
        toggleMobileMenu(false);

        // Update active navigation state
        updateNavActiveRoute(cleanHash, targetViewId);

        // Update Page Metadata (Title & Description for SEO)
        const meta = PAGE_METADATA[targetViewId];
        if (meta) {
            document.title = meta.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', meta.desc);
        }

        // Scroll to top
        if (shouldScroll) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Trigger animations in newly visible view
        triggerViewReveals(targetView);
        setTimeout(() => {
            if (targetView) {
                triggerViewReveals(targetView);
            }
        }, 100);
    }

    function updateNavActiveRoute(hash, viewId) {
        const routeKeyMap = {
            'page-home': 'home',
            'page-services': 'services',
            'page-programming': 'services',
            'page-cybersecurity': 'services',
            'page-social-media': 'services',
            'page-about': 'about',
            'page-portfolio': 'portfolio',
            'page-faq': 'faq',
            'page-contact': 'contact'
        };

        const currentKey = routeKeyMap[viewId] || 'home';

        document.querySelectorAll('.navbar__link').forEach(link => {
            const linkRoute = link.getAttribute('data-route');
            if (linkRoute === currentKey) {
                link.classList.add('is-active');
            } else {
                link.classList.remove('is-active');
            }
        });

        // In mobile drawer, allow specific matching
        document.querySelectorAll('.navbar__mobile-link').forEach(link => {
            const linkRoute = link.getAttribute('data-route');
            const targetRouteKey = viewId.replace('page-', '');
            if (linkRoute === targetRouteKey || linkRoute === currentKey) {
                link.classList.add('is-active');
            } else {
                link.classList.remove('is-active');
            }
        });
    }

    function initRouter() {
        // Intercept hash navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            if (ROUTE_MAP.hasOwnProperty(href)) {
                e.preventDefault();
                if (window.location.hash !== href) {
                    history.pushState(null, '', href);
                }
                navigateTo(href, true);
            }
        });

        // Browser Back / Forward buttons
        window.addEventListener('popstate', () => {
            navigateTo(window.location.hash || '#home', true);
        });

        // Initial entry route
        const initialHash = window.location.hash || '#home';
        navigateTo(initialHash, false);
    }

    // ═══════════════════════════════════ BACK TO TOP ═══════════════════════════════════

    function initBackToTop() {
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ═══════════════════════════════════ THROTTLE HELPER ═══════════════════════════════════

    function throttle(fn, delay) {
        let last = 0;
        return function (...args) {
            const now = Date.now();
            if (now - last >= delay) {
                last = now;
                fn.apply(this, args);
            }
        };
    }

    window.addEventListener('scroll', throttle(handleScrollEffects, 50), { passive: true });

    // ═══════════════════════════════════ COPY TO CLIPBOARD & TOAST ═══════════════════════════════════

    function showToast(message) {
        let toast = document.getElementById('appToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'appToast';
            toast.className = 'app-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `
            <svg viewBox="0 0 20 20" fill="#10B981" width="18" height="18" style="flex-shrink:0;">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>${message}</span>
        `;
        toast.classList.add('app-toast--visible');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('app-toast--visible');
        }, 3000);
    }

    function initCopyButtons() {
        document.addEventListener('click', (e) => {
            const copyBtn = e.target.closest('[data-copy]');
            if (!copyBtn) return;
            e.preventDefault();
            const textToCopy = copyBtn.getAttribute('data-copy');
            if (!textToCopy) return;

            const originalHtml = copyBtn.innerHTML;
            copyBtn.setAttribute('disabled', 'true');
            copyBtn.style.opacity = '0.7';

            const finalizeCopy = () => {
                showToast(`تم نسخ: ${textToCopy} بنجاح!`);
                setTimeout(() => {
                    copyBtn.removeAttribute('disabled');
                    copyBtn.style.opacity = '1';
                }, 1000);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(finalizeCopy).catch(() => {
                    fallbackCopy(textToCopy, finalizeCopy);
                });
            } else {
                fallbackCopy(textToCopy, finalizeCopy);
            }
        });
    }

    function fallbackCopy(text, callback) {
        try {
            const tempInput = document.createElement('input');
            tempInput.value = text;
            tempInput.style.position = 'fixed';
            tempInput.style.opacity = '0';
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            if (callback) callback();
        } catch (err) {
            showToast(`المعرف: ${text}`);
        }
    }

    // ═══════════════════════════════════ INITIALIZATION ═══════════════════════════════════

    function init() {
        handleScrollEffects();
        initScrollReveal();
        initNavbarInteractions();
        initFAQ();
        initPortfolioFilters();
        initBackToTop();
        initCopyButtons();
        initRouter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

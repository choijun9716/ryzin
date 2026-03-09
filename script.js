document.addEventListener('DOMContentLoaded', () => {

    // 0-1. Initialize Lenis (Smooth Scroll)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 2.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 0.8,
            smoothTouch: true,
            touchMultiplier: 1.2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Update anchor links to use Lenis scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                lenis.scrollTo(this.getAttribute('href'));
            });
        });
    }

    // 0-2. Custom Cursor Logic (Desktop only behavior injected via CSS hiding default)
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Move dot instantly
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Follower trailing animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;

            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Premium Hover effects on interactables
        const interactables = document.querySelectorAll('a, button, .portfolio-item');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-active');
                follower.classList.add('hover-active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-active');
                follower.classList.remove('hover-active');
            });
        });
    }

    // 1. Navbar Scroll Effect (Minimalist)
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section')).filter(s => s.id);
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle Mobile Menu
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle hamburger icon if using feather icons
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.setAttribute('data-feather', 'x');
                } else {
                    icon.setAttribute('data-feather', 'menu');
                }
                feather.replace(); // Refresh icon
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 2. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing if you only want it to reveal once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.fade-up, .fade-in');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Simple Interaction for Pricing Cards
    const priceCards = document.querySelectorAll('.price-table');

    priceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Remove active class from all
            priceCards.forEach(c => {
                c.classList.remove('p-active');
                c.querySelector('.p-name').classList.remove('text-pure');
                c.querySelector('.p-single').classList.remove('text-pure');
            });
            // Add to hovered
            card.classList.add('p-active');
            card.querySelector('.p-name').classList.add('text-pure');
            card.querySelector('.p-single').classList.add('text-pure');
        });
    });

    // 4. Portfolio Slider & Filters
    const portfolioSlider = document.getElementById('portfolioSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Portfolio Filtering Logic
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Reset slider to the beginning when filtering
                if (portfolioSlider) {
                    portfolioSlider.scrollTo({ left: 0, behavior: 'smooth' });
                }
            });
        });
    }

    if (portfolioSlider && prevBtn && nextBtn) {
        const itemWidth = 344; // Includes gap and paddings
        let autoSlideInterval;
        let isReversing = false;

        const slideNext = () => {
            // Check if reached the right end
            if (portfolioSlider.scrollLeft + portfolioSlider.clientWidth >= portfolioSlider.scrollWidth - 10) {
                isReversing = true;
                slidePrev();
            } else {
                isReversing = false;
                portfolioSlider.scrollBy({ left: itemWidth, behavior: 'smooth' });
            }
        };

        const slidePrev = () => {
            // Check if reached the left start
            if (portfolioSlider.scrollLeft <= 5) {
                isReversing = false;
                slideNext();
            } else {
                isReversing = true;
                portfolioSlider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
            }
        };

        const autoSlide = () => {
            if (isReversing) {
                slidePrev();
            } else {
                slideNext();
            }
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(autoSlide, 3000); // 3초마다 슬라이드
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        prevBtn.addEventListener('click', slidePrev);
        nextBtn.addEventListener('click', slideNext);

        // 마우스를 올리면 자동 슬라이드 일시 정지
        portfolioSlider.addEventListener('mouseenter', stopAutoSlide);
        // 모바일 터치 시에도 일시 정지 (선택 사항 - 부드러운 스크롤을 위해 추가)
        portfolioSlider.addEventListener('touchstart', stopAutoSlide);

        portfolioSlider.addEventListener('mouseleave', startAutoSlide);
        portfolioSlider.addEventListener('touchend', startAutoSlide);

        // 첫 시작 시 자동 슬라이드 동작
        startAutoSlide();
    }

    // Studio Slider Logic
    const studioSlider = document.getElementById('studioSlider');
    const studioPrevBtn = document.getElementById('studioPrevBtn');
    const studioNextBtn = document.getElementById('studioNextBtn');

    if (studioSlider && studioPrevBtn && studioNextBtn) {
        let studioAutoSlideInterval;
        let isStudioReversing = false;

        const getStudioItemWidth = () => {
            const firstItem = studioSlider.querySelector('.studio-item');
            return firstItem ? firstItem.offsetWidth + 24 : 800; // width + gap
        };

        const slideStudioNext = () => {
            const itemWidth = getStudioItemWidth();
            // Check if reached the right end
            if (studioSlider.scrollLeft + studioSlider.clientWidth >= studioSlider.scrollWidth - 10) {
                isStudioReversing = true;
                slideStudioPrev();
            } else {
                isStudioReversing = false;
                studioSlider.scrollBy({ left: itemWidth, behavior: 'smooth' });
            }
        };

        const slideStudioPrev = () => {
            const itemWidth = getStudioItemWidth();
            // Check if reached the left start
            if (studioSlider.scrollLeft <= 5) {
                isStudioReversing = false;
                slideStudioNext();
            } else {
                isStudioReversing = true;
                studioSlider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
            }
        };

        const autoStudioSlide = () => {
            if (isStudioReversing) {
                slideStudioPrev();
            } else {
                slideStudioNext();
            }
        };

        const startStudioAutoSlide = () => {
            studioAutoSlideInterval = setInterval(autoStudioSlide, 4000); // 4초마다 슬라이드
        };

        const stopStudioAutoSlide = () => {
            clearInterval(studioAutoSlideInterval);
        };

        studioPrevBtn.addEventListener('click', slideStudioPrev);
        studioNextBtn.addEventListener('click', slideStudioNext);

        studioSlider.addEventListener('mouseenter', stopStudioAutoSlide);
        studioSlider.addEventListener('touchstart', stopStudioAutoSlide);

        studioSlider.addEventListener('mouseleave', startStudioAutoSlide);
        studioSlider.addEventListener('touchend', startStudioAutoSlide);

        startStudioAutoSlide();
    }

    // 5. Scroll Text Reveal Effect
    const scrollRevealContainer = document.getElementById('scrollRevealContainer');
    const scrollRevealText = document.getElementById('scrollRevealText');

    if (scrollRevealContainer && scrollRevealText) {
        const spans = Array.from(scrollRevealText.querySelectorAll('span, strong'));

        const handleScrollReveal = () => {
            const rect = scrollRevealContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // The total scroll distance within the container
            const totalScrollable = rect.height - windowHeight;
            let progress = 0;

            if (rect.top > 0) {
                // Not reached the pinning point yet
                progress = 0;
            } else if (Math.abs(rect.top) >= totalScrollable) {
                // Passed the pinning point, text fully revealed
                progress = 1;
            } else {
                // Currently pinned and scrolling
                progress = Math.abs(rect.top) / totalScrollable;
            }

            const total = spans.length;

            // To make the transition feel more natural, add a small buffer at start and end
            let adjustedProgress = (progress - 0.1) / 0.8;
            adjustedProgress = Math.max(0, Math.min(1, adjustedProgress));

            const highlightCount = Math.floor(adjustedProgress * total);

            spans.forEach((span, index) => {
                const isStrong = span.tagName.toLowerCase() === 'strong';
                if (index < highlightCount) {
                    span.style.color = isStrong ? 'var(--text-pure)' : 'var(--text-primary)';
                    if (isStrong) span.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.4)';
                    span.style.fontWeight = isStrong ? '800' : '600'; // 활성화 시 폰트 두께 업
                } else {
                    span.style.color = 'rgba(255, 255, 255, 0.15)';
                    if (isStrong) span.style.textShadow = 'none';
                    span.style.fontWeight = isStrong ? '600' : '300'; // 미활성 시 기본 두께 유지
                }
            });
        };

        window.addEventListener('scroll', handleScrollReveal, { passive: true });
        window.addEventListener('resize', handleScrollReveal, { passive: true });
        handleScrollReveal(); // 초기 진입 시 체킹
    }



    (function () { var w = window; if (w.ChannelIO) { return w.console.error("ChannelIO script included twice."); } var ch = function () { ch.c(arguments); }; ch.q = []; ch.c = function (args) { ch.q.push(args); }; w.ChannelIO = ch; function l() { if (w.ChannelIOInitialized) { return; } w.ChannelIOInitialized = true; var s = document.createElement("script"); s.type = "text/javascript"; s.async = true; s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js"; var x = document.getElementsByTagName("script")[0]; if (x.parentNode) { x.parentNode.insertBefore(s, x); } } if (document.readyState === "complete") { l(); } else { w.addEventListener("DOMContentLoaded", l); w.addEventListener("load", l); } })();

    ChannelIO('boot', {
        "pluginKey": "33157f92-9ee2-4c09-9776-c7daa26b5f25"
    });

});



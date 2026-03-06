document.addEventListener('DOMContentLoaded', () => {

    // 0-1. Initialize Lenis (Smooth Scroll)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
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

    // 4. Portfolio Slider
    const portfolioSlider = document.getElementById('portfolioSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (portfolioSlider && prevBtn && nextBtn) {
        const itemWidth = 344;
        let autoSlideInterval;

        const slideNext = () => {
            // Check if reached the end
            if (portfolioSlider.scrollLeft + portfolioSlider.clientWidth >= portfolioSlider.scrollWidth - 10) {
                // If at the end, smoothly scroll back to start
                portfolioSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                portfolioSlider.scrollBy({ left: itemWidth, behavior: 'smooth' });
            }
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(slideNext, 3000); // 3초마다 슬라이드
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        prevBtn.addEventListener('click', () => {
            portfolioSlider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            slideNext();
        });

        // 마우스를 올리면 자동 슬라이드 일시 정지
        portfolioSlider.addEventListener('mouseenter', stopAutoSlide);
        portfolioSlider.addEventListener('mouseleave', startAutoSlide);

        // 첫 시작 시 자동 슬라이드 동작
        startAutoSlide();
    }

    // 5. Scroll Text Reveal Effect
    const scrollRevealText = document.getElementById('scrollRevealText');
    if (scrollRevealText) {
        const spans = Array.from(scrollRevealText.querySelectorAll('span, strong'));

        const handleScrollReveal = () => {
            const rect = scrollRevealText.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = windowHeight * 0.85;
            const end = windowHeight * 0.3;

            let progress = (start - rect.top) / (start - end);
            progress = Math.max(0, Math.min(1, progress));

            const total = spans.length;
            const highlightCount = Math.floor(progress * total);

            spans.forEach((span, index) => {
                const isStrong = span.tagName.toLowerCase() === 'strong';
                if (index < highlightCount) {
                    span.style.color = isStrong ? 'var(--text-pure)' : 'var(--text-primary)';
                    if (isStrong) span.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.4)';
                } else {
                    span.style.color = 'rgba(255, 255, 255, 0.15)';
                    if (isStrong) span.style.textShadow = 'none';
                }
            });
        };

        window.addEventListener('scroll', handleScrollReveal, { passive: true });
        handleScrollReveal(); // 초기 진입 시 체킹
    }

    // 7. Smart ROI Calculator Logic
    const elCamera = document.getElementById('cCamera');
    const elBanner = document.getElementById('cBanner');
    const elTime = document.getElementById('cTime');
    const elShowhost = document.getElementById('cShowhost');
    const elAds = document.getElementById('cAds');

    // Text Elements
    const tCam = document.getElementById('cCamText');
    const tBan = document.getElementById('cBanText');
    const tTime = document.getElementById('cTimeText');

    const rPkgName = document.getElementById('rPkgName');
    const rPkgDesc = document.getElementById('rPkgDesc');
    const rPkgPrice = document.getElementById('rPkgPrice');
    const rTotal = document.getElementById('rTotal');
    const rFooterText = document.getElementById('rFooterText');

    if (elCamera && elBanner && elTime && rTotal) {
        const PACKAGES = {
            mobile: { name: '모바일 LIVE', price: 250000, baseCamera: 1, baseBanner: 0, desc: '거품을 쏙 뺀 가장 경제적인 송출 위주의 라이브 패키지입니다.' },
            starter: { name: '스타터 LIVE', price: 450000, baseCamera: 1, baseBanner: 5, desc: '배너와 기본 구성을 갖춘 스탠다드 라이브 패키지입니다.' },
            ryzin: { name: '라이즈 LIVE', price: 750000, baseCamera: 3, baseBanner: 10, desc: '다양한 카메라 구도와 풀옵션을 제공하는 프리미엄 패키지입니다.' }
        };

        const formatNum = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const updateCalc = () => {
            const cameras = parseInt(elCamera.value);
            const banners = parseInt(elBanner.value) || 0;
            const timeMins = parseInt(elTime.value);
            const needShowhost = elShowhost.checked;
            const needAds = elAds.checked;

            tCam.innerText = cameras;
            tBan.innerText = banners;
            tTime.innerText = timeMins;

            let targetPkg = PACKAGES.mobile;
            if (cameras >= 3) {
                targetPkg = PACKAGES.ryzin;
            } else if (cameras === 2 || banners >= 5) {
                targetPkg = PACKAGES.starter;
            }

            let currentTotal = targetPkg.price;

            const extraBanners = Math.max(0, banners - targetPkg.baseBanner);
            currentTotal += (extraBanners * 5000);

            const extraTime = Math.max(0, timeMins - 60);
            const extraTimeSlots = Math.floor(extraTime / 10);
            currentTotal += (extraTimeSlots * 10000);

            if (needShowhost) {
                currentTotal += 200000;
            }

            rPkgName.innerText = targetPkg.name;
            rPkgDesc.innerText = targetPkg.desc;
            rPkgPrice.innerText = formatNum(targetPkg.price);

            rTotal.style.opacity = '0.5';
            setTimeout(() => {
                rTotal.innerText = formatNum(currentTotal);
                rTotal.style.opacity = '1';
            }, 50);

            rFooterText.innerHTML = `지금 <strong>${targetPkg.name}</strong> 패키지로 완벽한 라이브를 준비해 보세요.`;
        };

        [elCamera, elBanner, elTime, elShowhost, elAds].forEach(el => {
            el.addEventListener('input', updateCalc);
            el.addEventListener('change', updateCalc);
        });

        updateCalc();
    }

    (function () { var w = window; if (w.ChannelIO) { return w.console.error("ChannelIO script included twice."); } var ch = function () { ch.c(arguments); }; ch.q = []; ch.c = function (args) { ch.q.push(args); }; w.ChannelIO = ch; function l() { if (w.ChannelIOInitialized) { return; } w.ChannelIOInitialized = true; var s = document.createElement("script"); s.type = "text/javascript"; s.async = true; s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js"; var x = document.getElementsByTagName("script")[0]; if (x.parentNode) { x.parentNode.insertBefore(s, x); } } if (document.readyState === "complete") { l(); } else { w.addEventListener("DOMContentLoaded", l); w.addEventListener("load", l); } })();

    ChannelIO('boot', {
        "pluginKey": "33157f92-9ee2-4c09-9776-c7daa26b5f25"
    });

});



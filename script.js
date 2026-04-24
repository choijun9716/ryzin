document.addEventListener('DOMContentLoaded', () => {


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

    async function loadPortfolio() {
        try {
            const response = await fetch('./portfolio.json');
            const data = await response.json();
            
            if (portfolioSlider) {
                portfolioSlider.innerHTML = ''; // Clear existing
                data.forEach(item => {
                    const itemEl = document.createElement('a');
                    itemEl.href = item.link;
                    itemEl.className = 'portfolio-item';
                    itemEl.setAttribute('data-category', item.category);
                    itemEl.target = '_blank';
                    
                    itemEl.innerHTML = `
                        <div class="p-img-wrapper">
                            <img src="${item.image}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1584362924585-cdb273ff5f3e?q=80&w=400&h=700&fit=crop'">
                        </div>
                        <div class="p-info">
                            <h3>${item.title}</h3>
                            <p data-i18n="${item.tagKey}">${item.title}</p>
                        </div>
                        <div class="p-overlay-icon"><i data-feather="play-circle"></i></div>
                    `;
                    portfolioSlider.appendChild(itemEl);
                });
                
                // Re-initialize icons and hover effects
                if (typeof feather !== 'undefined') feather.replace();
                
                const newItems = portfolioSlider.querySelectorAll('.portfolio-item');
                newItems.forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        if (cursor && follower) {
                            cursor.classList.add('hover-active');
                            follower.classList.add('hover-active');
                        }
                    });
                    el.addEventListener('mouseleave', () => {
                        if (cursor && follower) {
                            cursor.classList.remove('hover-active');
                            follower.classList.remove('hover-active');
                        }
                    });
                });

                // Apply current language
                const currentLang = langToggleBtn ? langToggleBtn.textContent.toLowerCase() : 'ko';
                document.querySelectorAll('#portfolioSlider [data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (translations[currentLang] && translations[currentLang][key]) {
                        el.innerHTML = translations[currentLang][key];
                    }
                });
            }
        } catch (err) {
            console.error('Portfolio load error:', err);
        }
    }

    loadPortfolio();

    // Portfolio Filtering Logic
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                const portfolioItems = document.querySelectorAll('.portfolio-item');

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

    // 5. Pricing Toggle Logic
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const priceTables = document.querySelectorAll('.pricing-display-area .price-table');
    const tabSlider = document.querySelector('.tab-slider');

    function updateTabSlider() {
        const activeTab = document.querySelector('.pricing-tab.active');
        if (activeTab && tabSlider) {
            tabSlider.style.width = activeTab.offsetWidth + 'px';
            tabSlider.style.transform = `translateX(${activeTab.offsetLeft - activeTab.parentElement.offsetLeft - 6}px)`;
        }
    }

    if (pricingTabs.length > 0) {
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-target');

                // Update Tabs
                pricingTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update Tables
                priceTables.forEach(table => {
                    table.classList.remove('active');
                    if (table.id === targetId) {
                        table.classList.add('active');
                    }
                });

                updateTabSlider();
            });
        });

        // Initial setup
        setTimeout(updateTabSlider, 100); 
        window.addEventListener('resize', updateTabSlider);
    }

    // 6. Scroll Text Reveal Effect
    const scrollRevealContainer = document.getElementById('scrollRevealContainer');
    const scrollRevealText = document.getElementById('scrollRevealText');

    if (scrollRevealContainer && scrollRevealText) {
        const handleScrollReveal = () => {
            const spans = Array.from(scrollRevealText.querySelectorAll('span, strong'));
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

    
    // 6. Theme Toggle (REMOVED)
    
    // 7. Language Toggle Full
    const langToggleBtn = document.getElementById('langToggleBtn');
    const langMenu = document.getElementById('langMenu');
    const langLinks = document.querySelectorAll('.lang-menu a');

    const translations = {
        ko: {
            nav_service: "서비스",
            nav_portfolio: "포트폴리오",
            nav_pricing: "제작비용",
            nav_contact: "문의",
            nav_contact_btn: "상담 문의",
            hero_badge: "라이브커머스 에이전시",
            hero_title: "감도높은<br>라이브커머스",
            hero_desc: "기획부터 연출, 세일즈까지<br>반복적인 업무를 버리고 데이터 기반의 의사결정으로<br>브랜드에 완벽하게 맞는 라이브커머스를 설계합니다.",
            hero_btn_inquiry: '라이브 문의하기 <i data-feather="arrow-right" class="icon-sm"></i>',
            hero_btn_portfolio: "포트폴리오",
            about_title: "라이브만 아니라<br>브랜드의 성장을 만듭니다",
            about_desc: "<span>라이진(RYZIN)은</span> <span>'Rise'와</span> <span>'Line'을</span> <span>결합한</span> <span>이름으로,</span><br><span>브랜드가</span> <span>한</span> <span>단계</span> <span>위로</span> <span>성장할</span> <span>수</span> <span>있도록</span><br><span>전략적인</span> <span>라이브커머스를</span> <span>제작하는</span> <strong>전문 콘텐츠 스튜디오</strong><span>입니다.</span>",
            about_feat1: "기획 중심 설계",
            about_feat2: "감도 높은 VMD 연출",
            about_feat3: "데이터 기반 성과 분석",
            about_feat4: "자체 스튜디오 운영",
            target_badge: "Target",
            target_title: "이런 브랜드에게 필요합니다",
            target_1: "라이브 매출이<br><strong>들쑥날쑥한 브랜드</strong>",
            target_2: "감도 없는 방송 연출에<br><strong>아쉬움이 있었던 브랜드</strong>",
            target_3: "단순 판매가 아닌<br><strong>브랜딩을 원하는 브랜드</strong>",
            target_4: "첫 라이브를<br><strong>체계적 진행원하는 브랜드</strong>",
            process_badge: "Process",
            process_title: "체계적인 15일 프로세스",
            process_desc: "모든 과정은 <strong>PD 1:1 전담 케어 시스템</strong>으로 밀착 관리됩니다.",
            proc_1_t: "방송 일정 픽스 & 계약 진행",
            proc_1_d: "목표 일정 수립 및 진행을 위한 행정 절차 완료",
            proc_2_t: "라이브 혜택 설계 & 제품 리스트업",
            proc_2_d: "타겟 고객에 맞춘 최적의 SKU 및 프로모션 기획",
            proc_3_t: "사전 미팅 (Zoom)",
            proc_3_d: "메인 제품 및 혜택 최종 확정, 연출 방향성 협의",
            proc_4_t: "라이브 등록 및 세팅",
            proc_4_d: "방송 플랫폼 페이지 생성 및 최적화 쇼호스트 매칭",
            proc_5_t: "방송 구성안 / 큐시트 제작",
            proc_5_d: "방송 상세 스크립트 작성 및 PIP 배너 / 디자인 공유",
            proc_6_t: "라이브 샘플 수령",
            proc_6_d: "방송 시연용 제품 컨디션 체크 및 VMD 소품 세팅 준비",
            proc_7_t: "라이브 온에어",
            proc_7_d: "전문 인력 투입 송출 및 사후 리포트 제공 (성과 분석 포함)",
            str_badge: "Strengths",
            str_title: "라이진만의 강점",
            str_1_t: "영상 기획 제작",
            str_1_d: "편집 · 보정 · 디자인 실행까지 원스톱",
            str_2_t: "감도 높은 VMD",
            str_2_d: "단순 진열을 넘어 브랜드 가치를 올리는 고급 연출",
            str_3_t: "데이터 분석",
            str_3_d: "자체 제작 분석툴로 실시간 성과 측정",
            str_4_t: "AI 기반 제작",
            str_4_d: "기획 단계부터 라이브 최적화 설계",
            str_5_t: "자체 스튜디오 보유",
            str_5_d: "네트워크 다중화, 라이브 송출 최적 환경 구축",
            port_badge: "Portfolio",
            port_title: "라이브 레퍼런스",
            port_desc: "라이진이 기획하고 제작한 성공적인 라이브 프로젝트입니다.<br>이미지를 클릭하시면 실제 라이브 방송으로 이동합니다.",
            tag_beauty: "뷰티",
            tag_innerbeauty: "이너뷰티/건기식",
            tag_fashion: "패션/스니커즈",
            tag_food: "푸드",
            tag_health: "건기식",
            studio_badge: "Studio",
            studio_title: "자체 스튜디오",
            studio_desc: "최적의 라이브 환경을 제공하는 라이진 스튜디오를 만나보세요.",
            tag_fashion_misc: "패션/잡화",
            tag_life: "라이프/리빙",
            tag_pet: "반려동물",
            tag_life_goods: "라이프/굿즈",
            tag_food_dessert: "식품/디저트",
            tag_food_traditional: "식품/전통과자",
            tag_inositol: "건기식/이노시톨",
            tag_salad: "푸드/샐러드",
            tag_enzyme: "건기식/효소",
            price_badge: "Pricing",
            price_title: "제작 패키지 안내",
            price_VAT: "VAT 별도 기준",
            p1_name: "모바일 LIVE",
            p1_price: "1회 <span>250,000</span>원",
            p_opt: "기본 옵션 : 스튜디오 제공 + 쇼호스트 1인 <span></span>",
            p_60m: '<i data-feather="check"></i> 60분 라이브 진행',
            p1_f2: '<i data-feather="check"></i> 모바일 송출 1대 운용',
            p1_f3: '<i data-feather="check"></i> 제품 SKU 3개 한정',
            p1_f4: '<i data-feather="plus"></i> VMD 1단 ',
            p2_name: "스타터 LIVE",
            p2_price: "1회 <span>450,000</span>원",
            p2_f2: '<i data-feather="check"></i> 4K 카메라 1대',
            p2_f3: '<i data-feather="check"></i> PIP 배너5장',
            p2_f4: '<i data-feather="check"></i> 제품 SKU 5개',
            p2_f5: '<i data-feather="plus"></i> VMD 2단 ',
            p3_name: "라이즈 LIVE",
            p3_price: "1회 <span>750,000</span>원",
            p3_f1: '<i data-feather="check"></i> 70분 라이브 진행',
            p3_f2: '<i data-feather="check"></i> 4K 카메라 2대',
            p3_f3: '<i data-feather="check"></i> PIP 배너10장 / CG 이펙트 ',
            p3_f4: '<i data-feather="check"></i> 제품 SKU 제한없음',
            p3_f5: '<i data-feather="plus" class="text-pure"></i> 브랜드 맞춤형 VMD',
            client_title: "라이진과 함께한 브랜드사",
            cta_title: "브랜드와 성장하는,<br>라이진이 함께합니다.",
            cta_btn: '지금 라이브 문의하기 <i data-feather="arrow-right" class="icon-sm"></i>',
            contact_btn: '상담 문의',
            c_phone: "전화 문의 ",
            c_email: "이메일 문의",
            f_info: "대표 : 채이준 <br> 사업자 등록번호 : 821-29-011-97<br> 주소 : 경기도 하남시 미사강변동로 100-1 미사역 파라곤스퀘어 2064-2<br> 이메일 : choijun@ryzincorp.com",
            f_insta: "인스타그램",
            f_blog: "블로그",
            f_career: "채용",
            f_copy: "© 2025 RYZIN Production. All rights reserved.",
            f_terms: "이용약관",
            f_privacy: "개인정보처리방침"
        },
        en: {
            nav_service: "Services",
            nav_portfolio: "Portfolio",
            nav_pricing: "Pricing",
            nav_contact: "Contact",
            nav_contact_btn: "Contact Us",
            hero_badge: "Live Commerce Agency",
            hero_title: "High-Sensitivity<br>Live Commerce",
            hero_desc: "From planning to production and sales.<br>Eliminate repetitive tasks and design perfect<br>live commerce tailored to your brand via data-driven decisions.",
            hero_btn_inquiry: 'Inquire Now <i data-feather="arrow-right" class="icon-sm"></i>',
            hero_btn_portfolio: "Portfolio",
            about_title: "We create brand growth,<br>not just live commerce",
            about_desc: "<span>RYZIN,</span> <span>combining</span> <span>'Rise'</span> <span>and</span> <span>'Line',</span> <span>is</span> <span>a</span> <strong>specialized content studio</strong><br><span>that</span> <span>produces</span> <span>strategic</span> <span>live</span> <span>commerce</span> <span>to</span> <span>help</span><br><span>brands</span> <span>elevate</span> <span>to</span> <span>the</span> <span>next</span> <span>level.</span>",
            about_feat1: "Planning-centric Design",
            about_feat2: "High-sensitivity VMD",
            about_feat3: "Data-driven Analysis",
            about_feat4: "In-house Studio Operation",
            target_badge: "Target",
            target_title: "Recommended for Brands That:",
            target_1: "Experience<br><strong>inconsistent sales</strong>",
            target_2: "Are dissatisfied with<br><strong>poor broadcast quality</strong>",
            target_3: "Want branding,<br><strong>not just selling</strong>",
            target_4: "Need systematic<br><strong>first live broadcasts</strong>",
            process_badge: "Process",
            process_title: "Systematic 15-Day Process",
            process_desc: "Every step is closely managed via our <strong>1:1 PD Dedicated Care System</strong>.",
            proc_1_t: "Schedule Fix & Contract",
            proc_1_d: "Set target schedules and complete administrative procedures.",
            proc_2_t: "Benefits Design & Product List-up",
            proc_2_d: "Optimal SKU and promotion planning tailored to target customers.",
            proc_3_t: "Pre-meeting (Zoom)",
            proc_3_d: "Finalize main products, benefits, and production directions.",
            proc_4_t: "Live Registration & Setup",
            proc_4_d: "Create broadcast pages and match optimized show hosts.",
            proc_5_t: "Script / Cue Sheet Creation",
            proc_5_d: "Write detailed scripts and share PIP banner designs.",
            proc_6_t: "Receive Live Samples",
            proc_6_d: "Check product conditions for broadcast and prepare VMD props.",
            proc_7_t: "Live On-Air",
            proc_7_d: "Deploy professional staff and provide post-reports (with analytics).",
            str_badge: "Strengths",
            str_title: "Our Strengths",
            str_1_t: "Video Planning & Production",
            str_1_d: "One-stop service from editing, correction to design.",
            str_2_t: "High-sensitivity VMD",
            str_2_d: "Premium production elevating brand value beyond simple display.",
            str_3_t: "Data Analysis",
            str_3_d: "Real-time performance measurement with in-house tools.",
            str_4_t: "AI-based Production",
            str_4_d: "Optimized live design from the planning stage.",
            str_5_t: "In-house Studio",
            str_5_d: "Network redundancy, optimal broadcasting environment.",
            port_badge: "Portfolio",
            port_title: "Live References",
            port_desc: "Successful live projects planned and produced by RYZIN.<br>Click images to navigate to the actual live broadcast.",
            tag_beauty: "Beauty",
            tag_innerbeauty: "Inner Beauty / Supplement",
            tag_fashion: "Fashion / Sneakers",
            tag_food: "Food",
            tag_health: "Supplement",
            studio_badge: "Studio",
            studio_title: "In-house Studio",
            studio_desc: "Discover RYZIN Studio, providing the optimal live broadcasting environment.",
            tag_fashion_misc: "Fashion/Misc.",
            tag_life: "Life/Living",
            tag_pet: "Pets",
            tag_life_goods: "Life/Goods",
            tag_food_dessert: "Food/Dessert",
            tag_food_traditional: "Food/Traditional Sweets",
            tag_inositol: "Supplement/Inositol",
            tag_salad: "Food/Salad",
            tag_enzyme: "Supplement/Enzyme",
            price_badge: "Pricing",
            price_title: "Production Packages",
            price_VAT: "VAT Excluded",
            p1_name: "Mobile LIVE",
            p1_price: "1 Session <span>250,000</span> KRW",
            p_opt: "Basic Option : Studio + 1 Show Host <span></span>",
            p_60m: '<i data-feather="check"></i> 60-min Live Broadcast',
            p1_f2: '<i data-feather="check"></i> 1 Mobile Camera',
            p1_f3: '<i data-feather="check"></i> Limit: 3 Product SKUs',
            p1_f4: '<i data-feather="plus"></i> 1-Tier VMD ',
            p2_name: "Starter LIVE",
            p2_price: "1 Session <span>450,000</span> KRW",
            p2_f2: '<i data-feather="check"></i> 1 4K Camera',
            p2_f3: '<i data-feather="check"></i> 5 PIP Banners',
            p2_f4: '<i data-feather="check"></i> 5 Product SKUs',
            p2_f5: '<i data-feather="plus"></i> 2-Tier VMD ',
            p3_name: "Rise LIVE",
            p3_price: "1 Session <span>750,000</span> KRW",
            p3_f1: '<i data-feather="check"></i> 70-min Live Broadcast',
            p3_f2: '<i data-feather="check"></i> 2 4K Cameras',
            p3_f3: '<i data-feather="check"></i> 10 PIP Banners / CG Effects ',
            p3_f4: '<i data-feather="check"></i> Unlimited Product SKUs',
            p3_f5: '<i data-feather="plus" class="text-pure"></i> Brand Custom VMD',
            client_title: "Brands We Worked With",
            cta_title: "Growing alongside brands,<br>RYZIN is with you.",
            cta_btn: 'Inquire for Live Broadcasting <i data-feather="arrow-right" class="icon-sm"></i>',
            contact_btn: 'Contact Us',
            c_phone: "Phone Inquiry ",
            c_email: "Email Inquiry",
            f_info: "CEO: Chae I-Jun <br> Business Registration Num: 821-29-011-97<br> Address: Misa Paragon Square 2064-2, 100-1 Misagangbyeondong-ro, Hanam-si, Gyeonggi-do<br> Email: choijun@ryzincorp.com",
            f_insta: "Instagram",
            f_blog: "Blog",
            f_career: "Careers",
            f_copy: "© 2025 RYZIN Production. All rights reserved.",
            f_terms: "Terms of Service",
            f_privacy: "Privacy Policy"
        },
        zh: {
            nav_service: "服务",
            nav_portfolio: "项目组合",
            nav_pricing: "价格包",
            nav_contact: "联系",
            nav_contact_btn: "咨询我们",
            hero_badge: "直播电商代理",
            hero_title: "高品质<br>直播电商",
            hero_desc: "从企划到制作再到销售。<br>摒弃繁琐工作，利用数据驱动的决策，<br>为您定制完美符合品牌的直播方案。",
            hero_btn_inquiry: '立即咨询 <i data-feather="arrow-right" class="icon-sm"></i>',
            hero_btn_portfolio: "项目组合",
            about_title: "不仅是直播，更驱动品牌成长",
            about_desc: "<span>RYZIN是</span><span>'Rise'</span><span>与</span><span>'Line'</span><span>的结合体，</span><br><span>我们是一家</span><strong>专业内容工作室</strong><span>，</span><br><span>制作战略性</span><span>直播内容</span><span>以助力</span><span>品牌提升。</span>",
            about_feat1: "以企划为核心设计",
            about_feat2: "高感度VMD布景",
            about_feat3: "数据驱动分析",
            about_feat4: "自有演播室运营",
            target_badge: "目标品牌",
            target_title: "最适合以下品牌：",
            target_1: "直播销售额<br><strong>起伏不定</strong>",
            target_2: "对缺乏质感的<br><strong>直播效果感到遗憾</strong>",
            target_3: "不仅想销售，<br><strong>更想做好品牌</strong>",
            target_4: "希望系统化进行<br><strong>首次直播的品牌</strong>",
            process_badge: "流程",
            process_title: "系统化的 15天流程",
            process_desc: "所有过程均由<strong>PD 1:1专人对接管理</strong>。",
            proc_1_t: "敲定档期 & 合同推进",
            proc_1_d: "确立目标时间表及行政手续。",
            proc_2_t: "直播福利设计 & 产品清单",
            proc_2_d: "针对目标受众的优选SKU及促销策划。",
            proc_3_t: "前期沟通 (Zoom)",
            proc_3_d: "最终确定主打产品及福利、统筹制作方向。",
            proc_4_t: "直播建档 & 设置",
            proc_4_d: "生成直播预告页面及匹配优选主播。",
            proc_5_t: "脚本 / 流程单制作",
            proc_5_d: "撰写详细直播话术及分享PIP横幅设计。",
            proc_6_t: "查收直播样品",
            proc_6_d: "核对直播展示产品状态及准备VMD道具。",
            proc_7_t: "直播上线",
            proc_7_d: "投入专业人员开播并提供结案报告(含数据分析)。",
            str_badge: "优势",
            str_title: "RYZIN 独家优势",
            str_1_t: "视频企划与制作",
            str_1_d: "剪辑、修图、设计执行的一站式服务。",
            str_2_t: "高感度VMD",
            str_2_d: "超越单纯陈列，能够提升品牌价值的高级布景。",
            str_3_t: "数据分析",
            str_3_d: "利用自主研发分析工具实时测量成果。",
            str_4_t: "AI辅助制作",
            str_4_d: "从企划阶段即开始针对直播的优化设计。",
            str_5_t: "自有演播室",
            str_5_d: "网络冗余设计，构建直播推流的最优环境。",
            port_badge: "项目案例",
            port_title: "直播案例",
            port_desc: "这是RYZIN企划与制作的成功直播项目。<br>点击图片即可前往真实直播回放。",
            tag_beauty: "美妆",
            tag_innerbeauty: "口服美容/保健品",
            tag_fashion: "服饰/球鞋",
            tag_food: "食品",
            tag_health: "保健品",
            studio_badge: "演播室",
            studio_title: "自有演播室",
            studio_desc: "欢迎了解为您提供最佳直播环境的RYZIN演播室。",
            tag_fashion_misc: "时尚/杂货",
            tag_life: "生活/家居",
            tag_pet: "宠物用品",
            tag_life_goods: "生活/周边",
            tag_food_dessert: "食品/甜点",
            tag_food_traditional: "食品/传统糕点",
            tag_inositol: "保健品/肌醇",
            tag_salad: "食品/沙拉",
            tag_enzyme: "保健品/酵素",
            price_badge: "报价",
            price_title: "制作套餐说明",
            price_VAT: "不含增值税",
            p1_name: "移动端 LIVE",
            p1_price: "单场 <span>250,000</span> 韩元",
            p_opt: "基础选项 : 提供演播室 + 1名主播 <span></span>",
            p_60m: '<i data-feather="check"></i> 60分钟直播',
            p1_f2: '<i data-feather="check"></i> 1台手机开播',
            p1_f3: '<i data-feather="check"></i> 仅限3个SKU',
            p1_f4: '<i data-feather="plus"></i> 1层VMD布景 ',
            p2_name: "新手 LIVE",
            p2_price: "单场 <span>450,000</span> 韩元",
            p2_f2: '<i data-feather="check"></i> 1台4K摄像机',
            p2_f3: '<i data-feather="check"></i> 5张PIP贴片',
            p2_f4: '<i data-feather="check"></i> 5个产品SKU',
            p2_f5: '<i data-feather="plus"></i> 2层VMD布景 ',
            p3_name: "崛起 LIVE",
            p3_price: "单场 <span>750,000</span> 韩元",
            p3_f1: '<i data-feather="check"></i> 70分钟直播',
            p3_f2: '<i data-feather="check"></i> 2台4K摄像机',
            p3_f3: '<i data-feather="check"></i> 10张PIP贴片 / CG特效 ',
            p3_f4: '<i data-feather="check"></i> 产品SKU不限',
            p3_f5: '<i data-feather="plus" class="text-pure"></i> 品牌定制级VMD',
            client_title: "与RYZIN同行的品牌",
            cta_title: "与品牌共成长的<br>RYZIN与您同在。",
            cta_btn: '现在就来咨询直播吧 <i data-feather="arrow-right" class="icon-sm"></i>',
            contact_btn: '咨询我们',
            c_phone: "电话咨询 ",
            c_email: "邮箱咨询",
            f_info: "代表：Chae I-Jun <br> 营业执照：821-29-011-97<br> 地址: 韩国京畿道河南市渼沙江边东路100-1 Misa Paragon Square 2064-2<br> 邮箱：choijun@ryzincorp.com",
            f_insta: "Instagram",
            f_blog: "博客",
            f_career: "招聘",
            f_copy: "© 2025 RYZIN Production. All rights reserved.",
            f_terms: "服务条款",
            f_privacy: "隐私政策"
        }
    };


    if (langToggleBtn && langMenu) {
        langToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            langMenu.classList.remove('show');
        });

        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                langToggleBtn.textContent = lang.toUpperCase();
                
                // Apply translation
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (translations[lang] && translations[lang][key]) {
                        el.innerHTML = translations[lang][key];
                    }
                });
                window.dispatchEvent(new Event('scroll'));
            });
        });
    }

});



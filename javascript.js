// Wait for document to load
document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Smooth scrolling for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Hero carousel text change
    const heroCarousel = document.getElementById('heroCarousel');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');

    if (heroCarousel && heroTitle && heroSubtitle) {
        const heroContent = [
            {
                title: "Transforming Spaces, Creating Experiences",
                subtitle: "We specialize in designing and decorating homes, cafés, restaurants, and event spaces to match your style and purpose."
            },
            {
                title: "Modern Design Solutions for Every Space",
                subtitle: "From residential interiors to commercial spaces, we bring creativity and functionality together."
            },
            {
                title: "Making Your Dream Space a Reality",
                subtitle: "Our expert team works with you to create personalized designs that reflect your unique style and needs."
            }
        ];

        let currentSlide = 0;

        // 👉 Show first slide text immediately when page loads
        animateHeroText(currentSlide);

        // 🌀 Update text on carousel slide change
        heroCarousel.addEventListener('slid.bs.carousel', (event) => {
            currentSlide = event.to;
            animateHeroText(currentSlide);
        });

        function animateHeroText(index) {
            // Exit animation
            heroTitle.style.animation = 'fadeSlideOutDown 0.5s ease-out forwards';
            heroSubtitle.style.animation = 'fadeSlideOutDown 0.5s ease-out forwards';

            setTimeout(() => {
                // Change content
                heroTitle.textContent = heroContent[index].title;
                heroSubtitle.textContent = heroContent[index].subtitle;

                // Reset animation
                heroTitle.style.animation = 'none';
                heroSubtitle.style.animation = 'none';
                void heroTitle.offsetWidth;
                void heroSubtitle.offsetWidth;

                // Entrance animation
                heroTitle.style.animation = 'fadeSlideInUp 0.8s ease-out forwards';
                heroSubtitle.style.animation = 'fadeSlideInUp 0.8s ease-out 0.2s forwards';
            }, 500);
        }
    }


    // Services hover animation enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon i');
            icon.style.animation = 'float 2s infinite ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon i');
            icon.style.animation = 'none';
        });
    });

    // Gallery modal setup
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            const title = item.querySelector('h4').textContent;

            // Create modal dynamically
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = 'galleryModal';
            modal.tabIndex = '-1';
            modal.setAttribute('aria-hidden', 'true');

            modal.innerHTML = `
                <div class="modal-dialog modal-dialog-centered modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body w-100 h-100">
                            <img src="${imgSrc}" class=" w-100 h-100" alt="${title}">
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Initialize and show modal
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();

            // Remove modal from DOM after it's hidden
            modal.addEventListener('hidden.bs.modal', () => {
                modal.remove();
            });
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });

            if (valid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success mt-3';
                successMsg.textContent = 'Your message has been sent successfully!';

                contactForm.appendChild(successMsg);

                // Reset form
                contactForm.reset();
                inputs.forEach(input => input.classList.remove('is-valid'));

                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
        });
    }

    // Add animated counters if needed
    // Example: document.querySelectorAll('.counter').forEach(counter => {
    //    const target = parseInt(counter.getAttribute('data-target'));
    //    animateCounter(counter, target);
    // });

    // Testimonial carousel (if using one)
    // Initialize testimonial slider/carousel if needed




    // Typing effect for hero section (alternative option)
    // function typeEffect(element, text, speed) {
    //     let i = 0;
    //     element.innerHTML = '';

    //     const typing = setInterval(() => {
    //         if (i < text.length) {
    //             element.innerHTML += text.charAt(i);
    //             i++;
    //         } else {
    //             clearInterval(typing);
    //         }
    //     }, speed);
    // }

    // Example usage of typing effect (commented out)
    // const titleElement = document.querySelector('.hero-title');
    // typeEffect(titleElement, 'Transforming Spaces, Creating Experiences', 100);




    // Theme switch functionality (optional feature)
    const createThemeSwitch = () => {
        // Create theme switch button
        const themeSwitch = document.createElement('div');
        themeSwitch.className = 'theme-switch';
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';

        // Add styles
        themeSwitch.style.position = 'fixed';
        themeSwitch.style.bottom = '90px';
        themeSwitch.style.right = '30px';
        themeSwitch.style.width = '50px';
        themeSwitch.style.height = '50px';
        themeSwitch.style.borderRadius = '50%';
        themeSwitch.style.backgroundColor = 'var(--primary-color)';
        themeSwitch.style.color = 'white';
        themeSwitch.style.display = 'flex';
        themeSwitch.style.justifyContent = 'center';
        themeSwitch.style.alignItems = 'center';
        themeSwitch.style.cursor = 'pointer';
        themeSwitch.style.zIndex = '999';
        themeSwitch.style.boxShadow = 'var(--box-shadow)';
        themeSwitch.style.transition = 'var(--transition)';

        // Append to body
        document.body.appendChild(themeSwitch);

        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Add event listener
        themeSwitch.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    };

    // Uncomment to enable theme switch
    // createThemeSwitch();

    // Add loading animation to images
    function handleImageLoading() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            // Skip if image is already loaded
            if (img.complete) return;

            // Add loading class/placeholder
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            // When image loads
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });

            // Error handling
            img.addEventListener('error', () => {
                img.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                img.style.opacity = '1';
            });
        });
    }

    handleImageLoading();

    // Implement a simple parallax effect
    // function parallaxEffect() {
    //     const parallaxElements = document.querySelectorAll('parallax');

    //     window.addEventListener('scroll', () => {
    //         const scrollTop = window.scrollY;

    //         parallaxElements.forEach(element => {
    //             const speed = element.getAttribute('data-speed') || 0.5;
    //             element.style.transform = `translateY(${scrollTop * speed}px)`;
    //         });
    //     });
    // }

    // Add parallax class to elements if needed
    // parallaxEffect();




    
    // Create portfolio filter
    // function setupPortfolioFilter() {
    //     const filterButtons = document.querySelectorAll('.filter-btn');
    //     const portfolioItems = document.querySelectorAll('.gallery-item');

    //     filterButtons.forEach(button => {
    //         button.addEventListener('click', () => {
    //             // Remove active class from all buttons
    //             filterButtons.forEach(btn => btn.classList.remove('active'));

    //             // Add active class to clicked button
    //             button.classList.add('active');

    //             const filter = button.getAttribute('data-filter');

    //             // Filter items
    //             portfolioItems.forEach(item => {
    //                 if (filter === 'all') {
    //                     item.style.display = 'block';
    //                 } else {
    //                     const itemCategory = item.getAttribute('data-category');
    //                     if (itemCategory === filter) {
    //                         item.style.display = 'block';
    //                     } else {
    //                         item.style.display = 'none';
    //                     }
    //                 }
    //             });
    //         });
    //     });
    // }

    // If portfolio filter exists
    // setupPortfolioFilter();
});
  // Add sequential animation when in viewport
//   const processObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             setTimeout(() => {
//                 entry.target.classList.add('animated');
//             }, delay);
//             delay += 200;
            
//             // Unobserve after animation
//             processObserver.unobserve(entry.target);
//         }
//     });
// }, { threshold: 0.2 });

// processSteps.forEach(step => {
//     processObserver.observe(step);
// });
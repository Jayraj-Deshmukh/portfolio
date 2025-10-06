document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#nav-links a');
    const sections = document.querySelectorAll('section');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');
    const contactForm = document.getElementById('contact-form');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            if (navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const fadeObserverOptions = {
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    document.querySelectorAll('.section-container').forEach(section => {
        fadeObserver.observe(section);
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('nav-active');
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for your message! I will get back to you soon.');
        
        contactForm.reset();
    });
});
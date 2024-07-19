import { toggleMenu, generateMenu } from './menu.js';
import { generateSections } from './sections.js';
import { navigateToSection } from './navigation.js';
import { initializeI18n } from './i18n.js';

let observer;

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    fetch('../structure.json')
        .then(response => response.json())
        .then(data => {
            const lang = localStorage.getItem('lang') || 'en';
            fetch(`../locales/${lang}.json`)
                .then(response => response.json())
                .then(translations => {
                    generateMenu(data, menu, translations);
                    if (window.location.pathname.endsWith('index.html')) {
                        generateSections(data.sections)
                        .then(() => {
                            setTimeout(() => {
                                setupIntersectionObserver(); 
                                initializeI18n(observer, translations); // Inicializa la internacionalización
                            }, 500); // Agregar un retraso de 0.5 segundos antes de iniciar el observer
                        });// Configurar Intersection Observer  
                    } else {
                        handleInitialHash();
                        initializeI18n(observer, translations); // Inicializa la internacionalización
                    }// Inicializa la internacionalización
                })
                .catch(error => console.error('Error loading translations:', error));
        })
        .catch(error => console.error('Error loading structure.json:', error));

    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && menu.classList.contains('open')) {
            toggleMenu();
        }
    });

    menu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const href = e.target.getAttribute('href');
            console.log('Enlace clicado:', href);
            if (href.startsWith('#') || (href.includes('#') && href.includes('index.html'))) {
                e.preventDefault();
                console.log('Navegación interna a:', href);
                navigateToSection(href, menu);
            } else {
                e.preventDefault();
                console.log('Navegación externa a:', href);
                menu.classList.remove('open');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        }
    });

    function handleInitialHash() {
        if (window.location.hash) {
            navigateToSection(window.location.hash, menu);
        }
    }
});

function setupIntersectionObserver() {
    const options = {
        threshold: 0.1 // Activar la animación cuando el 10% del elemento esté visible
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const elements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .tracking-in-expand');
    elements.forEach(element => {
        observer.observe(element);
    });

    // Observar la image-container para añadir la clase 'animate' cuando sea visible
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(container => {
        observer.observe(container);
    });
}






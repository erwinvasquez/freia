export function initializeI18n(observer) {
    // Obtener elementos del DOM relacionados con la selección de idioma
    const langSelect = document.getElementById('lang-select');
    const currentLangImg = document.getElementById('current-lang');
    

    // Obtener el idioma predeterminado del almacenamiento local o establecerlo en inglés
    const defaultLang = localStorage.getItem('lang') || 'en';
    setLanguage(defaultLang);


    // Mostrar u ocultar la lista de idiomas al hacer clic en el icono de la bandera
    currentLangImg.addEventListener('click', function() {
        langSelect.parentNode.classList.toggle('show');
    });

    // Cambiar el idioma al hacer clic en una opción de la lista de idiomas
    langSelect.addEventListener('click', function(e) {
        const selectedLang = e.target.getAttribute('data-lang');
        if (selectedLang) {
            setLanguage(selectedLang);
            localStorage.setItem('lang', selectedLang);
            langSelect.parentNode.classList.remove('show');
        }
    });

    // Función para establecer el idioma y cargar las traducciones
    function setLanguage(lang) {
        fetch(`../locales/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                translatePage(translations);
                translateMenu(translations);
                currentLangImg.src = `../images/icons/flag-${lang}.png`;
            })
            .catch(error => console.error('Error loading language file:', error));
    }

    // Función para traducir el contenido de la página
    function translatePage(translations) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                console.log('entro a traducir')
                if (element.tagName.toLowerCase() === 'title') {
                    document.title = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            } else {
                console.warn(`Translation key "${key}" not found in locale.`);
            }
        });

        // Actualizar el contenido de las secciones (si aplica)
        // Recargar el contenido de las secciones desde sus archivos HTML
        console.log('Comienzo para recargar contenido');
        const sections = document.querySelectorAll('.section');
        console.log(sections);
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            console.log('El Id de seccion es');
            console.log(sectionId);
            fetch(`pages/sections/${sectionId}.html`)
                .then(response => response.text())
                .then(html => {
                    section.innerHTML = html;
                    // Aplicar traducciones después de recargar el contenido
                    const contentElements = section.querySelectorAll('[data-i18n]');
                    contentElements.forEach(contentElement => {
                        const key = contentElement.getAttribute('data-i18n');
                        if (translations[key]) {
                            contentElement.textContent = translations[key];
                        } else {
                            console.warn(`Translation key "${key}" not found in locale.`);
                        }
                    });
                    // Verificar clases de animación después de recargar el contenido
                    const animatedElements = section.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .tracking-in-expand');
                    animatedElements.forEach(element => {
                    console.log('Element with animation class:', element);
                    observer.observe(element); // Reobserva el elemento para las animaciones
                    });
                })
                .catch(error => console.error(`Error loading ${sectionId}.html:`, error));
        });
    }

    // Función para traducir el contenido del menú
    function translateMenu(translations) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }
}









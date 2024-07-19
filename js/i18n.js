export function translateSection(sectionElement, translations) {
    const contentElements = sectionElement.querySelectorAll('[data-i18n]');
    contentElements.forEach(contentElement => {
        const key = contentElement.getAttribute('data-i18n');
        if (translations[key]) {
            contentElement.textContent = translations[key];
        } else {
            console.warn(`Translation key "${key}" not found in locale.`);
        }
    });
}

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
                if (element.tagName.toLowerCase() === 'title') {
                    document.title = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            } else {
                console.warn(`Translation key "${key}" not found in locale.`);
            }
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







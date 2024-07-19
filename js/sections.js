// sections.js
import { translateSection } from './i18n.js';

export function generateSections(sections, translations) {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Limpiar el contenido actual

    return sections.reduce((promise, section) => {
        return promise.then(() => {
            return fetch(`pages/sections/${section.id}.html`)
                .then(response => response.text())
                .then(html => {
                    const sectionElement = document.createElement('section');
                    sectionElement.id = section.id;
                    sectionElement.classList.add('section');
                    sectionElement.innerHTML = html;
                    // Aplicar traducciones después de cargar el contenido
                    translateSection(sectionElement, translations);
                    main.appendChild(sectionElement);
                    console.log('Se cargo');
                })
                .catch(error => console.error(`Error loading ${section.id}.html:`, error));
        });
    }, Promise.resolve());
}


// menu.js
export function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
}

export function generateMenu(data, menu, translations) {
    const sectionLinks = data.sections.map(section => 
        `<a href="../index.html#${section.id}" data-i18n="${section.id}">${translations[section.id]}</a>`
    ).join('');

    const pageLinks = data.pages.map(page => 
        `<a href="../${page.url}" data-i18n="${page.name}">${translations[page.name]}</a>`
    ).join('');

    menu.innerHTML = sectionLinks + pageLinks;
}





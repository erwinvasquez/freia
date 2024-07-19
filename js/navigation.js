// navigation.js
export function navigateToSection(hash, menu) {
    const targetId = hash.includes('index.html#') ? hash.split('index.html#')[1] : hash.substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 50; // Ajuste de 50px hacia arriba
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        console.log('Cerrando menú drawer');
        menu.classList.remove('open');
    } else {
        console.log('Navegación a una sección de otra página:', hash);
        menu.classList.remove('open');
        setTimeout(() => {
            window.location.href = hash;
        }, 300);
    }
}

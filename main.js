import { widgetsData } from './widgets.js';

// Función para cargar componentes HTML en el DOM
async function loadComponent(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not fetch ${url}`);
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component for ${containerId}:`, error);
    }
}

// Función para inicializar los scripts de los componentes
function initializeScripts() {
    // Script para el header
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        });
    }

    // Script para el modal
    const modal = document.getElementById('widgetModal');
    if (modal) {
        const modalContent = document.getElementById('modalContent');
        const closeModalBtn = document.getElementById('closeModal');
        const widgetButtons = document.querySelectorAll('.feature-card');

        const modalIcon = document.getElementById('modalIcon');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');

        const openModal = (widgetKey) => {
            const data = widgetsData[widgetKey];
            if (!data) return;

            modalIcon.innerHTML = data.icon;
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;

            modal.classList.remove('opacity-0', 'pointer-events-none');
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        };

        const closeModal = () => {
            modalContent.classList.add('scale-95', 'opacity-0');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('pointer-events-none');
            }, 300);
        };

        widgetButtons.forEach(button => {
            button.addEventListener('click', () => {
                const widgetKey = button.dataset.widget;
                openModal(widgetKey);
            });
        });

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Carga todos los componentes y luego inicializa los scripts
async function bootstrapPage() {
    await Promise.all([
        loadComponent('components/header.html', 'header-container'),
        loadComponent('components/hero.html', 'hero-container'),
        loadComponent('components/features.html', 'features-container'),
        loadComponent('components/how-it-works.html', 'how-it-works-container'),
        loadComponent('components/credits.html', 'credits-container'),
        loadComponent('components/footer.html', 'footer-container'),
        loadComponent('components/modal.html', 'modal-container')
    ]);
    initializeScripts();
}

// Inicia la carga de la página
bootstrapPage();

/**
 * IBParallax API
 * Una mini librería para crear secciones hero con efectos de paralaje (Mouse + Scroll).
 * (c) Josep Mulet Pol (2026)
 */
const IBParallax = (function () {

    const createLayer = (data) => {
        const div = document.createElement('div');
        div.className = 'parallax-layer';
        div.setAttribute('data-depth', data.depth || 0.1);
        div.innerText = data.text;

        Object.assign(div.style, {
            position: 'absolute',
            pointerEvents: 'none',
            transition: 'transform 0.1s ease-out',
            fontWeight: '900',
            userSelect: 'none',
            color: data.color || '#818cf8',
            top: data.top || 'auto',
            left: data.left || 'auto',
            right: data.right || 'auto',
            bottom: data.bottom || 'auto',
            fontSize: data.fontSize || '2rem',
            opacity: data.opacity || 0.5,
            willChange: 'transform'
        });

        return div;
    };

    return {
        init: function (containerId, config) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const settings = {
                height: config.height || '350px',
                background: config.background || 'linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 50%, #fae8ff 100%)',
                unit: config.unit || 'Unitat 1',
                title: config.title || 'TITOL',
                description: config.description || 'Descripció de la unitat.',
                layers: config.layers || [],
                scrollDepth: config.scrollDepth || 500
            };

            container.className = "d-flex align-items-center justify-content-center mb-5";
            container.style.borderRadius = '20px';
            Object.assign(container.style, {
                position: 'relative',
                height: settings.height,
                background: settings.background,
                overflow: 'hidden'
            });

            // Esferas decorativas
            const sphere1 = document.createElement('div');
            Object.assign(sphere1.style, {
                position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
                width: '300px', height: '300px', top: '-50px', left: '-50px',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(255,255,255,0) 70%)'
            });

            const sphere2 = document.createElement('div');
            Object.assign(sphere2.style, {
                position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
                width: '400px', height: '400px', bottom: '-100px', right: '-50px',
                background: 'radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, rgba(255,255,255,0) 70%)'
            });

            container.appendChild(sphere1);
            container.appendChild(sphere2);

            settings.layers.forEach(layerData => {
                container.appendChild(createLayer(layerData));
            });

            const contentWrap = document.createElement('div');
            contentWrap.className = "container text-center";
            contentWrap.style.zIndex = "10";
            contentWrap.innerHTML = `
                        <p class="text-uppercase font-weight-bold mb-2" style="letter-spacing: 0.2em; font-size: 0.8rem; color: #6366f1;">${settings.unit}</p>
                        <h1 class="display-4 font-weight-bold m-0" style="color: #1e1b4b;">${settings.title}</h1>
                        <div class="mx-auto my-3" style="width: 80px; height: 6px; background: linear-gradient(to right, #6366f1, #a855f7); border-radius: 3px;"></div>
                        <p class="lead text-secondary mx-auto" style="max-width: 550px;">${settings.description}</p>
                    `;
            container.appendChild(contentWrap);

            // --- Lógica de Animación Unificada ---
            let mouseX = 0, mouseY = 0;
            let scrollFactor = 0;

            const updateParallax = () => {
                const layers = container.querySelectorAll('.parallax-layer');
                layers.forEach(layer => {
                    const depth = parseFloat(layer.getAttribute('data-depth'));

                    // Combinamos el movimiento del ratón con el desplazamiento de scroll
                    const moveX = mouseX * (depth * 140);
                    const moveY = (mouseY * (depth * 140)) + (scrollFactor * (depth * settings.scrollDepth));

                    layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            };

            // Listener para Mouse
            window.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    mouseX = ((e.clientX - rect.left) / rect.width) - 0.5;
                    mouseY = ((e.clientY - rect.top) / rect.height) - 0.5;
                    updateParallax();
                }
            });

            // Listener para Scroll
            window.addEventListener('scroll', () => {
                const rect = container.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Solo calculamos si el elemento es visible en pantalla
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    // Calculamos cuánto ha cruzado el hero la pantalla (-1 a 1)
                    scrollFactor = (rect.top / viewportHeight);
                    updateParallax();
                }
            });
        }
    };
})();
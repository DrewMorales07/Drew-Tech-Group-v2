document.addEventListener('DOMContentLoaded', function () {
    console.log('Sistema Drew Correctamente cargado');

    // ==========================================
    // 1. ALERTA DE BIENVENIDA
    // ==========================================
    alert('Te damos la bienvenida a Drew Technology Group, donde la innovación se encuentra con la excelencia. ¡Explora nuestro sitio y descubre cómo estamos construyendo el futuro!');

    // ==========================================
    // 2. RELOJ DINÁMICO EN TIEMPO REAL
    // ==========================================
    // Buscar o insertar el contenedor para el reloj en el hero header
    const heroContent = document.querySelector('.hero-content');
    let clockContainer = document.querySelector('.hero-content h4');

    if (!clockContainer && heroContent) {
        clockContainer = document.createElement('h4');
        clockContainer.style.marginTop = '15px';
        clockContainer.style.color = '#38bdf8';
        heroContent.appendChild(clockContainer);
    }

    function actualizarReloj() {
        const ahora = new Date();
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        const segundos = String(ahora.getSeconds()).padStart(2, '0');

        if (clockContainer) {
            clockContainer.textContent = `Hora actual: ${horas}:${minutos}:${segundos}`;
        }
    }

    // Ejecutar inmediatamente y actualizar cada segundo
    actualizarReloj();
    setInterval(actualizarReloj, 1000);

    // ==========================================
    // 3. DETECTAR SELECCIÓN EN <select> (servicio)
    // ==========================================
    const selectServicio = document.getElementById('servicio');

    if (selectServicio) {
        selectServicio.addEventListener('change', function (event) {
            const opcionSeleccionada = event.target.options[event.target.selectedIndex].text;
            if (event.target.value !== "") {
                console.log(`[Evento Change] Servicio seleccionado: ${opcionSeleccionada}`);
            }
        });
    }

    // ==========================================
    // 4. EVENTOS DE MOUSE EN BOTONES (mouseover / mouseleave)
    // ==========================================
    const botones = document.querySelectorAll('.btn');

    botones.forEach(function (boton) {
        boton.addEventListener('mouseover', function () {
            console.log(`[Mouseover] El usuario pasó el cursor sobre el botón: "${this.textContent.trim()}"`);
        });

        boton.addEventListener('mouseleave', function () {
            console.log(`[Mouseleave] El usuario retiró el cursor del botón: "${this.textContent.trim()}"`);
        });
    });

    // ==========================================
    // 5 & 6 & 7. VALIDACIÓN, CONFIRMACIÓN Y LOCALSTORAGE
    // ==========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            // Prevenir el envío automático del formulario
            event.preventDefault();

            // Capturar referencias de los campos
            const nombre = document.getElementById('nombre');
            const correo = document.getElementById('correo');
            const telefono = document.getElementById('telefono');
            const servicio = document.getElementById('servicio');
            const asunto = document.getElementById('asunto');
            const mensaje = document.getElementById('mensaje');

            // Validar que no existan campos vacíos
            if (
                !nombre.value.trim() ||
                !correo.value.trim() ||
                !telefono.value.trim() ||
                !servicio.value.trim() ||
                !asunto.value.trim() ||
                !mensaje.value.trim()
            ) {
                alert('Por favor, completa todos los campos del formulario antes de enviar.');
                return;
            }

            // Construir el objeto con la información ingresada
            const datosFormulario = {
                nombre: nombre.value.trim(),
                correo: correo.value.trim(),
                telefono: telefono.value.trim(),
                servicio: servicio.value,
                servicioTexto: servicio.options[servicio.selectedIndex].text,
                asunto: asunto.value.trim(),
                mensaje: mensaje.value.trim(),
                fechaEnvio: new Date().toISOString()
            };

            // Guardar en LocalStorage convirtiendo el objeto a JSON
            localStorage.setItem('contacto_drew_tech', JSON.stringify(datosFormulario));
            console.log('[LocalStorage] Datos guardados con éxito:', datosFormulario);

            // Mensaje de confirmación
            alert(`¡Gracias ${datosFormulario.nombre}! Tu mensaje sobre "${datosFormulario.asunto}" ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto.`);

            // Limpiar el formulario tras el envío
            contactForm.reset();
        });
    }
});
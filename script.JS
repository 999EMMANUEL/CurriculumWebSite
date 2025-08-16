const projectImages = {
    portfolio: [
        {
            src: 'https://i.postimg.cc/SxwGkYxf/Captura-de-pantalla-2025-08-16-014814.png',
            title: 'Página Principal',
            description: 'Landing page con diseño moderno y animaciones CSS'
        },
        {
            src: 'https://i.postimg.cc/vZ1vJtbm/Captura-de-pantalla-2025-08-16-014825.png',
            title: 'Sección Proyectos',
            description: 'Galería interactiva de proyectos destacados'
        },
        {
            src: 'https://i.postimg.cc/QxYbYyLP/Captura-de-pantalla-2025-08-16-014839.png',
            title: 'Formulario de Contacto',
            description: 'Sistema de contacto con validación y EmailJS'
        },
        {
            src: 'https://i.postimg.cc/8Pz4HVYM/Captura-de-pantalla-2025-08-16-014953.png',
            title: 'Diseño Responsivo',
            description: 'Optimizado para todos los dispositivos'
        }
    ]
};

let currentProject = '';
let currentImageIndex = 0;

// FUNCIONES PRINCIPALES PARA LOS MODALES DE PROYECTOS
function openProjectModal(projectId) {
    const modalId = projectId + 'Modal';
    const modal = document.getElementById(modalId);
    
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeProjectModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.classList.remove('show');
    }
}

// Función para abrir lightbox
function openLightbox(projectId, imageIndex) {
    currentProject = projectId;
    currentImageIndex = imageIndex;
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    const images = projectImages[projectId];
    const image = images[imageIndex];
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    lightboxCounter.textContent = `${imageIndex + 1} / ${images.length}`;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para cambiar imagen
function changeImage(direction) {
    const images = projectImages[currentProject];
    currentImageIndex += direction;
    
    // Circular navigation
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    const image = images[currentImageIndex];
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

// Cerrar lightbox y modales con tecla ESC y navegación con flechas
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
        // También cerrar cualquier modal abierto
        const openModals = document.querySelectorAll('.modal[style*="display: block"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    } else if (e.key === 'ArrowLeft') {
        if (document.getElementById('lightbox').style.display === 'block') {
            changeImage(-1);
        }
    } else if (e.key === 'ArrowRight') {
        if (document.getElementById('lightbox').style.display === 'block') {
            changeImage(1);
        }
    }
});

// Animación de barras de progreso
function animateProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressFill = item.querySelector('.progress-fill');
        const skillLevel = item.getAttribute('data-skill');
        
        setTimeout(() => {
            progressFill.style.width = skillLevel + '%';
        }, 500);
    });
}

// Efecto de aparición al hacer scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Modal functionality para el modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Efecto de typing para el título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Smooth scroll para navegación
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Efecto de partículas en el header
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255,255,255,0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = 'float 15s linear infinite';
    
    const header = document.querySelector('.header');
    if (header) {
        header.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 15000);
    }
}

// Crear partículas periódicamente
setInterval(createParticle, 3000);

// FUNCIONALIDAD DEL FORMULARIO DE CONTACTO
function initContactForm() {
    const form = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCounter = document.querySelector('.char-counter');

    if (!form || !messageTextarea || !charCounter) return;

    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = 500;
        charCounter.textContent = `${currentLength}/${maxLength}`;
        
        if (currentLength > maxLength) {
            charCounter.style.color = '#e74c3c';
        } else {
            charCounter.style.color = '#7f8c8d';
        }
    });

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    form.addEventListener('submit', handleFormSubmit);
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    clearError(e);

    switch(fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'El nombre es requerido';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
                isValid = false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'El correo es requerido';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Ingresa un correo válido';
                isValid = false;
            }
            break;

        case 'subject':
            if (!value) {
                errorMessage = 'Selecciona un asunto';
                isValid = false;
            }
            break;

        case 'message':
            if (!value) {
                errorMessage = 'El mensaje es requerido';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                isValid = false;
            } else if (value.length > 500) {
                errorMessage = 'El mensaje no puede exceder 500 caracteres';
                isValid = false;
            }
            break;
    }

    if (!isValid) {
        showError(fieldName, errorMessage);
    }

    return isValid;
}

function clearError(e) {
    const fieldName = e.target.name;
    const errorElement = document.getElementById(fieldName + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    let isFormValid = true;
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        const mockEvent = { target: input };
        if (!validateField(mockEvent)) {
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        showFormMessage('Por favor corrige los errores en el formulario', 'error');
        return;
    }

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    sendEmail(formData)
        .then(response => {
            showFormMessage('¡Mensaje enviado exitosamente! Te responderé pronto.', 'success');
            form.reset();
            document.querySelector('.char-counter').textContent = '0/500';
        })
        .catch(error => {
            showFormMessage('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        });
}

function sendEmail(formData) {
    const SERVICE_ID = 'service_ujyo97o';          
    const TEMPLATE_ID = 'portfolio_contact';      
    const PUBLIC_KEY = 'eY3OIP4MNRDJVbZxU';          
    
    const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then(function(response) {
            console.log('Email enviado exitosamente:', response);
            return { success: true };
        })
        .catch(function(error) {
            console.error('Error al enviar email:', error);
            throw error;
        });
}

function showFormMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Animar barras de progreso después de un delay
    setTimeout(animateProgressBars, 1000);
    
    // Observar elementos para animaciones
    observeElements();
    
    // Inicializar formulario de contacto
    initContactForm();
    
    // Agregar efecto hover a las tarjetas de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '6px';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '4px';
        });
    });

    // Agregar clase de carga completada
    document.body.classList.add('loaded');
});
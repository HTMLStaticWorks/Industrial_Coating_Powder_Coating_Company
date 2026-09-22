document.addEventListener('DOMContentLoaded', () => {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.modal-close, [data-modal-close]');
    const overlays = document.querySelectorAll('.modal-overlay');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const target = trigger.getAttribute('data-modal-target');
            openModal(target);
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) closeModal(modal);
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });
    
    // Auth Modal Toggle Login/Register
    const toggleAuthBtns = document.querySelectorAll('[data-auth-toggle]');
    toggleAuthBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const loginForm = document.getElementById('login-form-container');
            const registerForm = document.getElementById('register-form-container');
            const target = btn.getAttribute('data-auth-toggle');
            
            if(target === 'register') {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            } else {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
            }
        });
    });
});

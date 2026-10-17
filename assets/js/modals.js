// Global Modal Mode Switcher (Production Quote RFQ vs Technical Consultation)
window.switchModalMode = function(mode) {
    const heading = document.getElementById('modal-heading');
    const subheading = document.getElementById('modal-subheading');
    const rfqTab = document.getElementById('modal-tab-rfq');
    const consultTab = document.getElementById('modal-tab-consult');
    const rfqForm = document.getElementById('rfq-form');
    const consultForm = document.getElementById('consult-form');

    if (mode === 'consultation') {
        if (consultTab) consultTab.classList.add('active');
        if (rfqTab) rfqTab.classList.remove('active');
        if (consultForm) consultForm.style.display = 'block';
        if (rfqForm) rfqForm.style.display = 'none';
        if (heading) heading.innerText = 'Schedule Technical Consultation';
        if (subheading) subheading.innerText = 'Connect 1-on-1 with a Senior Coating Materials Engineer to discuss your specifications.';
    } else {
        if (rfqTab) rfqTab.classList.add('active');
        if (consultTab) consultTab.classList.remove('active');
        if (rfqForm) rfqForm.style.display = 'block';
        if (consultForm) consultForm.style.display = 'none';
        if (heading) heading.innerText = 'Request a Coating Quote';
        if (subheading) subheading.innerText = 'Provide your project details for an itemized engineering evaluation.';
    }
};

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
            
            // Check for preselected system
            const preselectSystem = trigger.getAttribute('data-preselect-system');
            if (preselectSystem) {
                const systemSelect = document.getElementById('quote-project-type') || document.querySelector('#quote-modal select:first-of-type');
                if (systemSelect) {
                    // Try to match option
                    let matched = false;
                    for (let i = 0; i < systemSelect.options.length; i++) {
                        if (systemSelect.options[i].value.toLowerCase().includes(preselectSystem.toLowerCase()) ||
                            systemSelect.options[i].text.toLowerCase().includes(preselectSystem.toLowerCase())) {
                            systemSelect.selectedIndex = i;
                            matched = true;
                            break;
                        }
                    }
                    if (!matched && systemSelect.options.length > 1) {
                        systemSelect.value = preselectSystem;
                    }
                }
            }

            // Check for preselected substrate
            const preselectSubstrate = trigger.getAttribute('data-preselect-substrate');
            if (preselectSubstrate) {
                const substrateSelect = document.getElementById('quote-substrate') || document.querySelectorAll('#quote-modal select')[1];
                if (substrateSelect) {
                    for (let i = 0; i < substrateSelect.options.length; i++) {
                        if (substrateSelect.options[i].value.toLowerCase().includes(preselectSubstrate.toLowerCase()) ||
                            substrateSelect.options[i].text.toLowerCase().includes(preselectSubstrate.toLowerCase())) {
                            substrateSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
            }

            // Check for form mode (quote vs consultation)
            const formMode = trigger.getAttribute('data-form-mode');
            if (formMode && window.switchModalMode) {
                window.switchModalMode(formMode);
            } else if (preselectSystem && window.switchModalMode) {
                window.switchModalMode('quote');
            }

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

    // Wire up modal tab buttons if present
    const rfqTabBtn = document.getElementById('modal-tab-rfq');
    const consultTabBtn = document.getElementById('modal-tab-consult');
    if (rfqTabBtn) {
        rfqTabBtn.addEventListener('click', () => window.switchModalMode('quote'));
    }
    if (consultTabBtn) {
        consultTabBtn.addEventListener('click', () => window.switchModalMode('consultation'));
    }
    
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

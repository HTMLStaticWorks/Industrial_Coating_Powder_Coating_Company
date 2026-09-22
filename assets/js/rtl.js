const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
const currentDir = localStorage.getItem('dir') || 'ltr';

document.documentElement.setAttribute('dir', currentDir);

rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let dir = document.documentElement.getAttribute('dir');
        let newDir = dir === 'ltr' ? 'rtl' : 'ltr';
        
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
    });
});

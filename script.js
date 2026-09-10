// Initialize Lucide icons
lucide.createIcons();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Copy code button
function copyCode(button) {
    const codeBlock = button.parentElement.nextElementSibling;
    const text = codeBlock.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = 'var(--accent-green)';
        button.style.color = 'white';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = 'transparent';
            button.style.color = 'var(--neutral-600)';
        }, 2000);
    });
}

document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => copyCode(button));
});

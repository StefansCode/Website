document.getElementById('collapseButton').addEventListener('click', function() {
    const container = document.getElementById('content-container');
    const content = container.querySelectorAll('header, main, footer');
    
    if (container.classList.contains('collapsed')) {
        // Expand
        container.classList.remove('collapsed');
        content.forEach(el => {
            el.style.display = '';
            // Force reflow
            el.offsetHeight;
            el.style.opacity = '1';
        });
        this.textContent = '▲';
    } else {
        // Collapse
        container.classList.add('collapsed');
        content.forEach(el => {
            el.style.opacity = '0';
            // Wait for opacity transition to complete
            setTimeout(() => {
                el.style.display = 'none';
            }, 400);
        });
        this.textContent = '▼';
    }
}); 
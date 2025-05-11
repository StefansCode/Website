// Get the canvas element and its context--------------------------------------
const canvas = document.getElementById('fishCanvas');
if (!canvas) {
    throw new Error('Canvas mit ID "fishCanvas" nicht gefunden! Bitte stellen Sie sicher, dass das Canvas-Element existiert.');
}
const ctx = canvas.getContext('2d');

// Create list with a body-----------------------------------------------------

const bodies = [new Body([12, 14, 15, 14, 12, 10, 8, 6, 4])];


// Define functions------------------------------------------------------------
// Resize the canvas when the window is resized
function resize() {
    console.log('Resize wird ausgeführt...');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(`Canvas Größe: ${canvas.width}x${canvas.height}`);
}

// Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw all bodies
    bodies.forEach(body => {
        body.update();
        body.draw(ctx);
    });
    
    // Request next frame
    requestAnimationFrame(animate);
}

// Initialize Eventlisteners---------------------------------------------------
// Initialize everything when the page is loaded
window.addEventListener('load', () => {
    console.log('Seite geladen, initialisiere...');
    resize(); // Set initial size
    animate(); // Start animation
});

// Handle window resize
window.addEventListener('resize', resize);
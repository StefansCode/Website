// Get the canvas element and its context--------------------------------------
const canvas = document.getElementById('fishCanvas');
if (!canvas) {
    throw new Error('Canvas mit ID "fishCanvas" nicht gefunden! Bitte stellen Sie sicher, dass das Canvas-Element existiert.');
}
const ctx = canvas.getContext('2d');

// Create list with a body-----------------------------------------------------

//const Kois = [new Fish([12, 14, 15, 14, 12, 10, 8, 6, 4])];
const Kois = [new Fish([12, 14, 30, 14, 12, 10, 8, 6, 4])];

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
    Kois.forEach(koi => {
        koi.update();
        //drawAsCircles(ctx, koi);
        //drawAsVectors(ctx, koi);
        drawFish(ctx, koi);
    });
    
    // Request next frame
    requestAnimationFrame(animate);
}

// Initialize Eventlisteners---------------------------------------------------

// Initialize everything when the page is loaded
window.addEventListener('load', () => {
    console.log('Seite geladen, initialisiere...');
    resize();   // Set initial size
    animate();  // Start animation
});

// Handle window resize
window.addEventListener('resize', resize);

// Handle mouse clicks
canvas.addEventListener('click', (event) => {
    // Get click coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Turn all fish towards the click point
    Kois.forEach(koi => {
        koi.turnToPoint(x, y);
    });
});
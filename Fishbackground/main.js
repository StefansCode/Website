// Get the canvas element and its context--------------------------------------
const canvas = document.getElementById('fishCanvas');
if (!canvas) {
    throw new Error('Canvas mit ID "fishCanvas" nicht gefunden! Bitte stellen Sie sicher, dass das Canvas-Element existiert.');
}
const ctx = canvas.getContext('2d');

// Create list with a body-----------------------------------------------------

//const Kois = [new Fish([12, 14, 15, 14, 12, 10, 8, 6, 4])];
const Kois = [new Fish([12, 14, 30, 14, 12, 10, 8, 6, 4])];

let food = [];

// Define functions------------------------------------------------------------

// Resize the canvas when the window is resized
function resize() {
    console.log('Resize wird ausgeführt...');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(`Canvas Größe: ${canvas.width}x${canvas.height}`);
}

function getDistance(fish, food){
    const fishMouthPosition = fish.getMouthPosition();
    const distance = Math.sqrt((fishMouthPosition.x - food.head.position.x)**2 + (fishMouthPosition.y - food.head.position.y)**2);
    return distance;
}

function getClosestFood(fish){
    let closestFood = null;
    let minDistance = Infinity;

    food.forEach(f => {
        const distance = getDistance(fish, f);
        if (distance < minDistance){
            minDistance = distance;
            closestFood = f;
        }
    });
    return closestFood;
}

const mouthsSize = 10;
function checkIfFishCanEatFood(fish, food){
    const distance = getDistance(fish, food);
    if (distance < mouthsSize + food.head.size/2){
        return true;
    }
    return false;
}

// Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update if Fish is chasing food
    if (food.length > 0){
        Kois.forEach(koi => {
            koi.isChasing = true;
        });
    }
    else{
        Kois.forEach(koi => {
            koi.isChasing = false;
        });
    }   

    // Update and draw all bodies
    Kois.forEach(koi => {
        koi.update();
        if (koi.isChasing){
            const closestFood = getClosestFood(koi);
            koi.turnToPoint(closestFood.head.position.x, closestFood.head.position.y);
            if (checkIfFishCanEatFood(koi, closestFood)){
                //remove food
                food.splice(food.indexOf(closestFood), 1);
            }
        }
        drawFish(ctx, koi);
    });

    // Update and draw all food
    food.forEach(f => {
        f.update();
        f.draw(ctx);
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

    // Create new food at the click point
    food.push(new Food(event.clientX, event.clientY));

    // Get click coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Turn all fish towards the click point
    Kois.forEach(koi => {
        koi.turnToPoint(x, y);
    });
});
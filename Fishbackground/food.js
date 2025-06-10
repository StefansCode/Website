class Food extends Body {
    constructor(x, y) {
        // Create a worm with 5 segments of decreasing size
        super([2,2,2]);
        
        // Set initial position
        this.head.position = new Vector(x, y);

        this.offset = 5;
        
        // Set faster movement and more frequent random turns
        this.speed = 2;
        this.randomMovementChance = 0.2;
        this.maxTurnAngle = 0.6 * Math.PI; // Allow larger turns
        
        // Initialize wave properties
        this.wavePosition = new Vector(x, y);
        this.radius = 0;
        this.maxRadius = 200;
    }

    draw(ctx) {
        // Draw the worm body using the drawBody function
        ctx.strokeStyle = 'white';
        drawBody(ctx, this);
        
        // Draw the expanding circle effect
        if (this.radius < this.maxRadius) {
            this.radius++;
            const opacity = 1 - (this.radius / this.maxRadius);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(this.wavePosition.x, this.wavePosition.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        }
    }

    update() {
        super.update();
    }
}
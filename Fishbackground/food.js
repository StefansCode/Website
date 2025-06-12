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

        // Allow larger turns
        this.maxTurnAngle = 0.6 * Math.PI;
    }

    update() {
        super.update();
    }
}
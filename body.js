/**
 * Represents a body made up of connected body parts that can move around.
 * The body consists of multiple parts that follow each other, with the head leading the movement.
 * Each part maintains a fixed distance to its predecessor.
 */
class Body {
    /** The fixed distance between body parts */
    offset = 10;
    /** The movement speed of the body */
    speed = 2;
    /** Reference to the first body part (head) */
    head = null;
    /** Reference to the last body part (tail) */
    tail = null;

    /**
     * Creates a new body with the specified part sizes
     * @param {number[]} sizeList - Array of sizes for each body part
     * @throws {Error} If sizeList is not an array
     */
    constructor(sizeList) {

        // Check if sizeList is an array
        if (!Array.isArray(sizeList)) {
            throw new Error('sizeList must be an array');
        }

        // Create body parts
        this.parts = sizeList.map((size, i) =>
            new Bodypart(
                new Vector(-this.offset * i, 0),
                new Vector(0, this.offset),
                size
            )
        );
        
        // Set head and tail
        this.head = this.parts[0] || null;
        this.tail = this.parts[this.parts.length - 1] || null;
        
        // Set initial direction
        if (this.head) {
            this.head.direction = new Vector(1, 1).scaleToLength(this.offset);
        }
    }
    
    /**
     * Updates the body's position and direction.
     * This is the main update method that should be called each frame.
     */
    update(){
        this.update_direction();
        this.move();
    }

    /**
     * Moves the body parts based on the head's direction.
     * The head moves first, and each subsequent part follows its predecessor
     * while maintaining the fixed offset distance.
     */
    move() {

        // Check if the head exists
        if (!this.head) return;

        // Move the head in its current direction
        const moveVector = this.head.direction.clone().scaleToLength(this.speed);
        this.head.position.add(moveVector);

        // Update each body part to follow its predecessor
        for (let i = 1; i < this.parts.length; i++) {
            const previousPart = this.parts[i - 1];
            const currentPart = this.parts[i];
            
            // Calculate vector from current part to previous part
            currentPart.direction = previousPart.position.clone()
                .subtract(currentPart.position);
            
            // If distance is not equal to offset, adjust position
            const currentDistance = currentPart.direction.length();
            if (currentDistance !== this.offset) {
                const adjustmentVector = currentPart.direction.clone()
                    .scaleToLength(currentDistance - this.offset);
                currentPart.position.add(adjustmentVector);
            }
        }
    }

    /** Maximum angle for random direction changes in radians */
    random_movement_angle = 0.1 * Math.PI * 2;
    /** Probability of random direction change (0-1) */
    random_movement_chance = 0.1;

    /**
     * Updates the direction of the body with random movement.
     * Checks boundaries and occasionally changes direction randomly.
     */
    update_direction(){

        this.checkBounds();

        // Check if the head exists
        if (!this.head) return;

        // Rotate the head by random_movement_angle with a chance of random_movement_chance
        if (Math.random() < this.random_movement_chance) {
            const randomAngle = (2*Math.random() - 1) * this.random_movement_angle;
            this.head.direction.rotate(randomAngle);
        }
    }

    /**
     * Checks and handles boundary collisions.
     * If the head reaches a boundary, its direction is inverted to keep it within bounds.
     * @param {number} margin - Margin from the boundaries to start collision detection
     */
    checkBounds(margin = 0 ) {

        // Check if the head exists
        if (!this.head) return;

        // Get the boundaries of the window
        const minX = 0;
        const maxX = window.innerWidth;
        const minY = 0;
        const maxY = window.innerHeight;

        // Check X boundaries
        if (this.head.position.x < minX + margin) {
            this.head.direction.setXToAbsolute();
        } else if (this.head.position.x > maxX - margin) {
            this.head.direction.setXToAbsolute().invertX();
        }

        // Check Y boundaries
        if (this.head.position.y < minY + margin) {
            this.head.direction.setYToAbsolute();
        } else if (this.head.position.y > maxY - margin) {
            this.head.direction.setYToAbsolute().invertY();
        }
    }

    /**
     * Draws the body on the canvas
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     */
    draw_as_circles(ctx) {
        this.parts.forEach(part => part.draw_as_circle(ctx));
    }

    /**
     * Draws the body on the canvas as vectors
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     */
    draw_as_vectors(ctx) {
        this.parts.forEach(part => part.draw_as_vector(ctx));
    }
}
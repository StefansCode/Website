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
        this.move_randomly();
        this.move();
        this.checkBounds();
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
    move_randomly(){

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
    // Draws the right side of the fish by connecting all right points
    draw_right_side(ctx) {
        // Start drawing the path
        ctx.beginPath();
        
        // Start with the last point (back of the fish)
        const firstPoint = this.parts[this.parts.length - 1].getRight();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        
        // Draw line to each point from back to front
        for (let i = this.parts.length - 2; i >= 0; i--) {
            const point = this.parts[i].getRight();
            ctx.lineTo(point.x, point.y);
        }
        
        // Style and stroke the path
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draws the left side of the fish by connecting all left points
    draw_left_side(ctx) {
        // Start drawing the path
        ctx.beginPath();
        
        // Start with the last point (back of the fish)
        const firstPoint = this.parts[this.parts.length - 1].getLeft();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        
        // Draw line to each point from back to front
        for (let i = this.parts.length - 2; i >= 0; i--) {
            const point = this.parts[i].getLeft();
            ctx.lineTo(point.x, point.y);
        }
        
        // Style and stroke the path
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draws the head of the fish
    draw_head(ctx) {
        // Draw a semicircle at the head position
        ctx.beginPath();
        const leftPoint = this.head.getLeft();
        const rightPoint = this.head.getRight();
        ctx.arc(this.head.position.x, this.head.position.y, this.head.size, 
            this.head.position.angleTo(rightPoint),
            this.head.position.angleTo(leftPoint));
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draws the tail of the fish
    draw_tail(ctx) {
        // Draw a semicircle at the tail position
        ctx.beginPath();
        const leftPoint = this.tail.getLeft();
        const rightPoint = this.tail.getRight();
        ctx.arc(this.tail.position.x, this.tail.position.y, this.tail.size,
            this.tail.position.angleTo(leftPoint),
            this.tail.position.angleTo(rightPoint));
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draws the complete fish by combining all drawing functions
    draw_fish(ctx) {
        this.draw_right_side(ctx);
        this.draw_left_side(ctx);
        this.draw_head(ctx);
        this.draw_tail(ctx);
        this.draw_smiley(ctx);
    }

    // Draws a smiley face on the fish's head
    draw_smiley(ctx) {
        // Calculate eye positions (slightly above and to the sides of the head)
        const eyeOffset = this.head.size * 0.3;
        const leftEye = this.head.getLeft().clone().add(this.head.direction.clone().scaleToLength(eyeOffset));
        const rightEye = this.head.getRight().clone().add(this.head.direction.clone().scaleToLength(eyeOffset));

        // Draw eyes
        ctx.beginPath();
        ctx.arc(leftEye.x, leftEye.y, this.head.size * 0.3, 0, Math.PI * 2);
        ctx.arc(rightEye.x, rightEye.y, this.head.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        // Draw smile (semicircle below the eyes)
        ctx.beginPath();
        const smileStart = this.head.getLeft().clone().add(this.head.direction.clone().scaleToLength(this.head.size * 0.5));
        const smileEnd = this.head.getRight().clone().add(this.head.direction.clone().scaleToLength(this.head.size * 0.5));
        ctx.arc(this.head.position.x, this.head.position.y, this.head.size * 0.4,
            this.head.position.angleTo(smileStart),
            this.head.position.angleTo(smileEnd));
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
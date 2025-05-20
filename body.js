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

    /** Whether the body has turned in the last update */
    didTurn = false;

    /** Maximum angle for turning in radians */
    maxTurnAngle = 0.1 * Math.PI * 2;
    /** Probability of random direction change (0-1) */
    randomMovementChance = 0.1;
    /** Maximum allowed angle for the head in radians */
    maxHeadAngleToTail = Math.PI / 2; // 90 degrees

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

        //start position
        const startPosition = new Vector(window.innerWidth / 2, window.innerHeight / 2);

        // Create body parts
        this.parts = sizeList.map((size, i) =>
            new Bodypart(
                startPosition.clone().add(new Vector(-this.offset * i, 0)),
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
        this.moveRandomly();
        this.checkBounds();
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

    /**
     * Updates the direction of the body with random movement.
     * Checks boundaries and occasionally changes direction randomly.
     * @returns {boolean} True if the direction was changed, false otherwise
     */
    moveRandomly(){
        // Check if the head exists
        if (!this.head) return false;

        if (Math.random() < this.randomMovementChance) {
            const randomAngle = (2*Math.random() - 1) * this.maxTurnAngle;
            this.head.direction.rotate(randomAngle);
            return true;
        }
        return false;
    }

    /**
     * Checks and handles boundary collisions.
     * If the head reaches a boundary, its direction is inverted to keep it within bounds.
     * Only changes direction if the maximum angle is not exceeded.
     * @param {number} margin - Margin from the boundaries to start collision detection
     * @returns {boolean} True if the direction was changed, false otherwise
     */
    checkBounds(margin = 100 ) {
        // Check if the head exists
        if (!this.head) return false;

        // Get the boundaries of the window
        const minX = 0;
        const maxX = window.innerWidth;
        const minY = 0;
        const maxY = window.innerHeight;

        // Store original direction to check angle after potential change
        const originalDirection = this.head.direction.clone();
        let didTurn = false;

        // Check X boundaries
        if (this.head.position.x < minX + margin * Math.random()) {
            this.head.direction.rotateTowards(new Vector(1, 0), Math.PI/4);
            didTurn = true;
        } else if (this.head.position.x > maxX - margin * Math.random()) {
            this.head.direction.rotateTowards(new Vector(-1, 0), Math.PI/4);
            didTurn = true;
        }

        // Check Y boundaries
        if (this.head.position.y < minY + margin * Math.random()) {
            this.head.direction.rotateTowards(new Vector(0, 1), Math.PI/4);
            didTurn = true;
        } else if (this.head.position.y > maxY - margin * Math.random()) {
            this.head.direction.rotateTowards(new Vector(0, -1), Math.PI/4);
            didTurn = true;
        }

        // If the angle would be exceeded, revert to original direction
        if (this.isHeadAngleExceeded()) {
            this.head.direction = originalDirection;
            didTurn = false;
        }

        return didTurn;
    }

    /**
     * Checks if the head's current angle exceeds the maximum allowed angle
     * @returns {boolean} True if the angle exceeds the maximum, false otherwise
     */
    isHeadAngleExceeded() {
        if (!this.head) return false;

        // Calculate the angle between the head's direction and the horizontal axis
        const currentAngle = Math.abs(this.head.direction.angleTo(this.tail.direction));
        
        // Check if the angle exceeds the maximum allowed angle
        return currentAngle > this.maxHeadAngleToTail;
    }
}
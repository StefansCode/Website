/**
 * Represents a body part with a position, direction, and size
 */
class Bodypart {
    /**
     * Creates a new body part
     * 
     * @param {Vector} position - The center position of the body part
     * @param {Vector} direction - The direction vector of the body part
     * @param {number} size - The size of the body part
     */
    constructor(position, direction, size) {
        this.position = position;
        this.direction = direction;
        this.size = size;
    }

    /**
     * Calculates the most left point of the body part, 
     * based on the direction and size
     * 
     * @returns {Vector} The position of the left point
     */
    getLeft() {
        const rightVector = this.direction.clone()
            .rotate(Math.PI / 2)
            .scaleToLength(this.size);
        return this.position.clone().add(rightVector);
    }

    /**
     * Calculates the most right point of the body part,
     * based on the direction and size
     * 
     * @returns {Vector} The position of the right point
     */
    getRight() {
        const rightVector = this.direction.clone()
            .rotate(-Math.PI / 2)
            .scaleToLength(this.size);
        return this.position.clone().add(rightVector);
    }

    /**
     * Draws the body part on the canvas
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     */
    drawAsCircle(ctx) {
        if (!ctx) {
            console.error('No canvas context provided to draw method');
            return;
        }

        ctx.beginPath();
        
        ctx.arc(
            this.position.x,
            this.position.y,
            this.size,
            0,
            Math.PI * 2
        );
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
    
    /**
     * Draws the direction vector from the position
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     */
    drawAsVector(ctx) {
        this.direction.draw(ctx, this.position);
    }

    /**
     * Draws a semicircle in the specified direction
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     * @param {boolean} [opposite=false] - If true, draws the semicircle in the opposite direction
     */
    drawSemicircle(ctx, relativeStartAngle, relativeEndAngle) {
        if (!ctx) {
            console.error('No canvas context provided to draw method');
            return;
        }

        const baseAngle = this.direction.clone().angleTo();
        const startAngle = baseAngle + relativeStartAngle;
        const endAngle = baseAngle + relativeEndAngle;

        ctx.beginPath();
        ctx.arc(
            this.position.x,
            this.position.y,
            this.size,
            startAngle,
            endAngle
        );
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    /**
     * Returns a string representation of this body part
     * @returns {string} A string containing position, direction and size
     */
    toString() {
        return `Bodypart(Position: ${this.position.toString()}, Direction: ${this.direction.toString()}, Size: ${this.size})`;
    }
}
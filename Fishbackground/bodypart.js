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
     * Returns a string representation of this body part
     * @returns {string} A string containing position, direction and size
     */
    toString() {
        return `Bodypart(Position: ${this.position.toString()}, Direction: ${this.direction.toString()}, Size: ${this.size})`;
    }
}
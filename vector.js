class Vector {

    // Constructor
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Adds another vector to this vector (mutates this)
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    // Subtracts another vector from this vector (mutates this)
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    // Scales the vector by a factor (mutates this)
    scale(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }

    // Scales the vector to a specific length (mutates this)
    scaleToLength(length) {
        const currentLength = this.length();
        if (currentLength === 0) {
            this.x = 0;
            this.y = 0;
        } else {
            const factor = length / currentLength;
            this.scale(factor);
        }
        return this;
    }
    
    // Inverts the x-coordinate of this vector (mutates this)
    invertX() {
        this.x = -this.x;
        return this;
    }

    // Inverts the y-coordinate of this vector (mutates this)
    invertY() {
        this.y = -this.y;
        return this;
    }

    // Rotates the vector by an angle (in radians, mutates this)
    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        this.x = x;
        this.y = y;
        return this;
    }

    // Returns a copy of this vector
    clone() {
        return new Vector(this.x, this.y);
    }

    // Returns the length of this vector
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Returns a string representation of this vector
    toString() {
        return `Vector(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
}
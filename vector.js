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
    scaleByFactor(factor) {
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
            this.scaleByFactor(factor);
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

    // Sets the x-coordinate to its absolute value (mutates this)
    setXToAbsolute() {
        this.x = Math.abs(this.x);
        return this;
    }

    // Sets the y-coordinate to its absolute value (mutates this)
    setYToAbsolute() {
        this.y = Math.abs(this.y);
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

    // Rotates this vector towards another vector by a given angle
    rotateTowards(targetVector, angle) {
        // Calculate the angle between this vector and the target vector
        const currentAngle = this.angleTo(targetVector);
        
        // If the angle is greater than PI, we need to rotate in the opposite direction
        const rotationDirection = currentAngle > Math.PI ? 1 : -1;
        
        // Rotate by the given angle in the correct direction
        this.rotate(rotationDirection * angle);
        
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

    // Returns the angle between this vector and another vector, normalized between 0 and 2π
    angleTo(v = new Vector(1, 0)) {
        let angle = Math.atan2(v.x, v.y) - Math.atan2(this.x, this.y);
        // Normalize to [0, 2π]
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        return angle;
    }

    // Returns a string representation of this vector
    toString() {
        return `Vector(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }

    headSize = 5;
    headAngle = Math.PI / 6;
    // Draws this vector from vector v
    draw(ctx, v) {
        // Draw the main line
        ctx.beginPath();
        ctx.moveTo(v.x, v.y);
        ctx.lineTo(v.x + this.x, v.y + this.y);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Calculate arrow head
        const arrowLength = this.headSize;  // Length of the arrow head
        const arrowAngle = this.headAngle;  // 30 degrees

        // Calculate the angle of the vector
        const angle = Math.atan2(this.y, this.x);
        
        // Calculate the end point of the vector
        const endX = v.x + this.x;
        const endY = v.y + this.y;

        // Draw the arrow head
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
            endX - arrowLength * Math.cos(angle + arrowAngle),
            endY - arrowLength * Math.sin(angle + arrowAngle)
        );
        ctx.lineTo(
            endX - arrowLength * Math.cos(angle - arrowAngle),
            endY - arrowLength * Math.sin(angle - arrowAngle)
        );
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}